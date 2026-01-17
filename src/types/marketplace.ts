export type ItemCategory = 
  | "plastic" 
  | "metal" 
  | "paper" 
  | "glass" 
  | "electronics" 
  | "organic" 
  | "textile" 
  | "other";

export type ItemCondition = "new" | "like-new" | "good" | "fair" | "for-recycling";

export type SellerType = "producer" | "collector" | "recycler";

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  category: ItemCategory;
  condition: ItemCondition;
  images: string[];
  seller: {
    id: string;
    name: string;
    type: SellerType;
    rating: number;
    location: string;
  };
  createdAt: Date;
  isFeatured?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: SellerType;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participants: {
    id: string;
    name: string;
    type: SellerType;
  }[];
  lastMessage?: ChatMessage;
  unreadCount: number;
}
