import { Factory, Truck, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stakeholders = [
  {
    id: "producer",
    title: "Waste Producers",
    description: "Businesses and households generating waste. Connect with collectors for efficient waste disposal and earn from recyclables.",
    icon: Factory,
    color: "bg-eco-producer",
    features: ["List your waste materials", "Connect with collectors", "Track pickups", "Get fair pricing"],
    buttonVariant: "producer" as const,
  },
  {
    id: "collector",
    title: "Waste Collectors",
    description: "NGOs, government bodies, and kabadiwalas. Collect waste from producers and sell to recyclers for processing.",
    icon: Truck,
    color: "bg-eco-collector",
    features: ["Find nearby producers", "Manage collection routes", "Sell to recyclers", "Real-time coordination"],
    buttonVariant: "collector" as const,
  },
  {
    id: "recycler",
    title: "Waste Recyclers",
    description: "Extract raw materials from waste and sell to manufacturing companies. Complete the circular economy loop.",
    icon: RefreshCw,
    color: "bg-eco-recycler",
    features: ["Source quality waste", "Track material inventory", "Connect with manufacturers", "Maximize value extraction"],
    buttonVariant: "recycler" as const,
  },
];

const StakeholderSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One Platform, <span className="text-gradient-eco">All Stakeholders</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you produce, collect, or recycle waste, EcoCycle provides tailored tools to streamline your operations.
          </p>
        </div>

        {/* Stakeholder Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={stakeholder.id}
              className="group bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${stakeholder.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stakeholder.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{stakeholder.title}</h3>
              <p className="text-muted-foreground mb-6">{stakeholder.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {stakeholder.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/dashboard">
                <Button variant={stakeholder.buttonVariant} className="w-full group-hover:gap-4 transition-all">
                  Join as {stakeholder.title.split(" ")[1]}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeholderSection;
