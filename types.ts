export interface Material {
  id: string;
  name: string;
  category: string;
  country: string;
  description: string;
  thermalProperties: string;
  imageUrl: string;
  carbonFootprint: number; // kg CO2e per kg
}

export interface Project {
  id: string;
  title: string;
  location: string;
  status: 'Concept' | 'En cours' | 'Terminé';
  thumbnailUrl: string;
  completion: number;
}

export interface WeatherAdvice {
  city: string;
  temperature: string;
  condition: string;
  advice: string;
}

export interface CarbonCalculation {
  materialName: string;
  importedDistance: number;
  localDistance: number;
  weightKg: number;
  savedCo2: number;
}
