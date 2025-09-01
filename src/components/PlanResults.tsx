import { useState } from 'react';
import { VenueCard } from './VenueCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Filter, Search, MapPin, ArrowLeft, TrendingUp } from 'lucide-react';

interface PlanResultsProps {
  searchData: {
    startLocation: string;
    occasion: string;
    destination: string;
  };
  onBack: () => void;
}

// Mock data - in real app this would come from API
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
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'
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
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400'
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
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
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
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400'
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
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'
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
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400'
  }
];

export const PlanResults = ({ searchData, onBack }: PlanResultsProps) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

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

  const filteredVenues = mockVenues
    .filter(venue => {
      if (filter !== 'all' && venue.type !== filter) return false;
      if (searchTerm && !venue.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.avgCost - b.avgCost;
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  const totalEstimatedCost = filteredVenues.slice(0, 3).reduce((sum, venue) => sum + venue.avgCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          New Search
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Perfect spots for your {occasions[searchData.occasion as keyof typeof occasions]}
          </h1>
          <p className="text-muted-foreground">
            From {searchData.startLocation} to {destinations[searchData.destination as keyof typeof destinations]}
          </p>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-gradient-accent p-4 rounded-lg text-accent-foreground">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold">Estimated Day Cost</h3>
        </div>
        <p className="text-2xl font-bold">₹{totalEstimatedCost}</p>
        <p className="text-sm opacity-90">Based on top 3 venues + travel</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="all">All Types</option>
            <option value="cafe">Cafes</option>
            <option value="restaurant">Restaurants</option>
            <option value="hotel">Hotels</option>
          </select>
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price">Sort by Price</option>
          <option value="distance">Sort by Distance</option>
        </select>

        <Badge variant="secondary" className="ml-auto">
          {filteredVenues.length} venues found
        </Badge>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {filteredVenues.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No venues found matching your criteria.</p>
          <Button variant="outline" onClick={() => { setFilter('all'); setSearchTerm(''); }} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};