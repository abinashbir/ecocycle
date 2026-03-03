import { MarketplaceItem, ChatRoom, ChatMessage, SellerType } from "@/types/marketplace";
import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
    orderBy,
    Timestamp,
    doc,
    updateDoc,
    getDoc
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export interface ApiService {
    getItems(): Promise<MarketplaceItem[]>;
    createItem(item: Omit<MarketplaceItem, "id" | "createdAt" | "seller">): Promise<MarketplaceItem>;
    getChatRooms(): Promise<ChatRoom[]>;
    getMessages(roomId: string): Promise<ChatMessage[]>;
    sendMessage(roomId: string, content: string, senderId: string): Promise<ChatMessage>;
    getMessages(roomId: string): Promise<ChatMessage[]>;
    sendMessage(roomId: string, content: string, senderId: string): Promise<ChatMessage>;
    uploadImage(file: File): Promise<string>;
    uploadImage(file: File): Promise<string>;
    createChatRoom(participantId: string): Promise<string>;
    seedItems(items: MarketplaceItem[]): Promise<void>;
}

class FirebaseService implements ApiService {

    async getItems(): Promise<MarketplaceItem[]> {
        // Hardcoded items for development
        return [
            {
                id: "1",
                title: "Industrial Plastic Scrap - HDPE",
                description: "High-quality HDPE plastic scrap from manufacturing process. Clean and ready for recycling. Minimum order 500kg.",
                price: 45,
                unit: "per kg",
                quantity: 5000,
                category: "plastic",
                condition: "for-recycling",
                images: ["/placeholder.svg"],
                seller: {
                    id: "s1",
                    name: "Mumbai Plastics Ltd.",
                    type: "producer",
                    rating: 4.8,
                    location: "Mumbai, Maharashtra",
                },
                createdAt: new Date("2024-01-15"),
                isFeatured: true,
            },
            {
                id: "2",
                title: "Copper Wire Scrap",
                description: "Mixed copper wire scrap from electrical installations. Contains 85% pure copper. Great for recyclers.",
                price: 650,
                unit: "per kg",
                quantity: 200,
                category: "metal",
                condition: "for-recycling",
                images: ["/placeholder.svg"],
                seller: {
                    id: "s2",
                    name: "Delhi Kabadiwala Association",
                    type: "collector",
                    rating: 4.5,
                    location: "Delhi NCR",
                },
                createdAt: new Date("2024-01-14"),
                isFeatured: true,
            },
            {
                id: "3",
                title: "Office Paper Waste - Sorted",
                description: "Pre-sorted white office paper waste. Perfect for paper recycling mills. Weekly supply available.",
                price: 18,
                unit: "per kg",
                quantity: 2000,
                category: "paper",
                condition: "for-recycling",
                images: ["/placeholder.svg"],
                seller: {
                    id: "s3",
                    name: "GreenCycle NGO",
                    type: "collector",
                    rating: 4.9,
                    location: "Bangalore, Karnataka",
                },
                createdAt: new Date("2024-01-13"),
            },
            {
                id: "4",
                title: "Recycled PET Pellets",
                description: "High-quality recycled PET pellets ready for manufacturing. FDA approved for food-grade applications.",
                price: 85,
                unit: "per kg",
                quantity: 10000,
                category: "plastic",
                condition: "new",
                images: ["/placeholder.svg"],
                seller: {
                    id: "s4",
                    name: "EcoPlast Recyclers",
                    type: "recycler",
                    rating: 4.7,
                    location: "Pune, Maharashtra",
                },
                createdAt: new Date("2024-01-12"),
                isFeatured: true,
            }
        ];
        /*
        try {
            const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                } as MarketplaceItem;
            });
        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
        */
    }

    async createItem(itemData: Omit<MarketplaceItem, "id" | "createdAt" | "seller">): Promise<MarketplaceItem> {
        if (!auth.currentUser) throw new Error("User must be logged in");

        const newItem = {
            ...itemData,
            createdAt: Timestamp.now(),
            seller: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName || "Anonymous",
                type: "producer" as SellerType, // Defaulting type for now
                rating: 5,
                location: "Unknown",
            },
        };

        const docRef = await addDoc(collection(db, "items"), newItem);

