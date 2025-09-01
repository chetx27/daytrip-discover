import { useState } from 'react';
import { EnhancedVenueCard } from './EnhancedVenueCard';
import { SmartFilters } from './SmartFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowLeft, TrendingUp, Share2, Users } from 'lucide-react';

interface PlanResultsProps {
  searchData: {
    startLocation: string;
    occasion: string;
    destination: string;
  };
  onBack: () => void;
}

const mockVenues = [
  {
    id: '1',
    name: 'The Hole in the Wall Cafe',
    type: 'cafe' as const,
    rating: 4.5,
    reviews: 1250,
    priceRange: '₹₹',
    address: 'Church Street, Bangalore',
    distance: '2.3 km',
    openHours: '8:00 AM - 11:00 PM',
    cuisine: ['Continental', 'Italian'],
    specialties: ['Coffee', 'Pasta', 'Sandwiches'],
    avgCost: 350,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    isOpen: true,
    waitTime: '10-15 min',
    offers: ['20% off on drinks'],
    photosCount: 124,
    trending: true
  },
  {
    id: '2',
    name: 'Third Wave Coffee Roasters',
    type: 'cafe' as const,
    rating: 4.3,
    reviews: 890,
    priceRange: '₹₹',
    address: 'Church Street, Bangalore',
    distance: '1.8 km',
    openHours: '7:30 AM - 10:30 PM',
    cuisine: ['Coffee', 'Light Bites'],
    specialties: ['Specialty Coffee', 'Croissants', 'Bagels'],
    avgCost: 280,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
    isOpen: true,
    photosCount: 89,
    lastVisited: '2 days ago'
  },
  {
    id: '3',
    name: 'Koshy\'s Restaurant',
    type: 'restaurant' as const,
    rating: 4.2,
    reviews: 2100,
    priceRange: '₹₹',
    address: 'St. Marks Road, Bangalore',
    distance: '2.1 km',
    openHours: '8:30 AM - 11:00 PM',
    cuisine: ['Indian', 'Continental'],
    specialties: ['South Indian', 'Breakfast', 'Filter Coffee'],
    avgCost: 450,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    isOpen: false,
    photosCount: 203,
    trending: true
  },
  {
    id: '4',
    name: 'Blue Tokai Coffee Roasters',
    type: 'cafe' as const,
    rating: 4.4,
    reviews: 756,
    priceRange: '₹₹',
    address: 'Church Street, Bangalore',
    distance: '2.0 km',
    openHours: '8:00 AM - 10:00 PM',
    cuisine: ['Coffee', 'Snacks'],
    specialties: ['Artisan Coffee', 'Cold Brew', 'Desserts'],
    avgCost: 320,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
    isOpen: true,
    waitTime: '5-10 min',
    photosCount: 67
  },
  {
    id: '5',
    name: 'Matteo Coffea',
    type: 'cafe' as const,
    rating: 4.6,
    reviews: 432,
    priceRange: '₹₹₹',
    address: 'Church Street, Bangalore',
    distance: '2.5 km',
    openHours: '9:00 AM - 11:30 PM',
    cuisine: ['Italian', 'Continental'],
    specialties: ['Pizza', 'Gelato', 'Espresso'],
    avgCost: 550,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    isOpen: true,
    offers: ['Happy Hour 4-6 PM'],
    photosCount: 156,
    trending: true
  },
  {
    id: '6',
    name: 'The Breakfast Club',
    type: 'restaurant' as const,
    rating: 4.1,
    reviews: 1680,
    priceRange: '₹₹',
    address: 'Church Street, Bangalore',
    distance: '1.9 km',
    openHours: '8:00 AM - 4:00 PM',
    cuisine: ['Continental', 'American'],
    specialties: ['All-day Breakfast', 'Pancakes', 'Burgers'],
    avgCost: 380,
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
    isOpen: true,
    photosCount: 98,
    lastVisited: '1 week ago'
  }
];

export const PlanResults = ({ searchData, onBack }: PlanResultsProps) => {
  const [filteredVenues, setFilteredVenues] = useState(mockVenues);

  const handleFiltersChange = (filters: any) => {
    // Implement filtering logic here
    console.log('Filters changed:', filters);
  };

  const occasions = {
    date: '💕 Date',
    friends: '👥 Friends',
    dinner: '🍽️ Dinner',
    trip: '🗺️ Trip',
    solo: '☕ Solo'
  };

  const destinations = {
    'church-street': 'Church Street',
    'mg-road': 'MG Road', 
    'commercial-street': 'Commercial Street',
    'koramangala': 'Koramangala',
    'indiranagar': 'Indiranagar'
  };

  const totalEstimatedCost = filteredVenues.slice(0, 3).reduce((sum, venue) => sum + venue.avgCost, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 hover:scale-105 transition-transform">
          <ArrowLeft className="w-4 h-4" />
          New Search
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-serif mb-2">
            Perfect spots for your {occasions[searchData.occasion as keyof typeof occasions]}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>From {searchData.startLocation} to {destinations[searchData.destination as keyof typeof destinations]}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{filteredVenues.length} venues found</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Plan
        </Button>
      </div>

      {/* Cost Summary */}
      <div className="bg-gradient-accent p-6 rounded-xl text-accent-foreground shadow-medium">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Estimated Day Cost</h3>
            </div>
            <p className="text-3xl font-bold font-serif">₹{totalEstimatedCost}</p>
            <p className="text-sm opacity-90">Based on top 3 venues + travel</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">You could save up to</p>
            <p className="text-xl font-bold">₹{Math.floor(totalEstimatedCost * 0.2)}</p>
            <p className="text-xs opacity-75">with our deals</p>
          </div>
        </div>
      </div>

      {/* Smart Filters */}
      <SmartFilters onFiltersChange={handleFiltersChange} totalResults={filteredVenues.length} />

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.map((venue, index) => (
          <div key={venue.id} style={{ animationDelay: `${index * 100}ms` }}>
            <EnhancedVenueCard venue={venue} />
          </div>
        ))}
      </div>

      {filteredVenues.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No venues found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search in a different area.</p>
            <Button onClick={() => setFilteredVenues(mockVenues)} className="bg-gradient-primary">
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};