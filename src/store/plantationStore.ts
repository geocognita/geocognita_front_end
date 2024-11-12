import { create } from 'zustand';
import type { PlantationData, MapLayer, WeatherData } from '../types';

interface PlantationStore {
  plantations: PlantationData[];
  selectedPlantation: PlantationData | null;
  mapLayers: MapLayer[];
  weatherData: WeatherData[];
  setSelectedPlantation: (plantation: PlantationData | null) => void;
  toggleMapLayer: (layerId: string) => void;
}

export const usePlantationStore = create<PlantationStore>((set) => ({
  plantations: [],
  selectedPlantation: null,
  mapLayers: [
    { id: 'soil', name: 'Soil Health', visible: true, type: 'soil', data: null },
    { id: 'irrigation', name: 'Irrigation', visible: false, type: 'irrigation', data: null },
    { id: 'ndvi', name: 'NDVI', visible: false, type: 'ndvi', data: null },
    { id: 'pest', name: 'Pest Control', visible: false, type: 'pest', data: null },
  ],
  weatherData: [],
  setSelectedPlantation: (plantation) => set({ selectedPlantation: plantation }),
  toggleMapLayer: (layerId) =>
    set((state) => ({
      mapLayers: state.mapLayers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      ),
    })),
}));