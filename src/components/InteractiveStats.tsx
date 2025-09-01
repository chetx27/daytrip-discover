import { useState, useEffect } from 'react';
import { Heart, Share2, Clock, Users, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface InteractiveStatsProps {
  initialStats: {
    totalVenues: number;
    totalSaved: number;
    avgSavings: number;
    happyUsers: number;
  };
}

export const InteractiveStats = ({ initialStats }: InteractiveStatsProps) => {
  const { toast } = useToast();
  const [stats, setStats] = useState(initialStats);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalSaved: prev.totalSaved + Math.floor(Math.random() * 5),
        happyUsers: prev.happyUsers + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    toast({
      title: "Shared! 🎉",
      description: "Spread the word about amazing food discoveries!",
    });
  };

  const statCards = [
    {
      icon: TrendingUp,
      value: stats.totalVenues,
      label: "Venues Listed",
      color: "text-primary",
      suffix: "+"
    },
    {
      icon: Heart,
      value: stats.totalSaved,
      label: "Money Saved",
      color: "text-red-500",
      prefix: "₹",
      suffix: "k"
    },
    {
      icon: Zap,
      value: stats.avgSavings,
      label: "Avg Savings",
      color: "text-yellow-500",
      prefix: "₹",
      suffix: "/day"
    },
    {
      icon: Users,
      value: stats.happyUsers,
      label: "Happy Users",
      color: "text-green-500",
      suffix: "+"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Real-time Impact
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how our community is saving money and discovering amazing places
          </p>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="mt-4 group"
          >
            <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Share the Love
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card 
              key={stat.label}
              className={`bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-500 cursor-pointer group ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-background/50 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold font-serif">
                    {stat.prefix}
                    <span className="animate-pulse-soft">
                      {stat.value.toLocaleString()}
                    </span>
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border animate-float">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Live: Someone just saved ₹150 at a cafe near Church Street!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};