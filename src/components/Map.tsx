import React, { useState, useEffect } from 'react';
import Map, { NavigationControl, GeolocateControl, Marker, Source, Layer } from 'react-map-gl';
import { Search, X, Layers, Globe } from 'lucide-react';
import { Map as MapIcon } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const PLANET_API_KEY = 'PLAK1365e45d5c964bfabdc841aa6820b0af';

const LayerSwitcher = ({ activeLayer, onLayerChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const layers = [
    { id: 'mapbox-outdoors', name: 'Map', value: 'mapbox://styles/mapbox/outdoors-v12' },
    { id: 'mapbox-satellite', name: 'Mapbox Satellite', value: 'mapbox://styles/mapbox/satellite-streets-v12' },
    { id: 'planet', name: 'Analytics Satellite', type: 'planet' },
  ];

  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-2 rounded shadow-lg border border-gray-200 hover:bg-gray-50"
      >
        <Layers size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute right-12 top-0 w-48 bg-white rounded shadow-lg border border-gray-200">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => {
                onLayerChange(layer);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                activeLayer.id === layer.id ? 'bg-green-50 text-green-600' : ''
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

// Swtich between NDVI mode and satellite mode
const ModeSwitcher = ({ active, onModeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: 'ndvi', name: 'NDVI', value: 'ndvi' },
    { id: 'ndwi', name: 'NDWI', value: 'ndwi' },
    { id: 'msavi2', name: 'MSAVI2', value: 'msavi2' },
    { id: 'mtvi2', name: 'MTVI2', value: 'mtvi2' },
    { id: 'vari', name: 'VARI', value: 'vari' },
    { id: 'tgi', name: 'TGI', value: 'tgi' },
  ];

  return (
    <div className="absolute top-24 right-2 z-10 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-2 rounded shadow-lg border border-gray-200 hover:bg-gray-50"
      >
        <Layers size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute right-12 top-0 w-48 bg-white rounded shadow-lg border border-gray-200">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                onModeChange(mode);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                active.id === mode.id ? 'bg-green-50 text-green-600' : ''
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SphereToggleButton = ({ active, onClick }) => {
  return (
    
    <div className="absolute top-14 right-2 z-10">
      <button
        onClick={onClick}
        className="bg-white p-2 rounded shadow-lg border border-gray-200 hover:bg-gray-50"
      >
        {active ?
          <MapIcon size={24} />
          : <Globe size={24} />
        }
      </button>
      
    </div>
  );
}


const PlanetLayer = ({ type, mode}) => {
  // Planet basemap tile endpoints
  const tileUrls = {
    'planet': `https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2024-01_mosaic/gmap/{z}/{x}/{y}.png?api_key=${PLANET_API_KEY}`,
    'planet-nicfi': `https://tiles.planet.com/basemaps/v1/planet-tiles/nicfi_2023_05/gmap/15/5242/12663.png?api_key=${PLANET_API_KEY}`
  };

  const url = tileUrls[type] + `&proc=${mode}`;

  // Maine polygon with satellite configuration
  const mainePolygonCoordinates =
    [[-47.4440984617, -18.1584651772], [-47.4354332485, -18.1671312656], [-47.4295967885, -18.1653521695], [-47.4259896936, -18.1731281045], [-47.4290696337, -18.1804862003], [-47.4237956254, -18.1823755081], [-47.4231535483, -18.1934002705], [-47.4069628898, -18.2001370943], [-47.4149839159, -18.2095477311], [-47.4122318863, -18.2198459813], [-47.3712088568, -18.2239315803], [-47.3479343784, -18.2386115515], [-47.3463744455, -18.2467499849], [-47.3537045446, -18.2512102486], [-47.3581615668, -18.2631706282], [-47.3767328060, -18.2701845934], [-47.3777976024, -18.2769842681], [-47.3715950642, -18.2838094181], [-47.3592959508, -18.2881861853], [-47.3515678955, -18.3038410418], [-47.3440709088, -18.3062025444], [-47.3327606397, -18.3193559933], [-47.3254274308, -18.3203384369], [-47.3497094658, -18.3488091073], [-47.3438771322, -18.3682009655], [-47.3412612560, -18.3745572705], [-47.3443415997, -18.3790027034], [-47.3305207307, -18.3878684042], [-47.3134888155, -18.4165400095], [-47.2970990008, -18.4142433588], [-47.2937386226, -18.4207896599], [-47.3030655296, -18.4249004812], [-47.3170646707, -18.4248795275], [-47.3193784209, -18.4364078708], [-47.3129318958, -18.4494624626], [-47.3162981973, -18.4654593612], [-47.3233471378, -18.4746181494], [-47.3234545266, -18.4823098877], [-47.3235344608, -18.4838114675], [-47.3238234691, -18.4980087849], [-47.3328995040, -18.5031243125], [-47.3298249851, -18.5144848765], [-47.3310134554, -18.5365062378], [-47.3200087798, -18.5350692946], [-47.3071544284, -18.5397574800], [-47.3070427190, -18.5506059438], [-47.2960204657, -18.5506142951], [-47.3035016817, -18.5685503751], [-47.3158025681, -18.5720400481], [-47.3110980247, -18.5782744822], [-47.3118048551, -18.5862927718], [-47.3239313291, -18.5831026204], [-47.3251219663, -18.5868142328], [-47.3318529233, -18.5888617155], [-47.3319882009, -18.5839441409], [-47.3392031989, -18.5826495074], [-47.3322329409, -18.5779215857], [-47.3390366712, -18.5758135967], [-47.3405685440, -18.5605942954], [-47.3478440369, -18.5617102759], [-47.3496515142, -18.5551869650], [-47.3612777771, -18.5492209800], [-47.3635741768, -18.5427782499], [-47.3731534945, -18.5360315515], [-47.3781266128, -18.5348039727], [-47.3795965828, -18.5411501078], [-47.3872089883, -18.5499379921], [-47.3932692645, -18.5516146553], [-47.3955400469, -18.5585665731], [-47.4143154710, -18.5539814695], [-47.4162082874, -18.5457109263], [-47.4159056262, -18.5331062772], [-47.4492407428, -18.5129908961], [-47.4458448199, -18.4880088508], [-47.4476492539, -18.4744417477], [-47.4535091696, -18.4685713279], [-47.4538749118, -18.4674757494], [-47.4535190614, -18.4636358109], [-47.4634289301, -18.4593635118], [-47.4638787406, -18.4695078520], [-47.4676444705, -18.4732499756], [-47.4716019152, -18.4669387992], [-47.4697126824, -18.4613323275], [-47.4808262930, -18.4580520042], [-47.4796844129, -18.4536637947], [-47.4841779645, -18.4500497021], [-47.4850113091, -18.4438523184], [-47.4924888452, -18.4409222061], [-47.4892125465, -18.4353575054], [-47.4837093065, -18.4342062050], [-47.4876303952, -18.4286534268], [-47.4929547189, -18.4283190642], [-47.4886796999, -18.4199611161], [-47.4996384891, -18.4194661677], [-47.4999801170, -18.4069637915], [-47.5029573459, -18.4024955076], [-47.5078466542, -18.4037321175], [-47.5103252271, -18.3989429141], [-47.5226271504, -18.3971139447], [-47.5251786554, -18.4030859514], [-47.5305662436, -18.4011408215], [-47.5311587789, -18.3967026050], [-47.5361598535, -18.3964223245], [-47.5423758788, -18.4048461678], [-47.5489586766, -18.4043889399], [-47.5529907146, -18.3993807322], [-47.5558220518, -18.4054699313], [-47.5633792695, -18.4026531115], [-47.5804258708, -18.4084410528], [-47.5840199347, -18.4022774261], [-47.6049301060, -18.3883865186], [-47.6086284270, -18.3882935068], [-47.6137911381, -18.3795060350], [-47.6227136848, -18.3842967359], [-47.6241037721, -18.3777275187], [-47.6309867839, -18.3797996859], [-47.6285171392, -18.3717416887], [-47.6350451837, -18.3724182942], [-47.6392093663, -18.3629464775], [-47.6470127344, -18.3641558222], [-47.6413767305, -18.3565537693], [-47.6443804937, -18.3525908810], [-47.6526850533, -18.3596879742], [-47.6599300438, -18.3545347474], [-47.6650160991, -18.3554843021], [-47.6686269792, -18.3648718821], [-47.6789148603, -18.3559021930], [-47.6702618559, -18.3570126024], [-47.6571269450, -18.3273418589], [-47.6527388755, -18.3257843231], [-47.6464902007, -18.3298485974], [-47.6477080738, -18.3402365213], [-47.6328483995, -18.3330558919], [-47.6257381258, -18.3338354800], [-47.6238177167, -18.3221739618], [-47.6108159541, -18.3149281849], [-47.6268730617, -18.3026768806], [-47.6323211656, -18.2911582505], [-47.6383236282, -18.2872163566], [-47.6294600060, -18.2767893761], [-47.6185736612, -18.2712493744], [-47.6253420366, -18.2589682398], [-47.6141252032, -18.2504211521], [-47.6147915743, -18.2618375706], [-47.6068520885, -18.2634266237], [-47.6018724777, -18.2558250235], [-47.6031815749, -18.2502501497], [-47.6069940924, -18.2464762754], [-47.5903411128, -18.2353431299], [-47.5813526076, -18.2346438155], [-47.5810161064, -18.2312455051], [-47.5881764680, -18.2265749237], [-47.5815407403, -18.2233696378], [-47.5760410096, -18.2255406418], [-47.5705089205, -18.2198630078], [-47.5671227906, -18.2034028088], [-47.5613452314, -18.2081701128], [-47.5572911733, -18.2075745171], [-47.5433515485, -18.1947698165], [-47.5357949505, -18.1944135200], [-47.5341259882, -18.1981552339], [-47.5396853915, -18.2168730541], [-47.5387419282, -18.2272968754], [-47.5332940388, -18.2302439195], [-47.5270482810, -18.2257818267], [-47.5302036032, -18.2173865550], [-47.5175725320, -18.2101357662], [-47.5177600825, -18.1984133590], [-47.5047919104, -18.1918007771], [-47.4967347850, -18.1986407589], [-47.4894541921, -18.1919690129], [-47.4844871453, -18.1930678128], [-47.4876729320, -18.1863167426], [-47.4831633932, -18.1804025941], [-47.4829642774, -18.1802637571], [-47.4795425623, -18.1767599397], [-47.4710184845, -18.1795889402], [-47.4681214473, -18.1758699451], [-47.4635139227, -18.1768986651], [-47.4507942221, -18.1587100399], [-47.4440984617, -18.1584651772]];
   // Maine polygon GeoJSON
   const mainePolygon = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [mainePolygonCoordinates]
    }
  };

  return (
    <Source
      type="raster"
      tiles={[url]}
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

const SearchBox = ({ onSelectLocation, mapboxAccessToken }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

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
    <div className="absolute top-2 left-2 z-10 w-[500px]">
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Pesquisar localização..."
            className="w-full px-4 py-2 pl-10 pr-10 bg-white rounded shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
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
          <div className="absolute w-full mt-2 bg-white rounded shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
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

export function MapView({ lat, long, actived }) {
  const mapboxAccessToken = "pk.eyJ1IjoiaWdvcmxlbWVzIiwiYSI6ImNtM2FtYjIyMDFkYTgyaXB2cW03NGIyd2gifQ.grNCv_edt7NBoes6hGeteg";
  const [viewState, setViewState] = useState({
    longitude: long,
    latitude: lat,
    zoom: 14,
    pitch: 45,
    bearing: 0
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeLayer, setActiveLayer] = useState({
    id: 'mapbox-outdoors',
    name: 'Mapbox',
    value: 'mapbox://styles/mapbox/outdoors-v12'
  });

  const [analitycsMode, setAnalitycsMode] = useState('satellite');
  const [isGlobeMode, setIsGlobeMode] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Load your GeoJSON (you can do this via fetch or import)
  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const response = await fetch('/data/manhuacu.geojson');
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error('Error loading GeoJSON:', error);
      }
    };

    loadGeoJson();
  }, []);

  const handleFeatureClick = (event) => {
    // Check if event and event.features exist
    if (event && event.features && event.features.length > 0) {
      const feature = event.features[0];
      
      // Additional check to ensure feature has valid geometry
      if (feature.geometry && feature.geometry.coordinates) {
        // Center the map on the clicked feature
        setViewState(prevState => ({
          ...prevState,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom: 15
        }));
  
        // Set the selected feature for the popup
        setSelectedFeature({
          coordinates: feature.geometry.coordinates,
          properties: feature.properties
        });
  
        console.log(feature.properties);
      } else {
        console.warn('Feature does not have valid coordinates');
      }
    } else {
      console.warn('No features found on click');
    }
  };
  
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setViewState({
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 14
    });
  };
  
  
  const toggleGlobeMode = () => {
    setIsGlobeMode(!isGlobeMode);
  };
  
  // Terrain layer configuration
  const terrainLayer = {
    'id': 'terrain-3d',
    'source': 'mapbox-dem',
    'type': 'fill-extrusion',
    'paint': {
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['get', 'elevation'],
        0, 0,
        8848, 8848
      ],
      'fill-extrusion-opacity': 0.6
    }
  };

  return (
    <div className="relative w-full h-full">
      {actived && (
        <SearchBox 
          onSelectLocation={handleLocationSelect} 
          mapboxAccessToken={mapboxAccessToken} 
        />
      )}
      <LayerSwitcher 
        activeLayer={activeLayer} 
        onLayerChange={setActiveLayer} 
      />
      <SphereToggleButton 
        active={isGlobeMode} 
        onClick={toggleGlobeMode}
      />
      < ModeSwitcher
        active={analitycsMode}
        onModeChange={setAnalitycsMode}
        />
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxAccessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle={activeLayer.value}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        projection={isGlobeMode ? 'globe' : 'mercator'}
        onClick={handleFeatureClick}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
        />

        <Layer {...terrainLayer} />
        
        {activeLayer.type && activeLayer.type.startsWith('planet') && (
            <PlanetLayer type={activeLayer.type} mode={analitycsMode.value} />
        )}
          
        {/* Satellite source */}
        <Source
          id="satellite"
          type="raster"
          url="mapbox://styles/mapbox/satellite-streets-v12"
          tileSize={512}
        />

        // Inside the Map component, add:
        {geoJsonData && (
            <Source type="geojson" data={geoJsonData}>
              <Layer
                type="fill"
                paint={{
                  'fill-color': '#088',
                  'fill-opacity': 0.01
                }}
                interactive={true} 
              />
              <Layer
                type="line"
                paint={{
                  'line-color': '#088',
                  'line-width': 2
                }}
                interactive={true} 
              />
            </Source>
        )}

        {/* Popup for selected feature */}
        {selectedFeature && (
          <Popup
            longitude={selectedFeature.coordinates[0]}
            latitude={selectedFeature.coordinates[1]}
            anchor="bottom"
            onClose={() => setSelectedFeature(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Feature Details</h3>
              {Object.entries(selectedFeature.properties).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <span className="font-semibold">{key}:</span> {value}
                </div>
              ))}
            </div>
          </Popup>
        )}
        
        <NavigationControl position="bottom-right" />
      </Map>
      
      
    </div>
  );
}