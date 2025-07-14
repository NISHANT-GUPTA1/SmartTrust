import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ShoppingMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'collaborator';
  joined_date: string;
  status: 'active' | 'pending' | 'inactive';
  permissions: {
    canAddItems: boolean;
    canEditItems: boolean;
    canRemoveItems: boolean;
    canViewBudget: boolean;
    canSetPriority: boolean;
  };
}

export interface ShoppingCircleItem {
  id: string;
  product_name: string;
  category: string;
  quantity: number;
  priority: 'high' | 'medium' | 'low';
  added_by: string; // member id
  added_date: string;
  notes?: string;
  estimated_price: number;
  assigned_to?: string; // member id
  status: 'needed' | 'ordered' | 'purchased' | 'cancelled';
  is_private: boolean; // only owner can see private items
}

export interface ShoppingCircle {
  id: string;
  name: string;
  description: string;
  occasion_type: 'wedding' | 'festival' | 'party' | 'family_gathering' | 'vacation' | 'other';
  owner_id: string;
  created_date: string;
  target_date?: string; // event date
  budget_limit?: number;
  invite_code: string;
  settings: {
    requireApproval: boolean;
    allowMemberInvites: boolean;
    shareLocation: boolean;
    allowBudgetView: boolean;
  };
  members: ShoppingMember[];
  shopping_list: ShoppingCircleItem[];
  total_spent: number;
}

export interface PendingInvite {
  id: string;
  circle_id: string;
  circle_name: string;
  invited_by: string;
  invited_by_name: string;
  invited_email: string;
  invite_message?: string;
  expires_at: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

interface ShoppingCircleStore {
  // Current user info (simulated)
  currentUser: ShoppingMember | null;
  
  // User's shopping circles
  myCircles: ShoppingCircle[];
  activeCircleId: string | null;
  
  // Invitations
  pendingInvites: PendingInvite[];
  
  // UI State
  isCreatingCircle: boolean;
  isInvitingMembers: boolean;
  
  // Actions
  setCurrentUser: (user: ShoppingMember) => void;
  
  // Circle Management
  createShoppingCircle: (circle: Omit<ShoppingCircle, 'id' | 'created_date' | 'invite_code' | 'members' | 'shopping_list' | 'total_spent'>) => string;
  updateCircleSettings: (circleId: string, settings: Partial<ShoppingCircle['settings']>) => void;
  setActiveCircle: (circleId: string | null) => void;
  deleteShoppingCircle: (circleId: string) => void;
  
  // Member Management
  inviteMember: (circleId: string, email: string, message?: string) => void;
  acceptInvite: (inviteId: string) => void;
  declineInvite: (inviteId: string) => void;
  removeMember: (circleId: string, memberId: string) => void;
  updateMemberPermissions: (circleId: string, memberId: string, permissions: Partial<ShoppingMember['permissions']>) => void;
  
  // Shopping List Management
  addItemToCircle: (circleId: string, item: Omit<ShoppingCircleItem, 'id' | 'added_date' | 'added_by'>) => void;
  updateCircleItem: (circleId: string, itemId: string, updates: Partial<ShoppingCircleItem>) => void;
  removeItemFromCircle: (circleId: string, itemId: string) => void;
  assignItemToMember: (circleId: string, itemId: string, memberId: string) => void;
  markItemAsPurchased: (circleId: string, itemId: string, actualPrice?: number) => void;
  
  // Privacy & Filtering
  getVisibleItems: (circleId: string, viewerMemberId: string) => ShoppingCircleItem[];
  getCircleAnalytics: (circleId: string) => {
    totalItems: number;
    completedItems: number;
    totalBudget: number;
    spent: number;
    remaining: number;
    memberContributions: { memberId: string; itemsAdded: number; itemsPurchased: number }[];
  };
}

const generateInviteCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useShoppingCircleStore = create<ShoppingCircleStore>()(
  persist(
    (set, get) => ({
      currentUser: {
        id: 'user_1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'owner',
        joined_date: new Date().toISOString(),
        status: 'active',
        permissions: {
          canAddItems: true,
          canEditItems: true,
          canRemoveItems: true,
          canViewBudget: true,
          canSetPriority: true,
        }
      },
      myCircles: [],
      activeCircleId: null,
      pendingInvites: [],
      isCreatingCircle: false,
      isInvitingMembers: false,

      setCurrentUser: (user) => set({ currentUser: user }),

      createShoppingCircle: (circleData) => {
        const newId = generateId();
        const inviteCode = generateInviteCode();
        const currentUser = get().currentUser;
        
        if (!currentUser) return newId;

        const newCircle: ShoppingCircle = {
          ...circleData,
          id: newId,
          created_date: new Date().toISOString(),
          invite_code: inviteCode,
          members: [{ ...currentUser, role: 'owner' }],
          shopping_list: [],
          total_spent: 0,
        };

        set((state) => ({
          myCircles: [...state.myCircles, newCircle],
          activeCircleId: newId,
        }));

        return newId;
      },

      updateCircleSettings: (circleId, settings) => {
        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === circleId
              ? { ...circle, settings: { ...circle.settings, ...settings } }
              : circle
          ),
        }));
      },

      setActiveCircle: (circleId) => set({ activeCircleId: circleId }),

      deleteShoppingCircle: (circleId) => {
        set((state) => ({
          myCircles: state.myCircles.filter((circle) => circle.id !== circleId),
          activeCircleId: state.activeCircleId === circleId ? null : state.activeCircleId,
        }));
      },

