import { Header } from './components/Header';
import { MapView } from './components/Map';
import React, { useState } from 'react';
import { Map, Users, Settings, Bell, Search} from 'lucide-react';

const SidebarIcon = ({ icon: Icon, tooltip, active, onClick }) => (
  <div className="relative group" onClick={onClick}>
    <button
      className={`p-2 rounded-lg transition-colors duration-200 
        ${active 
          ? 'text-green-600 bg-green-50' 
          : 'text-gray-600 hover:bg-gray-300'
        }`}
    >
      <div className={`sidebar-icon ${active ? 'active' : ''}`} title={tooltip} >
        <Icon size={24} />
      </div>
    </button>
  </div>
);

const Sidebar = ({ actived, setActive }) => {
  return (
    <nav className="w-14 bg-white border-r border-gray-200 flex flex-col items-center py-4 fixed h-[calc(100vh-40px)]">
      <div className="space-y-2">
        <SidebarIcon
          icon={Map}
          tooltip="Map View"
          active={actived === 'Map View'}
          onClick={() => setActive('Map View')}
        />
        <SidebarIcon
          icon={Search}
          tooltip="Search"
          active={actived === 'Search'}
          // if active is Search, set active to Map View. Else, set active to Search
          onClick={() => setActive(actived === 'Search' ? 'Map View' : 'Search')}
        />
        <SidebarIcon
          icon={Bell}
          tooltip="Notifications"
          active={actived === 'Notifications'}
          onClick={() => setActive('Notifications')}
        />
      </div>
      <div className="mt-auto">
        <SidebarIcon
          icon={Settings}
          tooltip="Settings"
          active={actived === 'Settings'}
          onClick={() => setActive('Settings')}
        />
      </div>
    </nav>
  );
};

function App() {
  const [actived, setActive] = useState("Map View");

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar setActive={setActive}  actived={actived} />
        <main className="flex-1 ml-14">
          <MapView lat={-18.587258} long={-46.514675} actived={actived === "Search"}/>
        </main>
      </div>
    </div>
  );
}
export default App;