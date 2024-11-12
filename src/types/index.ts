export interface PlantationData {
  id: string;
  name: string;
  coordinates: [number, number][];
  area: number;
  plantationDate: string;
  variety: string;
  ndviScore: number;
  soilHealth: {
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  carbonCredits: number;
}

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  type: 'soil' | 'irrigation' | 'ndvi' | 'pest';
  data: any;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  timestamp: string;
}