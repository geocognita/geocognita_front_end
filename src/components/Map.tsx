import React, { useState } from 'react';
import Map, { NavigationControl, Marker, Source, Layer } from 'react-map-gl';
import { Search, X, Layers } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const PLANET_API_KEY = 'PLAK1365e45d5c964bfabdc841aa6820b0af'; // Replace with your Planet API key

const LayerSwitcher = ({ activeLayer, onLayerChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const layers = [
    { id: 'mapbox-dark', name: 'Mapbox Dark', value: 'mapbox://styles/mapbox/dark-v11' },
    { id: 'mapbox-satellite', name: 'Mapbox Satellite', value: 'mapbox://styles/mapbox/satellite-v9' },
    { id: 'planet-basemap', name: 'Planet Monthly', type: 'planet' },
    { id: 'planet-quarterly', name: 'Planet Quarterly', type: 'planet-quarterly' },
    { id: 'planet-nicfi', name: 'Planet NICFI', type: 'planet-nicfi' }
  ];

  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
      >
        <Layers size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => {
                onLayerChange(layer);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                activeLayer.id === layer.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {layer.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PlanetLayer = ({ type }) => {
  // Planet basemap tile endpoints
  const tileUrls = {
    'planet': `https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2023_05_mosaic/gmap/{z}/{x}/{y}.png?api_key=${PLANET_API_KEY}`,
    'planet-quarterly': `https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2024-01_mosaic/gmap/{z}/{x}/{y}.png?api_key=${PLANET_API_KEY}`,
    'planet-nicfi': `https://tiles.planet.com/basemaps/v1/planet-tiles/nicfi_2023_05/gmap/15/5242/12663.png?api_key=${PLANET_API_KEY}`
  };

  return (
    <Source
      type="raster"
      tiles={[tileUrls[type]]}
      tileSize={256}
    >
      <Layer
        id="planet-tiles"
        type="raster"
        minzoom={0}
        maxzoom={20}
        paint={{
          'raster-opacity': 1
        }}
      />
    </Source>
  );
};

// SearchBox component remains the same...
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
  const mapboxAccessToken = "pk.eyJ1IjoiaWdvcmxlbWVzIiwiYSI6ImNtM2FtYjIyMDFkYTgyaXB2cW03NGIyd2gifQ.grNCv_edt7NBoes6hGeteg";
  const [viewState, setViewState] = useState({
    longitude: long,
    latitude: lat,
    zoom: 14
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeLayer, setActiveLayer] = useState({
    id: 'mapbox-dark',
    name: 'Mapbox Dark',
    value: 'mapbox://styles/mapbox/dark-v11'
  });

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
      <SearchBox 
        onSelectLocation={handleLocationSelect} 
        mapboxAccessToken={mapboxAccessToken} 
      />
      <LayerSwitcher 
        activeLayer={activeLayer} 
        onLayerChange={setActiveLayer} 
      />
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxAccessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle={activeLayer.type === 'planet' ? 'mapbox://styles/mapbox/empty-v9' : activeLayer.value}
      >
        {activeLayer.type && activeLayer.type.startsWith('planet') && (
          <PlanetLayer type={activeLayer.type} />
        )}
        <NavigationControl position="bottom-right" />
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            color="#3B82F6"
          />
        )}
      </Map>
    </div>
  );
}