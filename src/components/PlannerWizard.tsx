import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Users, Coffee, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

interface WizardData {
  startLocation: string;
  occasion: string;
  destination: string;
}

interface PlannerWizardProps {
  onComplete: (data: WizardData) => void;
}

const occasions = [
  { id: 'date', label: 'Date', icon: '💕', desc: 'Romantic outing' },
  { id: 'friends', label: 'Friends Meetup', icon: '👥', desc: 'Hang out with friends' },
  { id: 'dinner', label: 'Dinner', icon: '🍽️', desc: 'Evening dining' },
  { id: 'trip', label: 'Day Trip', icon: '🗺️', desc: 'Explore the city' },
  { id: 'solo', label: 'Solo Time', icon: '☕', desc: 'Me time' },
];

const destinations = [
  { id: 'church-street', label: 'Church Street', desc: 'Trendy cafes & restaurants' },
  { id: 'mg-road', label: 'MG Road', desc: 'Business district dining' },
  { id: 'commercial-street', label: 'Commercial Street', desc: 'Shopping & food paradise' },
  { id: 'koramangala', label: 'Koramangala', desc: 'Hip food scene' },
  { id: 'indiranagar', label: 'Indiranagar', desc: 'Pub street vibes' },
];

export const PlannerWizard = ({ onComplete }: PlannerWizardProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    startLocation: '',
    occasion: '',
    destination: '',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(data);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return data.startLocation.trim() !== '';
      case 2: return data.occasion !== '';
      case 3: return data.destination !== '';
      default: return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 1 && (
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Where are you starting from?
              </div>
            )}
            {step === 2 && (
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6 text-accent" />
                What's the occasion?
              </div>
            )}
            {step === 3 && (
              <div className="flex items-center justify-center gap-2">
                <Coffee className="w-6 h-6 text-primary" />
                Where do you want to explore?
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Start Location */}
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="location" className="text-base">Your current location</Label>
              <Input
                id="location"
                value={data.startLocation}
                onChange={(e) => setData({ ...data, startLocation: e.target.value })}
                placeholder="e.g., Whitefield, Electronic City, Jayanagar..."
                className="h-12 text-lg"
              />
              <p className="text-muted-foreground text-sm">
                This helps us calculate travel time and suggest the best routes.
              </p>
            </div>
          )}

          {/* Step 2: Occasion */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {occasions.map((occasion) => (
                <button
                  key={occasion.id}
                  onClick={() => setData({ ...data, occasion: occasion.id })}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    data.occasion === occasion.id
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-border hover:border-primary/50 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{occasion.icon}</span>
                    <div>
                      <h3 className="font-semibold">{occasion.label}</h3>
                      <p className="text-sm text-muted-foreground">{occasion.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Destination */}
          {step === 3 && (
            <div className="space-y-4">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setData({ ...data, destination: dest.id })}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    data.destination === dest.id
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-border hover:border-primary/50 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{dest.label}</h3>
                      <p className="text-muted-foreground">{dest.desc}</p>
                    </div>
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-gradient-primary hover:shadow-medium transition-all duration-200"
            >
              {step === 3 ? 'Find Places' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};