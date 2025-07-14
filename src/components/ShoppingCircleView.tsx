import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Plus, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Calendar,
  Settings,
  Share2,
  Filter,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Star,
  MessageCircle,
  Copy,
  Send
} from 'lucide-react';
import { useShoppingCircleStore, ShoppingCircle, ShoppingMember, ShoppingCircleItem } from '@/store/shoppingCircleStore';
import { CollaborativeShoppingView } from './CollaborativeShoppingView';
import { useToast } from '@/hooks/use-toast';

interface ShoppingCircleViewProps {
  circleId: string;
  onBack: () => void;
}

export const ShoppingCircleView: React.FC<ShoppingCircleViewProps> = ({ circleId, onBack }) => {
  const store = useShoppingCircleStore();
  const circle = store.myCircles.find(c => c.id === circleId);
  const [activeTab, setActiveTab] = useState('items');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'needed' | 'ordered' | 'purchased'>('all');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isInvitingMember, setIsInvitingMember] = useState(false);
  const [showCollaborativeShopping, setShowCollaborativeShopping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();

  const handleShareCircle = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join ${circle.name} - Community`,
        text: `Join my community for ${circle.occasion_type} shopping!`,
        url: `${window.location.origin}/join/${circle.invite_code}`
      }).catch(console.error);
    } else {
      // Fallback: copy invite code to clipboard
      navigator.clipboard.writeText(circle.invite_code).then(() => {
        toast({
          title: "Invite Code Copied! 📋",
          description: `Share code ${circle.invite_code} with family members`,
          duration: 3000,
        });
      });
    }
  };

  // If collaborative shopping is selected, show that view
  if (showCollaborativeShopping) {
    return (
      <CollaborativeShoppingView 
        circleId={circleId} 
        onBack={() => setShowCollaborativeShopping(false)} 
      />
    );
  }

  if (!circle) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Circle not found</h3>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const totalItems = circle.shopping_list.length;
  const completedItems = circle.shopping_list.filter(item => item.status === 'purchased').length;
  const totalBudget = circle.budget_limit || 0;
  const spentBudget = circle.shopping_list
    .filter(item => item.status === 'purchased')
    .reduce((sum, item) => sum + (item.estimated_price * item.quantity), 0);

  const filteredItems = circle.shopping_list.filter(item => {
    const matchesSearch = item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const AddItemDialog = () => {
    const [itemData, setItemData] = useState({
      product_name: '',
      category: '',
      quantity: 1,
      priority: 'medium' as 'high' | 'medium' | 'low',
      estimated_price: 0,
      notes: '',
      is_private: false
    });

    const handleSubmit = () => {
      const newItem: Omit<ShoppingCircleItem, 'id' | 'added_date' | 'added_by'> = {
        ...itemData,
        status: 'needed'
      };
      store.addItemToCircle(circleId, newItem);
      
      // Show success toast
      toast({
        title: "Item Added! ✅",
        description: `${itemData.product_name} added to shopping list`,
        duration: 3000,
      });
      setIsAddingItem(false);
      setItemData({
        product_name: '',
        category: '',
        quantity: 1,
        priority: 'medium',
        estimated_price: 0,
        notes: '',
        is_private: false
      });
    };

    return (
      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Product name"
              value={itemData.product_name}
              onChange={(e) => setItemData({ ...itemData, product_name: e.target.value })}
            />
            <Input
              placeholder="Category"
              value={itemData.category}
              onChange={(e) => setItemData({ ...itemData, category: e.target.value })}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Quantity"
                value={itemData.quantity}
                onChange={(e) => setItemData({ ...itemData, quantity: parseInt(e.target.value) || 1 })}
                className="w-1/2"
              />
              <Input
                type="number"
                placeholder="Price"
                value={itemData.estimated_price}
                onChange={(e) => setItemData({ ...itemData, estimated_price: parseFloat(e.target.value) || 0 })}
                className="w-1/2"
              />
            </div>
            <Select value={itemData.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setItemData({ ...itemData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Notes (optional)"
              value={itemData.notes}
              onChange={(e) => setItemData({ ...itemData, notes: e.target.value })}
            />
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Private item (only you can see)</label>
              <Switch
                checked={itemData.is_private}
                onCheckedChange={(checked) => setItemData({ ...itemData, is_private: checked })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsAddingItem(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="flex-1" disabled={!itemData.product_name}>
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const InviteMemberDialog = () => {
    const [inviteData, setInviteData] = useState({
      email: '',
      role: 'collaborator' as const,
      message: `Join my ${circle.occasion_type} shopping circle: ${circle.name}`
    });

  const handleInvite = () => {
    // In a real app, this would send an email invitation
    console.log('Sending invitation:', inviteData);
    setIsInvitingMember(false);
    setInviteData({
      email: '',
      role: 'collaborator',
      message: `Join my ${circle.occasion_type} shopping circle: ${circle.name}`
    });
  };

    return (
      <Dialog open={isInvitingMember} onOpenChange={setIsInvitingMember}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={inviteData.email}
              onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
            />
            <Select value={inviteData.role} onValueChange={(value: 'collaborator') => setInviteData({ ...inviteData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="collaborator">Collaborator</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Personal message"
              value={inviteData.message}
              onChange={(e) => setInviteData({ ...inviteData, message: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={() => setIsInvitingMember(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleInvite} className="flex-1" disabled={!inviteData.email}>
                <Send className="w-4 h-4 mr-2" />
                Send Invite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ItemCard = ({ item }: { item: ShoppingCircleItem }) => {
    const statusColors = {
      needed: 'bg-red-100 text-red-800',
      ordered: 'bg-yellow-100 text-yellow-800',
      purchased: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };

    const priorityColors = {
      high: 'border-l-red-500',
      medium: 'border-l-yellow-500',
      low: 'border-l-green-500'
    };

    const StatusIcon = () => {
      switch (item.status) {
        case 'needed': return <AlertCircle className="w-4 h-4" />;
        case 'ordered': return <Clock className="w-4 h-4" />;
        case 'purchased': return <CheckCircle2 className="w-4 h-4" />;
        default: return null;
      }
    };

    const handleDeleteItem = () => {
      store.removeItemFromCircle(circleId, item.id);
      toast({
        title: "Item Removed! 🗑️",
        description: `${item.product_name} removed from shopping list`,
        duration: 3000,
      });
    };

    const handleStatusChange = (newStatus: 'needed' | 'ordered' | 'purchased' | 'cancelled') => {
      store.updateCircleItem(circleId, item.id, { status: newStatus });
      toast({
        title: "Status Updated! 📝",
        description: `${item.product_name} marked as ${newStatus}`,
        duration: 2000,
      });
    };

    return (
      <Card className={`border-l-4 ${priorityColors[item.priority]} hover:shadow-md transition-shadow`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{item.product_name}</h4>
                {item.is_private && <Badge variant="secondary" className="text-xs">Private</Badge>}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>{item.category}</span>
                <span>Qty: {item.quantity}</span>
                <span>${(item.estimated_price * item.quantity).toFixed(2)}</span>
              </div>
              {item.notes && (
                <p className="text-sm text-gray-600 mb-2">{item.notes}</p>
              )}
              <div className="flex items-center gap-2">
                <Badge className={statusColors[item.status]}>
                  <StatusIcon />
                  <span className="ml-1 capitalize">{item.status}</span>
                </Badge>
                {item.priority === 'high' && (
                  <Badge variant="destructive" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    High Priority
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleStatusChange(item.status === 'purchased' ? 'needed' : 'purchased')}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDeleteItem}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{circle.name}</h1>
          <p className="text-gray-600">{circle.description}</p>
        </div>
        <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button onClick={handleShareCircle}>
          <Share2 className="w-4 h-4 mr-2" />
          Share Circle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Items</p>
                <p className="text-lg font-semibold">{completedItems}/{totalItems}</p>
              </div>
            </div>
            <Progress value={(completedItems / totalItems) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="text-lg font-semibold">${spentBudget}/${totalBudget}</p>
              </div>
            </div>
            <Progress value={(spentBudget / totalBudget) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Members</p>
                <p className="text-lg font-semibold">{circle.members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Target Date</p>
                <p className="text-lg font-semibold">
                  {circle.target_date ? new Date(circle.target_date).toLocaleDateString() : 'Not set'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="items">Shopping List</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
              <Button 
                onClick={() => setShowCollaborativeShopping(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Shop Together Live
              </Button>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={(value: 'all' | 'needed' | 'ordered' | 'purchased') => setFilterStatus(value)}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="needed">Needed</SelectItem>
                  <SelectItem value="ordered">Ordered</SelectItem>
                  <SelectItem value="purchased">Purchased</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsAddingItem(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter'
                      : 'Start adding items to your shopping list'
                    }
                  </p>
                  {!searchTerm && filterStatus === 'all' && (
                    <Button onClick={() => setIsAddingItem(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Item
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredItems.map(item => <ItemCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Circle Members</h3>
            <Button onClick={() => setIsInvitingMember(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {circle.members.map(member => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={member.role === 'owner' ? 'default' : 'secondary'}>
                          {member.role}
                        </Badge>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Invite Code Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Circle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Invite Code</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={circle.invite_code} readOnly className="font-mono" />
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Share this code with family and friends to join your circle
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Activity Feed</h3>
              <p className="text-gray-500">Recent activity in your shopping circle will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddItemDialog />
      <InviteMemberDialog />

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Circle Settings</DialogTitle>
            <DialogDescription>
              Manage your community preferences and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Circle Visibility</Label>
              <Select defaultValue="private">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notifications</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="new-member" defaultChecked />
                  <Label htmlFor="new-member" className="text-sm">New member joins</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="items-added" defaultChecked />
                  <Label htmlFor="items-added" className="text-sm">Items added to list</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="purchase-updates" />
                  <Label htmlFor="purchase-updates" className="text-sm">Purchase updates</Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsSettingsOpen(false);
              toast({
                title: "Settings Saved! ⚙️",
                description: "Your circle settings have been updated.",
                duration: 3000,
              });
            }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppingCircleView;