        return {
            id: docRef.id,
            ...newItem,
            createdAt: newItem.createdAt.toDate(),
        } as MarketplaceItem;
    }

    async getChatRooms(): Promise<ChatRoom[]> {
        if (!auth.currentUser) return [];

        try {
            // Find rooms where current user is a participant
            // Assuming 'participantsIds' array field exists for simpler querying
            const q = query(
                collection(db, "chat_rooms"),
                where("participantsIds", "array-contains", auth.currentUser.uid)
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    lastMessage: data.lastMessage ? {
                        ...data.lastMessage,
                        timestamp: data.lastMessage.timestamp?.toDate ? data.lastMessage.timestamp.toDate() : new Date()
                    } : null
                } as ChatRoom;
            });
        } catch (error) {
            console.error("Error fetching chat rooms:", error);
            return [];
        }
    }

    async getMessages(roomId: string): Promise<ChatMessage[]> {
        try {
            const q = query(
                collection(db, `chat_rooms/${roomId}/messages`),
                orderBy("timestamp", "asc")
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
                } as ChatMessage;
            });
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    }

    async sendMessage(roomId: string, content: string, senderId: string): Promise<ChatMessage> {
        if (!auth.currentUser) throw new Error("Not authenticated");

        const messageData = {
            senderId,
            senderName: auth.currentUser.displayName || "User",
            senderType: "producer" as SellerType, // Mock type
            content,
            timestamp: Timestamp.now(),
            isRead: false,
        };

        const messagesRef = collection(db, `chat_rooms/${roomId}/messages`);
        const docRef = await addDoc(messagesRef, messageData);

        // Update last message in room
        const roomRef = doc(db, "chat_rooms", roomId);
        await updateDoc(roomRef, {
            lastMessage: {
                ...messageData,
                id: docRef.id,
                timestamp: messageData.timestamp
            },
            unreadCount: 1
        });

        return {
            id: docRef.id,
            ...messageData,
            timestamp: messageData.timestamp.toDate(),
        } as ChatMessage;
    }

    async uploadImage(file: File): Promise<string> {
        if (!auth.currentUser) throw new Error("User must be logged in");

        try {
            const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
            const { storage } = await import("@/lib/firebase");

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const storageRef = ref(storage, `items/${auth.currentUser.uid}/${fileName}`);

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

    async createChatRoom(participantId: string): Promise<string> {
        if (!auth.currentUser) throw new Error("User must be logged in");

        const currentUserId = auth.currentUser.uid;

        // 1. Check if room already exists
        // Note: Firestore array-contains is for single value. To check for [A, B], we can't easily query exact match without a composite ID or map
        // A common trick is to store `participants` as array and also `participantsMap` as {uid1: true, uid2: true}
        // Or generate a deterministic ID: sort(uid1, uid2).join('_')

        const sortedIds = [currentUserId, participantId].sort();
        const roomId = sortedIds.join('_');
        const roomRef = doc(db, "chat_rooms", roomId);
        const roomSnap = await getDoc(roomRef);

        if (roomSnap.exists()) {
            return roomId;
        }

        // 2. Create new room if doesn't exist
        const participantUser = { id: participantId, name: "User", type: "collector" }; // In real app, fetch user profile
        const currentUser = {
            id: currentUserId,
            name: auth.currentUser.displayName || "User",
            type: "producer"
        };

        const newRoom: any = {
            id: roomId,
            participants: [currentUser, participantUser],
            participantsIds: sortedIds,
            unreadCount: 0,
            updatedAt: Timestamp.now()
        };

        const { setDoc } = await import("firebase/firestore");
        await setDoc(roomRef, newRoom);

        return roomId;
    }

    async seedItems(items: MarketplaceItem[]): Promise<void> {
        // We use addDoc loop for simplicity as batch has 500 limit and we have few items
        // In real app, use batch()
        const { collection, addDoc, Timestamp } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");

        for (const item of items) {
            // Remove id as firestore generates it
            const { id, ...itemData } = item;
            await addDoc(collection(db, "items"), {
                ...itemData,
                createdAt: Timestamp.now()
            });
        }
    }
}

export const api = new FirebaseService();
