import React from 'react';
import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container  px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-semibold text-gray-800">Sabia Tech</h1>
          </div>
        </div>
      </div>
    </header>
  );
}