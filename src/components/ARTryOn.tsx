import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  CameraOff, 
  Download, 
  Info,
  Shirt,
  Sofa
} from 'lucide-react';
import './AR.css';

interface ARTryOnProps {
  productType: 'clothing' | 'furniture';
  productName: string;
  productImage: string;
  productCategory: string;
}

const ARTryOn: React.FC<ARTryOnProps> = ({ 
  productType, 
  productName, 
  productImage, 
  productCategory 
}) => {
  console.log('ARTryOn component initialized with:', { productType, productName, productCategory });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [arSettings, setArSettings] = useState({
    opacity: 80
  });

  // Initialize camera
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Starting camera for AR...', { productType, productName });
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera is not supported in this browser');
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      console.log('Camera stream obtained successfully');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setStream(mediaStream);
        setIsARActive(true);
        console.log('AR camera started successfully');
      }
    } catch (err) {
      console.error('Camera error:', err);
      let errorMessage = 'Camera access denied. Please allow camera permissions and try again.';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage = 'Camera permission denied. Please allow camera access in your browser settings.';
        } else if (err.name === 'NotFoundError') {
          errorMessage = 'No camera found. Please connect a camera and try again.';
        } else if (err.name === 'NotSupportedError') {
          errorMessage = 'Camera is not supported in this browser.';
        } else {
          errorMessage = `Camera error: ${err.message}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [productType, productName]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsARActive(false);
  }, [stream]);

  // AR Overlay rendering
  useEffect(() => {
    if (!isARActive || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const renderClothingOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      console.log('Rendering clothing overlay:', { width, height, productName });
      
      ctx.save();
      ctx.globalAlpha = arSettings.opacity / 100;
      
      const overlayWidth = width * 0.4;
      const overlayHeight = height * 0.6;
      const x = (width - overlayWidth) / 2;
      const y = height * 0.15;
      
      const gradient = ctx.createLinearGradient(x, y, x, y + overlayHeight);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.6)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, overlayWidth, overlayHeight);
      
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, overlayWidth, overlayHeight);
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const lineY = y + (overlayHeight / 6) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x + 10, lineY);
        ctx.lineTo(x + overlayWidth - 10, lineY);
        ctx.stroke();
      }
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(x, y - 35, overlayWidth, 30);
      ctx.fillStyle = 'black';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(productName, x + 5, y - 15);
      
      ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
      ctx.fillRect(x, y + overlayHeight + 5, overlayWidth, 25);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.fillText('✨ Virtual Try-On Active', x + 5, y + overlayHeight + 20);
      
      ctx.restore();
    };

    const renderFurnitureOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.save();
      ctx.globalAlpha = arSettings.opacity / 100;
      
      const furnitureWidth = width * 0.3;
      const furnitureHeight = height * 0.2;
      const x = width * 0.1;
      const y = height * 0.7;
      
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(x, y, furnitureWidth, furnitureHeight);
      
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.fillRect(x, y, furnitureWidth, furnitureHeight);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(x, y - 30, furnitureWidth, 25);
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      ctx.fillText(`${productName} - Place Here`, x + 5, y - 10);
      
      ctx.restore();
    };

    const renderAROverlay = () => {
      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        
        if (productType === 'clothing') {
          renderClothingOverlay(ctx, canvas.width, canvas.height);
        } else if (productType === 'furniture') {
          renderFurnitureOverlay(ctx, canvas.width, canvas.height);
        }
      }
      
      animationFrame = requestAnimationFrame(renderAROverlay);
    };

    const handleVideoReady = () => {
      console.log('Video ready, starting AR rendering');
      renderAROverlay();
    };

    if (video.readyState >= 2) {
      handleVideoReady();
    } else {
      video.addEventListener('loadedmetadata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      video.removeEventListener('loadedmetadata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoReady);
    };
  }, [isARActive, productType, productName, arSettings]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const takeScreenshot = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `AR-${productName}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {productType === 'clothing' ? (
              <Shirt className="h-5 w-5 text-blue-600" />
            ) : (
              <Sofa className="h-5 w-5 text-green-600" />
            )}
            Virtual Try-On: {productName}
          </CardTitle>
          <Badge variant={productType === 'clothing' ? 'default' : 'secondary'}>
            {productType === 'clothing' ? 'Clothing AR' : 'Furniture AR'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-600" />
            <span className="text-blue-800 text-sm font-medium">
              AR Status: {isARActive ? 'Active' : 'Ready to start'} | Product Type: {productType}
            </span>
          </div>
        </div>

        <div className="relative bg-gray-100 rounded-lg overflow-hidden ar-video-container">
          {!isARActive ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[400px]">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Try {productName} in AR
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                See how this {productType === 'clothing' ? 'clothing item looks on you' : 'furniture fits in your space'} with virtual try-on
              </p>
              <Button
                onClick={startCamera}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Starting Camera...
                  </div>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Start AR Try-On
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="relative w-full h-full min-h-[400px]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-0"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={takeScreenshot}
                  className="bg-white/80 hover:bg-white"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={stopCamera}
                  className="bg-white/80 hover:bg-white"
                >
                  <CameraOff className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Opacity:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={arSettings.opacity}
                    onChange={(e) => setArSettings(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
                    className="flex-1"
                    title="Adjust overlay opacity"
                  />
                  <span className="text-xs text-gray-500">{arSettings.opacity}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-red-600" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How to use AR Try-On:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {productType === 'clothing' ? (
              <>
                <li>• Position yourself in front of the camera</li>
                <li>• The virtual clothing will overlay on your body</li>
                <li>• Move around to see how it fits from different angles</li>
                <li>• Adjust opacity for better visualization</li>
                <li>• Take a screenshot to save your try-on</li>
              </>
            ) : (
              <>
                <li>• Point your camera at the room where you want to place furniture</li>
                <li>• The virtual furniture will appear in the view</li>
                <li>• Move your device to position the furniture</li>
                <li>• Check if the size and style fit your space</li>
                <li>• Take a screenshot to save the placement</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARTryOn;
