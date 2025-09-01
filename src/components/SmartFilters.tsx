import { useState } from 'react';
import { Sliders, Zap, Filter, SortAsc, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface SmartFiltersProps {
  onFiltersChange: (filters: any) => void;
  totalResults: number;
}

export const SmartFilters = ({ onFiltersChange, totalResults }: SmartFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [venueType, setVenueType] = useState('all');

  const cuisines = [
    'Continental', 'Indian', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Japanese', 'American'
  ];

  const features = [
    'Free WiFi', 'Outdoor Seating', 'Pet Friendly', 'Live Music', 'Parking', 'AC', 'Rooftop', 'Late Night'
  ];

  const quickFilters = [
    { id: 'budget', label: 'Budget Friendly', icon: DollarSign, filter: { maxPrice: 300 } },
    { id: 'nearby', label: 'Nearby', icon: MapPin, filter: { maxDistance: 2 } },
    { id: 'open', label: 'Open Now', icon: Clock, filter: { openNow: true } },
    { id: 'trending', label: 'Trending', icon: Zap, filter: { trending: true } },
    { id: 'top-rated', label: 'Top Rated', icon: Star, filter: { minRating: 4.5 } },
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleQuickFilter = (filterId: string) => {
    // Implement quick filter logic
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSelectedCuisines([]);
    setSelectedFeatures([]);
    setSortBy('rating');
    setVenueType('all');
  };

  const activeFiltersCount = selectedCuisines.length + selectedFeatures.length + 
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) + 
    (venueType !== 'all' ? 1 : 0);

  return (
    <Card className="p-4 bg-gradient-card border-0 shadow-soft">
      {/* Search and Quick Actions */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Input
              placeholder="Search venues, cuisine, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background/50 flex items-center gap-2"
          >
            <option value="rating">★ Rating</option>
            <option value="price">💰 Price</option>
            <option value="distance">📍 Distance</option>
            <option value="popularity">🔥 Popularity</option>
            <option value="newest">🆕 Newest</option>
          </select>

          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 relative"
          >
            <Sliders className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-accent">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickFilters.map((filter) => (
          <Button
            key={filter.id}
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter(filter.id)}
            className="flex items-center gap-1 hover:bg-primary/10 transition-colors"
          >
            <filter.icon className="w-3 h-3" />
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t animate-fade-in">
          {/* Venue Type */}
          <div>
            <h4 className="font-semibold mb-2">Venue Type</h4>
            <div className="flex gap-2">
              {['all', 'cafe', 'restaurant', 'hotel'].map((type) => (
                <Button
                  key={type}
                  variant={venueType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVenueType(type)}
                  className="capitalize"
                >
                  {type === 'all' ? 'All Types' : type}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-2">Price Range</h4>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="font-semibold mb-2">Cuisines</h4>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCuisineToggle(cuisine)}
                  className="text-xs"
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <Button
                  key={feature}
                  variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFeatureToggle(feature)}
                  className="text-xs"
                >
                  {feature}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-between items-center pt-4">
            <Badge variant="secondary">
              {totalResults} venues found
            </Badge>
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};