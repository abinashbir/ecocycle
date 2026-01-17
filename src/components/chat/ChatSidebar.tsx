import { ChatRoom } from "@/types/marketplace";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ChatSidebarProps {
  rooms: ChatRoom[];
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

const sellerTypeEmoji: Record<string, string> = {
  producer: "🏭",
  collector: "🚛",
  recycler: "♻️",
};

const ChatSidebar = ({ rooms, selectedRoomId, onSelectRoom }: ChatSidebarProps) => {
  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold">Messages</h2>
        <p className="text-sm text-muted-foreground">Real-time communication</p>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => {
          const otherParticipant = room.participants[1]; // Simplified: show second participant
          const isSelected = selectedRoomId === room.id;

          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`w-full p-4 text-left border-b border-border transition-colors ${
                isSelected ? "bg-accent" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                  {sellerTypeEmoji[otherParticipant.type]}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium truncate">{otherParticipant.name}</span>
                    {room.unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground text-xs px-2">
                        {room.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  {room.lastMessage && (
                    <>
                      <p className="text-sm text-muted-foreground truncate mb-1">
                        {room.lastMessage.content}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(room.lastMessage.timestamp, { addSuffix: true })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
