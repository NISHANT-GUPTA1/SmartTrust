
import { useState } from 'react';
import { mockApiService } from '@/services/mockApiService';
import { Product } from '@/types/product';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);

  const chatWithAssistant = async (message: string): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await mockApiService.chatWithAssistant(message);
      return response.response;
    } finally {
      setIsLoading(false);
    }
  };

  const getPredictiveCart = async (): Promise<Product[]> => {
    setIsLoading(true);
    try {
      return await mockApiService.getPredictiveCart();
    } finally {
      setIsLoading(false);
    }
  };

  const getBudgetAnalysis = async () => {
    setIsLoading(true);
    try {
      return await mockApiService.getBudgetAnalysis();
    } finally {
      setIsLoading(false);
    }
  };

  const getSustainabilityReport = async () => {
    setIsLoading(true);
    try {
      return await mockApiService.getSustainabilityReport();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatWithAssistant,
    getPredictiveCart,
    getBudgetAnalysis,
    getSustainabilityReport,
    isLoading
  };
}
