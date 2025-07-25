import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowRight } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  icon,
  features,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-3xl font-bold font-montserrat text-slate-900 mb-4">
          {title} Management
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>

        <Card className="text-left max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                {icon}
              </div>
              <div>
                <h3 className="font-semibold font-montserrat text-slate-900">
                  Coming Soon: Full {title} CRUD Operations
                </h3>
                <p className="text-slate-600">
                  Complete management interface for your game assets
                </p>
              </div>
            </div>

            <h4 className="font-medium text-slate-900 mb-4">
              Planned Features:
            </h4>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-indigo-800">
                <strong>Ready to implement:</strong> This page will include full
                CRUD operations, search functionality, pagination, form
                validation, and image upload capabilities. Continue prompting to
                have this section fully built out!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button size="lg" className="font-medium">
            Request Implementation
          </Button>
          <p className="text-sm text-slate-500 mt-2">
            Ask me to build out this section with full functionality
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
