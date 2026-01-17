import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Users, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-eco-earth/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8 animate-fade-in">
            <Recycle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Connecting Waste Management Ecosystem
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Transform Waste Into
            <span className="block text-gradient-eco">Sustainable Value</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            EcoCycle connects waste producers, collectors, and recyclers on a single platform. 
            Trade reusable materials, communicate in real-time, and build a circular economy together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/marketplace">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Explore Marketplace
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <StatCard icon={Users} value="5,000+" label="Active Users" />
            <StatCard icon={Recycle} value="50K+" label="Tons Recycled" />
            <StatCard icon={TrendingUp} value="₹2Cr+" label="Materials Traded" />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, value, label }: { icon: any; value: string; label: string }) => (
  <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-left">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  </div>
);

export default HeroSection;
