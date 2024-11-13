import React from 'react';
import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="h-[42px] top-0 bg-white/90 backdrop-blur-sm shadow-sm z-50 w-full">
      <div className="py-1 flex justify-center">
        <div className="flex items-center">
          <h1 className="text-xl text-orange-600">Sabiá Tech</h1>
        </div>
        <div className="flex items-center px-2">
          <div className="w-[1px] h-8 bg-gray-400"></div>
        </div>
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-green-800">Geocógnita</h1>
        </div>
        
      </div>
    </header>
  );
}