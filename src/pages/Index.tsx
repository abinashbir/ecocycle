import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import StakeholderSection from "@/components/home/StakeholderSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StakeholderSection />
      <HowItWorksSection />
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
              <Recycle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join the Circular Economy?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Start trading waste materials, connect with stakeholders, and contribute to a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/marketplace">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">EcoCycle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EcoCycle. Building a sustainable future together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
