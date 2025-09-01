import { useState } from 'react';
import { Heart, Share2, Star, Clock, MapPin, Eye, Bookmark, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EnhancedVenueCardProps {
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
    isOpen?: boolean;
    waitTime?: string;
    offers?: string[];
    photosCount?: number;
    lastVisited?: string;
    trending?: boolean;
  };
}

export const EnhancedVenueCard = ({ venue }: EnhancedVenueCardProps) => {
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites ❤️",
      description: `${venue.name} ${isFavorited ? 'removed from' : 'added to'} your favorites`,
    });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmarked! 📌",
      description: `${venue.name} ${isBookmarked ? 'removed from' : 'added to'} your reading list`,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Shared! 🎉",
      description: `Shared ${venue.name} with your friends`,
    });
  };

  const handleViewMenu = () => {
    toast({
      title: "Menu opened! 📋",
      description: "Viewing detailed menu and pricing",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-strong transition-all duration-500 bg-gradient-card border-0 group cursor-pointer animate-fade-in">
      {/* Image Section with Overlays */}
      <div className="relative h-56 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
        )}
        <img 
          src={venue.image} 
          alt={venue.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Status Indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge 
            variant="secondary" 
            className="bg-background/90 backdrop-blur-sm text-foreground font-medium"
          >
            {venue.type === 'cafe' ? '☕ Cafe' : venue.type === 'restaurant' ? '🍽️ Restaurant' : '🏨 Hotel'}
          </Badge>
          {venue.trending && (
            <Badge className="bg-gradient-accent text-accent-foreground animate-bounce-gentle">
              🔥 Trending
            </Badge>
          )}
          {venue.isOpen && (
            <Badge className="bg-green-500 text-white">
              🟢 Open Now
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-background/90 backdrop-blur-sm hover:scale-110 transition-transform"
            onClick={handleFavorite}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-background/90 backdrop-blur-sm hover:scale-110 transition-transform"
            onClick={handleBookmark}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-background/90 backdrop-blur-sm hover:scale-110 transition-transform"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Price and Special Offers */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge 
            variant="secondary" 
            className="bg-primary text-primary-foreground font-bold"
          >
            {venue.priceRange}
          </Badge>
          {venue.offers && venue.offers.length > 0 && (
            <Badge className="bg-green-500 text-white animate-pulse-soft">
              {venue.offers[0]}
            </Badge>
          )}
        </div>

        {/* Photo Count */}
        {venue.photosCount && (
          <div className="absolute bottom-3 right-3">
            <Badge 
              variant="secondary" 
              className="bg-background/90 backdrop-blur-sm text-foreground flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              {venue.photosCount}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg leading-tight font-serif group-hover:text-primary transition-colors">
              {venue.name}
            </h3>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold">{venue.rating}</span>
            </div>
          </div>
          
          {/* Quick Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{venue.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className={venue.isOpen ? 'text-green-600' : ''}>{venue.openHours}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{venue.reviews}</span>
            </div>
          </div>

          {/* Wait Time */}
          {venue.waitTime && (
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Wait time: {venue.waitTime}</span>
            </div>
          )}
        </div>

        {/* Cuisine & Specialties */}
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium text-accent">Cuisine:</span>
            <span className="ml-2 text-muted-foreground">{venue.cuisine.join(', ')}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {venue.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                {specialty}
              </Badge>
            ))}
            {venue.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{venue.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Footer with Price and Actions */}
        <div className="pt-3 border-t flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-primary">₹{venue.avgCost}</span>
              <span className="text-sm text-muted-foreground">per person</span>
            </div>
            {venue.lastVisited && (
              <p className="text-xs text-muted-foreground">Last visit: {venue.lastVisited}</p>
            )}
          </div>
          
          <Button 
            onClick={handleViewMenu}
            className="bg-gradient-primary hover:shadow-medium transition-all duration-300 hover:scale-105"
          >
            View Menu →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};