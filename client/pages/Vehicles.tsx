import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Car } from 'lucide-react';

const Vehicles: React.FC = () => {
  const features = [
    'Full vehicle fleet management with detailed specifications',
    'Vehicle fields: name, HP, acceleration/torque, speed, control, seats, ideal use case',
    'Performance statistics visualization and comparison',
    'Advanced filtering by vehicle type, performance metrics, and capacity',
    'Sortable data table with comprehensive vehicle information',
    'Vehicle performance analytics and optimization suggestions',
    'Bulk editing for fleet-wide updates',
    'Integration with character vehicle assignments'
  ];

  return (
    <PlaceholderPage
      title="Vehicles"
      description="Advanced vehicle fleet management with performance tracking, detailed specifications, and optimization tools."
      icon={<Car className="w-6 h-6 text-amber-600" />}
      features={features}
    />
  );
};

export default Vehicles;
