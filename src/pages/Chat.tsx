import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { mockChatRooms, mockMessages } from "@/data/mockData";
import { ChatMessage } from "@/types/marketplace";

const Chat = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  
  const currentUserId = "s4"; // Simulating logged in as EcoPlast Recyclers
  const selectedRoom = mockChatRooms.find(room => room.id === selectedRoomId) || null;

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `m${messages.length + 1}`,
      senderId: currentUserId,
      senderName: "EcoPlast Recyclers",
      senderType: "recycler",
      content,
      timestamp: new Date(),
      isRead: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex-shrink-0 hidden md:block">
          <ChatSidebar
            rooms={mockChatRooms}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
          />
        </div>

        {/* Chat Window */}
        <ChatWindow
          room={selectedRoom}
          messages={selectedRoomId === "room1" ? messages : []}
          currentUserId={currentUserId}
          onSendMessage={handleSendMessage}
        />

        {/* Mobile Sidebar Toggle */}
        {!selectedRoomId && (
          <div className="md:hidden absolute inset-x-0 top-16 bottom-0 bg-background">
            <ChatSidebar
              rooms={mockChatRooms}
              selectedRoomId={selectedRoomId}
              onSelectRoom={setSelectedRoomId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
