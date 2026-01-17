import { Button } from "@/components/ui/button";
import { Plus, Upload, MessageCircle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    { label: "Create Listing", icon: Plus, href: "/marketplace", variant: "default" as const },
    { label: "Upload Inventory", icon: Upload, href: "#", variant: "outline" as const },
    { label: "View Messages", icon: MessageCircle, href: "/chat", variant: "outline" as const },
    { label: "Analytics", icon: BarChart3, href: "#", variant: "outline" as const },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
      <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link key={action.label} to={action.href}>
            <Button variant={action.variant} className="w-full h-auto py-4 flex-col gap-2">
              <action.icon className="w-5 h-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
