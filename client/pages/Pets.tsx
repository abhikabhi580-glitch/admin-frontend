import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Heart } from 'lucide-react';

const Pets: React.FC = () => {
  const features = [
    'Complete pet management with creation and editing forms',
    'Pet fields: name, subtitle, description, ability, image',
    'Image management with upload and preview',
    'Search and filter pets by name, ability, or description',
    'Sortable list view with pagination controls',
    'Pet ability comparison and statistics',
    'Batch operations for efficient pet management',
    'Integration with character bonding system'
  ];

  return (
    <PlaceholderPage
      title="Pets"
      description="Comprehensive pet management system for all your game companions with detailed profiles and relationship tracking."
      icon={<Heart className="w-6 h-6 text-rose-600" />}
      features={features}
    />
  );
};

export default Pets;
