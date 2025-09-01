import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, DollarSign, Utensils } from 'lucide-react';

interface VenueCardProps {
  venue: {
    id: string;
    name: string;
    type: 'cafe' | 'restaurant' | 'hotel';
    rating: number;
    reviews: number;
    priceRange: string;
    address: string;
    distance: string;
    openHours: string;
    cuisine: string[];
    specialties: string[];
    avgCost: number;
    image: string;
  };
}

export const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 bg-gradient-card border-0 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-background/90 backdrop-blur-sm text-foreground"
          >
            {venue.type === 'cafe' ? '☕ Cafe' : venue.type === 'restaurant' ? '🍽️ Restaurant' : '🏨 Hotel'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className="bg-primary text-primary-foreground font-semibold"
          >
            {venue.priceRange}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-lg leading-tight">{venue.name}</h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{venue.rating}</span>
              <span>({venue.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{venue.distance}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{venue.openHours}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm">
            <Utensils className="w-4 h-4 text-accent" />
            <span className="font-medium">Cuisine:</span>
            <span className="text-muted-foreground">{venue.cuisine.join(', ')}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {venue.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="font-semibold">₹{venue.avgCost}</span>
              <span className="text-sm text-muted-foreground">avg per person</span>
            </div>
            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              View Menu →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};