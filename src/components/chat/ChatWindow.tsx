import { useState } from "react";
import { ChatMessage, ChatRoom } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Phone, Video, MoreVertical } from "lucide-react";
import { format } from "date-fns";

interface ChatWindowProps {
  room: ChatRoom | null;
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
}

const sellerTypeEmoji: Record<string, string> = {
  producer: "🏭",
  collector: "🚛",
  recycler: "♻️",
};

const ChatWindow = ({ room, messages, currentUserId, onSendMessage }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">💬</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  const otherParticipant = room.participants.find(p => p.id !== currentUserId) || room.participants[1];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {sellerTypeEmoji[otherParticipant.type]}
          </div>
          <div>
            <h3 className="font-bold">{otherParticipant.name}</h3>
            <span className="text-xs text-muted-foreground capitalize">{otherParticipant.type}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === currentUserId;
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${isOwn ? "order-2" : ""}`}>
                {!isOwn && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {message.senderName}
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    isOwn
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className={`text-xs text-muted-foreground mt-1 block ${isOwn ? "text-right" : ""}`}>
                  {format(message.timestamp, "HH:mm")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-xl"
          />
          <Button onClick={handleSend} size="icon" className="rounded-xl">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
