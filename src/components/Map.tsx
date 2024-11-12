import React, { useState } from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import { Search, X } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';



const SearchBox = ({ onSelectLocation, mapboxAccessToken }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${mapboxAccessToken}&limit=5`
      );
      const data = await response.json();
      setResults(data.features);
    } catch (error) {
      console.error('Error searching locations:', error);
    }
    setIsLoading(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-80">
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search location..."
            className="w-full px-4 py-2 pl-10 pr-10 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {results.length > 0 && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => {
                  onSelectLocation({
                    longitude: result.center[0],
                    latitude: result.center[1],
                    name: result.place_name
                  });
                  clearSearch();
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                <div className="font-medium">{result.text}</div>
                <div className="text-sm text-gray-500">{result.place_name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export function MapView({ lat, long }) {
  const mapboxAccessToken = "pk.eyJ1IjoiaWdvcmxlbWVzIiwiYSI6ImNtM2FtYjIyMDFkYTgyaXB2cW03NGIyd2gifQ.grNCv_edt7NBoes6hGeteg"
  const [viewState, setViewState] = useState({
    longitude: long,
    latitude: lat,
    zoom: 14
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setViewState({
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 14
    });
  };

  return (
    <div className="relative w-full h-full">
      <SearchBox onSelectLocation={handleLocationSelect} mapboxAccessToken={mapboxAccessToken} />
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken = {mapboxAccessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
}