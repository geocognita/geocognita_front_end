import { Header } from './components/Header';
import { MapView } from './components/Map';
import React, { useState } from 'react';
import { Map, Users, Settings, Bell, Search} from 'lucide-react';


const Sidebar = () => {
  const [actived, setActive] = useState("Map View");

  const SidebarIconActive = (tooltip) => {
    setActive(tooltip);
  }

  const SidebarIcon = ({ icon: Icon, tooltip, active }) => {
    return (
      <div className="relative group">
        <button
          className={`p-3 rounded-lg transition-colors duration-200 
            ${active 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => SidebarIconActive(tooltip)}
        >
          <Icon size={24} />
        </button>
        <div className="absolute left-16 top-2 scale-0 group-hover:scale-100 transition-transform duration-200 origin-left">
          <div className="bg-gray-900 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
            {tooltip}
          </div>
        </div>
      </div>
    );
  };
    
  return (
    <nav className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 fixed h-[calc(100vh-60px)]">
      <div className="space-y-2">
        <SidebarIcon icon={Map} tooltip="Map View" active={actived === 'Map View'} />
        <SidebarIcon icon={Search} tooltip="Search" active={actived === "Search"}/>
        <SidebarIcon icon={Bell} tooltip="Notifications" active={actived === "Notifications"}/>
      </div>
      <div className="mt-auto">
        <SidebarIcon icon={Settings} tooltip="Settings" active={Sidebar.activate === "Settings"}/>
        {/* <SidebarIcon icon={CircleHelp} tooltip="Help" />  */}
      </div> 
      {/* <div className="h-14"></div> */}
    </nav>
    // Add some space below
  );
};





function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 mt-[60px]">
        <Sidebar />
        <main className="flex-1 ml-16">
          <MapView lat={-18.587258} long={-46.514675} search-active/>
        </main>
      </div>
    </div>
  );
}
export default App;