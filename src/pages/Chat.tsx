import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { useChatRooms, useMessages, useSendMessage } from "@/hooks/useChat";

import { useAuth } from "@/contexts/AuthContext";

const Chat = () => {
  const location = useLocation();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { user } = useAuth();
  const currentUserId = user?.uid || "";

  // Effect to select room from URL query param
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const roomId = searchParams.get("room");
    if (roomId) {
      setSelectedRoomId(roomId);
    }
  }, [location.search]);

  const { data: rooms = [] } = useChatRooms();
  const { data: messages = [] } = useMessages(selectedRoomId);
  const sendMessageMutation = useSendMessage(selectedRoomId!);

  const selectedRoom = rooms.find(room => room.id === selectedRoomId) || null;

  const handleSendMessage = (content: string) => {
    if (selectedRoomId) {
      sendMessageMutation.mutate({ content, senderId: currentUserId });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex-shrink-0 hidden md:block">
          <ChatSidebar
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
          />
        </div>

        {/* Chat Window */}
        <ChatWindow
          room={selectedRoom}
          messages={messages}
          currentUserId={currentUserId}
          onSendMessage={handleSendMessage}
        />

        {/* Mobile Sidebar Toggle */}
        {!selectedRoomId && (
          <div className="md:hidden absolute inset-x-0 top-16 bottom-0 bg-background">
            <ChatSidebar
              rooms={rooms}
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
