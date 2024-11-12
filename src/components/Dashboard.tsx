import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  LeafIcon, 
  TreesIcon, 
  DropletIcon, 
  ThermometerIcon 
} from 'lucide-react';
import { usePlantationStore } from '../store/plantationStore';

export default function Dashboard() {
  const { selectedPlantation, weatherData } = usePlantationStore();

  const weatherChartData = {
    labels: weatherData.map(d => d.timestamp),
    datasets: [
      {
        label: 'Temperature',
        data: weatherData.map(d => d.temperature),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Humidity',
        data: weatherData.map(d => d.humidity),
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<LeafIcon className="w-8 h-8 text-green-500" />}
          title="NDVI Score"
          value={selectedPlantation?.ndviScore.toFixed(2) || '0.00'}
        />
        <MetricCard
          icon={<TreesIcon className="w-8 h-8 text-brown-500" />}
          title="Carbon Credits"
          value={`${selectedPlantation?.carbonCredits || 0} tons`}
        />
        <MetricCard
          icon={<DropletIcon className="w-8 h-8 text-blue-500" />}
          title="Soil Moisture"
          value="72%"
        />
        <MetricCard
          icon={<ThermometerIcon className="w-8 h-8 text-red-500" />}
          title="Average Temp"
          value="24°C"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Weather Trends</h3>
        <Line data={weatherChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}