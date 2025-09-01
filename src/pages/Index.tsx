import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlannerWizard } from '@/components/PlannerWizard';
import { PlanResults } from '@/components/PlanResults';
import { InteractiveStats } from '@/components/InteractiveStats';
import { TrendingSection } from '@/components/TrendingSection';
import { MapPin, Clock, TrendingUp, Coffee, Users, Star, Sparkles, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-cafe.jpg';

interface WizardData {
  startLocation: string;
  occasion: string;
  destination: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'wizard' | 'results'>('home');
  const [planData, setPlanData] = useState<WizardData | null>(null);

  const handleStartPlanning = () => {
    setCurrentView('wizard');
  };

  const handleWizardComplete = (data: WizardData) => {
    setPlanData(data);
    setCurrentView('results');
  };

  const handleBackToWizard = () => {
    setCurrentView('wizard');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setPlanData(null);
  };

  if (currentView === 'wizard') {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={handleBackToHome} className="mb-4">
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold mb-2">Plan Your Perfect Day</h1>
            <p className="text-muted-foreground">Tell us what you're looking for and we'll find the best spots</p>
          </div>
          <PlannerWizard onComplete={handleWizardComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'results' && planData) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto">
          <PlanResults searchData={planData} onBack={handleBackToWizard} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Cozy cafe scene" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-32 text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight font-serif">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-white via-white/90 to-accent-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Day Out
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Compare prices, explore menus, and plan the perfect day with friends, dates, or solo adventures.
              <span className="block mt-2 text-lg opacity-75">Join 10,000+ food lovers discovering amazing places daily.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleStartPlanning}
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 rounded-full shadow-strong transition-all duration-300 hover:scale-110 hover:shadow-xl font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Planning Your Day
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Explore Trending Spots
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats */}
      <InteractiveStats 
        initialStats={{
          totalVenues: 150,
          totalSaved: 2500,
          avgSavings: 350,
          happyUsers: 10247
        }}
      />

      {/* Trending Section */}
      <TrendingSection />

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-accent animate-bounce-gentle" />
              <h2 className="text-4xl md:text-5xl font-bold font-serif">Why Choose DayTrip Discover?</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find the perfect spots for any occasion, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-medium">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-serif">Smart Price Comparison</h3>
              <p className="text-muted-foreground">
                Compare prices across multiple venues and get estimated costs for your entire day out.
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-medium">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-serif">Location-Based Results</h3>
              <p className="text-muted-foreground">
                Find the best cafes and restaurants near your preferred locations with accurate distance calculations.
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: '600ms' }}>
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-medium">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-serif">Curated Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized suggestions based on your occasion, whether it's a date, friends meetup, or solo time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-xl text-muted-foreground">
              Explore the best food scenes in Bangalore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Church Street', desc: 'Trendy cafes & artisan coffee', count: '25+ venues' },
              { name: 'MG Road', desc: 'Business district dining', count: '30+ venues' },
              { name: 'Commercial Street', desc: 'Shopping & street food', count: '40+ venues' },
              { name: 'Koramangala', desc: 'Hip gastropubs & breweries', count: '35+ venues' },
              { name: 'Indiranagar', desc: 'Pub street & fine dining', count: '45+ venues' },
              { name: 'Brigade Road', desc: 'Classic restaurants & cafes', count: '28+ venues' },
            ].map((dest) => (
              <div key={dest.name} className="bg-background p-6 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <Coffee className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  <h3 className="font-semibold text-lg">{dest.name}</h3>
                </div>
                <p className="text-muted-foreground mb-2">{dest.desc}</p>
                <p className="text-sm font-medium text-primary">{dest.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Perfect Day?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people who've discovered amazing cafes and restaurants through our platform.
          </p>
          <Button 
            size="lg" 
            onClick={handleStartPlanning}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-strong transition-all duration-300 hover:scale-105"
          >
            Start Your Food Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">DayTrip Discover</h3>
          <p className="text-muted-foreground mb-6">
            Your companion for discovering the best dining experiences in Bangalore.
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for food lovers</span>
            <span>•</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;