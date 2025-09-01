import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlannerWizard } from '@/components/PlannerWizard';
import { PlanResults } from '@/components/PlanResults';
import { MapPin, Clock, TrendingUp, Coffee, Users, Star } from 'lucide-react';
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
        
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Day Out
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Compare prices, explore menus, and plan the perfect day with friends, dates, or solo adventures.
          </p>
          <Button 
            size="lg" 
            onClick={handleStartPlanning}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-strong transition-all duration-300 hover:scale-105"
          >
            Start Planning Your Day
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DayTrip Discover?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find the perfect spots for any occasion, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Price Comparison</h3>
              <p className="text-muted-foreground">
                Compare prices across multiple venues and get estimated costs for your entire day out.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Location-Based Results</h3>
              <p className="text-muted-foreground">
                Find the best cafes and restaurants near your preferred locations with accurate distance calculations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Recommendations</h3>
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