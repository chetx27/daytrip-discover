import { useState, useEffect } from 'react';
import { Sparkles, Clock, TrendingUp, MapPin, Users, Star, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const TrendingSection = () => {
  const [currentTrend, setCurrentTrend] = useState(0);

  const trendingData = [
    {
      title: "Breakfast Spots Booming",
      description: "Early morning cafes seeing 40% more visitors",
      icon: Coffee,
      stat: "+40%",
      location: "Koramangala",
      time: "6AM - 10AM"
    },
    {
      title: "Weekend Brunch Favorites",
      description: "Popular spots filling up fast for weekend brunch",
      icon: TrendingUp,
      stat: "95%",
      location: "Church Street",
      time: "10AM - 2PM"
    },
    {
      title: "Date Night Destinations",
      description: "Romantic venues trending for evening dates",
      icon: Star,
      stat: "+25%",
      location: "MG Road",
      time: "7PM - 11PM"
    }
  ];

  const liveUpdates = [
    "🔥 Hole in the Wall - 15 min wait",
    "⚡ Blue Tokai - No wait, great coffee!",
    "🍕 Matteo Coffea - Happy hour deals",
    "📍 Koshy's - Classic vibes, moderate crowd",
    "☕ Third Wave - Fresh batch ready!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrend((prev) => (prev + 1) % trendingData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent animate-bounce-gentle" />
            <h2 className="text-3xl md:text-4xl font-bold font-serif">What's Trending</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Real-time insights from the foodie community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trending Insights */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Live Trends
            </h3>
            
            {trendingData.map((trend, index) => (
              <Card 
                key={index}
                className={`bg-gradient-card border-0 transition-all duration-500 cursor-pointer ${
                  index === currentTrend 
                    ? 'shadow-strong scale-105 ring-2 ring-primary/20' 
                    : 'shadow-soft hover:shadow-medium'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <trend.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{trend.title}</h4>
                        <Badge className="bg-gradient-accent text-accent-foreground font-bold">
                          {trend.stat}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{trend.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="font-medium">{trend.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent" />
                          <span>{trend.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Activity Feed */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Activity
            </h3>
            
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {liveUpdates.map((update, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
                      <span className="text-sm">{update}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>247 people exploring now</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Activity
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hot Spots Map Preview */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Hot Spots Right Now
                </h4>
                
                <div className="space-y-3">
                  {['Church Street', 'Koramangala', 'Indiranagar'].map((area, index) => (
                    <div key={area} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="font-medium">{area}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i}
                              className="w-6 h-6 bg-gradient-primary rounded-full border-2 border-background flex items-center justify-center text-xs text-white font-bold"
                            >
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(Math.random() * 20) + 10}+ active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4 bg-gradient-primary hover:shadow-medium transition-all duration-300">
                  Explore Interactive Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};