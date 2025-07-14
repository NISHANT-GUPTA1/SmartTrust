import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  Settings, 
  UserPlus, 
  Crown, 
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  AlertCircle,
  Gift,
  Heart,
  Home,
  Plane,
  MoreHorizontal
} from 'lucide-react';
import { useShoppingCircleStore, ShoppingCircle, ShoppingMember, PendingInvite } from '@/store/shoppingCircleStore';
import { ShoppingCircleView } from './ShoppingCircleView';

const CreateCircleDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    occasion_type: 'family_gathering' as 'family_gathering' | 'wedding' | 'festival' | 'party' | 'vacation' | 'other',
    target_date: '',
    budget_limit: '',
    requireApproval: true,
    allowMemberInvites: false,
    shareLocation: false,
    allowBudgetView: false,
  });

  const createShoppingCircle = useShoppingCircleStore((state) => state.createShoppingCircle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const circleData = {
      name: formData.name,
      description: formData.description,
      occasion_type: formData.occasion_type,
      target_date: formData.target_date || undefined,
      budget_limit: formData.budget_limit ? parseFloat(formData.budget_limit) : undefined,
      owner_id: 'user_1', // Current user
      settings: {
        requireApproval: formData.requireApproval,
        allowMemberInvites: formData.allowMemberInvites,
        shareLocation: formData.shareLocation,
        allowBudgetView: formData.allowBudgetView,
      },
    };

    createShoppingCircle(circleData);
    setIsOpen(false);
    setFormData({
      name: '',
      description: '',
      occasion_type: 'family_gathering',
      target_date: '',
      budget_limit: '',
      requireApproval: true,
      allowMemberInvites: false,
      shareLocation: false,
      allowBudgetView: false,
    });
  };

  const getOccasionIcon = (type: string) => {
    switch (type) {
      case 'wedding': return <Heart className="h-4 w-4" />;
      case 'festival': return <Gift className="h-4 w-4" />;
      case 'party': return <Users className="h-4 w-4" />;
      case 'family_gathering': return <Home className="h-4 w-4" />;
      case 'vacation': return <Plane className="h-4 w-4" />;
      default: return <ShoppingBag className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Community</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              placeholder="e.g., Sarah's Wedding Plans"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What are you shopping for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="occasion">Occasion Type</Label>
            <Select value={formData.occasion_type} onValueChange={(value: ShoppingCircle['occasion_type']) => setFormData({ ...formData, occasion_type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Wedding
                  </div>
                </SelectItem>
                <SelectItem value="festival">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Festival/Holiday
                  </div>
                </SelectItem>
                <SelectItem value="party">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Party
                  </div>
                </SelectItem>
                <SelectItem value="family_gathering">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Family Gathering
                  </div>
                </SelectItem>
                <SelectItem value="vacation">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Vacation
                  </div>
                </SelectItem>
                <SelectItem value="other">
                  <div className="flex items-center gap-2">
                    <MoreHorizontal className="h-4 w-4" />
                    Other
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target_date">Event Date (Optional)</Label>
              <Input
                id="target_date"
                type="date"
                value={formData.target_date}
                onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="budget">Budget Limit (Optional)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="$0.00"
                value={formData.budget_limit}
                onChange={(e) => setFormData({ ...formData, budget_limit: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Privacy Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="requireApproval" className="text-sm font-normal">
                  Require approval for new members
                </Label>
                <Switch
                  id="requireApproval"
                  checked={formData.requireApproval}
                  onCheckedChange={(checked) => setFormData({ ...formData, requireApproval: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allowBudgetView" className="text-sm font-normal">
                  Allow members to see budget
                </Label>
                <Switch
                  id="allowBudgetView"
                  checked={formData.allowBudgetView}
                  onCheckedChange={(checked) => setFormData({ ...formData, allowBudgetView: checked })}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Circle
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CircleCard = ({ circle, onSelect }: { circle: ShoppingCircle; onSelect: (id: string) => void }) => {
  const getCircleAnalytics = useShoppingCircleStore((state) => state.getCircleAnalytics);
  
  const analytics = getCircleAnalytics(circle.id);
  const progress = analytics.totalItems > 0 ? (analytics.completedItems / analytics.totalItems) * 100 : 0;
  
  const getOccasionIcon = (type: string) => {
    switch (type) {
      case 'wedding': return <Heart className="h-5 w-5 text-pink-500" />;
      case 'festival': return <Gift className="h-5 w-5 text-purple-500" />;
      case 'party': return <Users className="h-5 w-5 text-blue-500" />;
      case 'family_gathering': return <Home className="h-5 w-5 text-green-500" />;
      case 'vacation': return <Plane className="h-5 w-5 text-orange-500" />;
      default: return <ShoppingBag className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatOccasionType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelect(circle.id)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getOccasionIcon(circle.occasion_type)}
            <div>
              <CardTitle className="text-lg">{circle.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {formatOccasionType(circle.occasion_type)}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {circle.members.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {circle.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{analytics.completedItems}/{analytics.totalItems} items</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {circle.target_date ? new Date(circle.target_date).toLocaleDateString() : 'No date set'}
          </div>
          {circle.budget_limit && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              ${analytics.spent}/${circle.budget_limit}
            </div>
          )}
        </div>

        <div className="flex -space-x-2">
          {circle.members.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          ))}
          {circle.members.length > 4 && (
            <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
              +{circle.members.length - 4}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const InviteCard = ({ invite }: { invite: PendingInvite }) => {
  const acceptInvite = useShoppingCircleStore((state) => state.acceptInvite);
  const declineInvite = useShoppingCircleStore((state) => state.declineInvite);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium">{invite.circle_name}</h4>
            <p className="text-sm text-muted-foreground">
              Invited by {invite.invited_by_name}
            </p>
          </div>
          
          {invite.invite_message && (
            <p className="text-sm italic bg-muted p-2 rounded">
              "{invite.invite_message}"
            </p>
          )}
          
          <div className="flex gap-2">
            <Button size="sm" onClick={() => acceptInvite(invite.id)} className="flex-1">
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => declineInvite(invite.id)} className="flex-1">
              Decline
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ShoppingCircleDashboard = () => {
  const myCircles = useShoppingCircleStore((state) => state.myCircles);
  const pendingInvites = useShoppingCircleStore((state) => state.pendingInvites);
  const activeInvites = pendingInvites.filter(inv => inv.status === 'pending');
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);

  // If a circle is selected, show the detailed view
  if (selectedCircleId) {
    return (
      <ShoppingCircleView 
        circleId={selectedCircleId} 
        onBack={() => setSelectedCircleId(null)} 
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">
            Collaborate with family and friends on special occasion shopping
          </p>
        </div>
        <CreateCircleDialog />
      </div>

      <Tabs defaultValue="my-circles" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-circles" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            My Circles ({myCircles.length})
          </TabsTrigger>
          <TabsTrigger value="invites" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invitations ({activeInvites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-circles" className="space-y-6">
          {myCircles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Communities Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first community to start collaborating with family and friends
                </p>
                <CreateCircleDialog />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCircles.map((circle) => (
                <CircleCard key={circle.id} circle={circle} onSelect={setSelectedCircleId} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="invites" className="space-y-6">
          {activeInvites.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <UserPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Pending Invitations</h3>
                <p className="text-muted-foreground">
                  When someone invites you to their community, it will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeInvites.map((invite) => (
                <InviteCard key={invite.id} invite={invite} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