      inviteMember: (circleId, email, message) => {
        const circle = get().myCircles.find((c) => c.id === circleId);
        const currentUser = get().currentUser;
        
        if (!circle || !currentUser) return;

        const newInvite: PendingInvite = {
          id: generateId(),
          circle_id: circleId,
          circle_name: circle.name,
          invited_by: currentUser.id,
          invited_by_name: currentUser.name,
          invited_email: email,
          invite_message: message,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          status: 'pending',
        };

        set((state) => ({
          pendingInvites: [...state.pendingInvites, newInvite],
        }));
      },

      acceptInvite: (inviteId) => {
        const invite = get().pendingInvites.find((inv) => inv.id === inviteId);
        const currentUser = get().currentUser;
        
        if (!invite || !currentUser) return;

        // Add user to circle
        const newMember: ShoppingMember = {
          ...currentUser,
          role: 'collaborator',
          joined_date: new Date().toISOString(),
          permissions: {
            canAddItems: true,
            canEditItems: false,
            canRemoveItems: false,
            canViewBudget: false,
            canSetPriority: false,
          },
        };

        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === invite.circle_id
              ? { ...circle, members: [...circle.members, newMember] }
              : circle
          ),
          pendingInvites: state.pendingInvites.map((inv) =>
            inv.id === inviteId ? { ...inv, status: 'accepted' } : inv
          ),
        }));
      },

      declineInvite: (inviteId) => {
        set((state) => ({
          pendingInvites: state.pendingInvites.map((inv) =>
            inv.id === inviteId ? { ...inv, status: 'declined' } : inv
          ),
        }));
      },

      removeMember: (circleId, memberId) => {
        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === circleId
              ? {
                  ...circle,
                  members: circle.members.filter((member) => member.id !== memberId),
                }
              : circle
          ),
        }));
      },

      updateMemberPermissions: (circleId, memberId, permissions) => {
        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === circleId
              ? {
                  ...circle,
                  members: circle.members.map((member) =>
                    member.id === memberId
                      ? { ...member, permissions: { ...member.permissions, ...permissions } }
                      : member
                  ),
                }
              : circle
          ),
        }));
      },

      addItemToCircle: (circleId, itemData) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newItem: ShoppingCircleItem = {
          ...itemData,
          id: generateId(),
          added_date: new Date().toISOString(),
          added_by: currentUser.id,
        };

        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === circleId
              ? { ...circle, shopping_list: [...circle.shopping_list, newItem] }
              : circle
          ),
        }));
      },

      updateCircleItem: (circleId, itemId, updates) => {
        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === circleId
              ? {
                  ...circle,
                  shopping_list: circle.shopping_list.map((item) =>
                    item.id === itemId ? { ...item, ...updates } : item
                  ),
                }
              : circle
          ),
        }));
      },

      removeItemFromCircle: (circleId, itemId) => {
        set((state) => ({
          myCircles: state.myCircles.map((circle) =>
            circle.id === circleId
              ? {
                  ...circle,
                  shopping_list: circle.shopping_list.filter((item) => item.id !== itemId),
                }
              : circle
          ),
        }));
      },

      assignItemToMember: (circleId, itemId, memberId) => {
        get().updateCircleItem(circleId, itemId, { assigned_to: memberId });
      },

      markItemAsPurchased: (circleId, itemId, actualPrice) => {
        const circle = get().myCircles.find((c) => c.id === circleId);
        const item = circle?.shopping_list.find((i) => i.id === itemId);
        
        if (!circle || !item) return;

        const price = actualPrice || item.estimated_price;
        
        set((state) => ({
          myCircles: state.myCircles.map((c) =>
            c.id === circleId
              ? {
                  ...c,
                  total_spent: c.total_spent + price,
                  shopping_list: c.shopping_list.map((i) =>
                    i.id === itemId ? { ...i, status: 'purchased' } : i
                  ),
                }
              : c
          ),
        }));
      },

      getVisibleItems: (circleId, viewerMemberId) => {
        const circle = get().myCircles.find((c) => c.id === circleId);
        if (!circle) return [];

        const viewer = circle.members.find((m) => m.id === viewerMemberId);
        const isOwner = viewer?.role === 'owner';

        return circle.shopping_list.filter((item) => {
          // Owners can see all items
          if (isOwner) return true;
          // Collaborators can only see non-private items
          return !item.is_private;
        });
      },

      getCircleAnalytics: (circleId) => {
        const circle = get().myCircles.find((c) => c.id === circleId);
        if (!circle) {
          return {
            totalItems: 0,
            completedItems: 0,
            totalBudget: 0,
            spent: 0,
            remaining: 0,
            memberContributions: [],
          };
        }

        const totalItems = circle.shopping_list.length;
        const completedItems = circle.shopping_list.filter((item) => item.status === 'purchased').length;
        const totalBudget = circle.budget_limit || 0;
        const spent = circle.total_spent;
        const remaining = totalBudget - spent;

        const memberContributions = circle.members.map((member) => ({
          memberId: member.id,
          itemsAdded: circle.shopping_list.filter((item) => item.added_by === member.id).length,
          itemsPurchased: circle.shopping_list.filter((item) => item.assigned_to === member.id && item.status === 'purchased').length,
        }));

        return {
          totalItems,
          completedItems,
          totalBudget,
          spent,
          remaining,
          memberContributions,
        };
      },
    }),
    {
      name: 'shopping-circle-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        myCircles: state.myCircles,
        activeCircleId: state.activeCircleId,
        pendingInvites: state.pendingInvites,
      }),
    }
  )
);
