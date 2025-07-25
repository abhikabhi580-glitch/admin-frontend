import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Users } from 'lucide-react';

const Characters: React.FC = () => {
  const features = [
    'Create and edit character profiles with detailed information',
    'Character fields: name, gender, age, description, ability, redeemed count',
    'Image upload and preview functionality',
    'Advanced search and filtering by character attributes',
    'Sortable data table with pagination',
    'Bulk operations for multiple character management',
    'Character ability statistics and progression tracking',
    'Export character data to various formats'
  ];

  return (
    <PlaceholderPage
      title="Characters"
      description="Manage your game characters with complete CRUD operations, detailed profiles, and advanced search capabilities."
      icon={<Users className="w-6 h-6 text-indigo-600" />}
      features={features}
    />
  );
};

export default Characters;
