import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GraduationCap, Brain, Video, DollarSign, Clock } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    title: string;
    specializations: string[];
    experience: number;
    rating: number;
    reviewCount: number;
    sessionTypes: string[];
    pricePerSession: number;
    availableSlots: string[];
    imageUrl?: string;
  };
  onBookAppointment: (doctor: any) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 10);
    const hasHalfStar = (rating % 10) >= 5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const getNextAvailableSlot = () => {
    return doctor.availableSlots[0] || "No availability";
  };

  const getAvailabilityColor = (slot: string) => {
    if (slot.includes("Today")) return "text-green-600";
    if (slot.includes("Tomorrow")) return "text-blue-600";
    return "text-orange-600";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Doctor Header */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-primary">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
            <p className="text-muted-foreground">{doctor.title}</p>
            <div className="flex items-center mt-1">
              {renderStars(doctor.rating)}
              <span className="text-sm text-muted-foreground ml-2">
                {(doctor.rating / 10).toFixed(1)} ({doctor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-primary mr-3" />
            <span>{doctor.experience}+ years experience</span>
          </div>
          
          <div className="flex items-start text-sm text-muted-foreground">
            <Brain className="h-4 w-4 text-primary mr-3 mt-0.5" />
            <div className="flex-1">
              <div className="flex flex-wrap gap-1">
                {doctor.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Video className="h-4 w-4 text-primary mr-3" />
            <span>{doctor.sessionTypes.join(", ")} sessions</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 text-primary mr-3" />
            <span>${doctor.pricePerSession} per session</span>
          </div>
        </div>

        {/* Availability and Booking */}
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="font-medium text-foreground">Next Available:</span>
            </div>
            <span className={`text-sm font-medium ${getAvailabilityColor(getNextAvailableSlot())}`}>
              {getNextAvailableSlot()}
            </span>
          </div>
          
          <Button 
            onClick={() => onBookAppointment(doctor)}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={doctor.availableSlots.length === 0}
          >
            {doctor.availableSlots.length > 0 ? "Book Appointment" : "No Availability"}
          </Button>
        </div>

        {/* Additional Info */}
        {doctor.availableSlots.length > 1 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-muted-foreground">
              +{doctor.availableSlots.length - 1} more slot(s) available
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
