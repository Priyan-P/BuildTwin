import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Eye, 
  Layers, 
  RotateCcw, 
  Maximize2, 
  Zap, 
  Droplet, 
  Flame, 
  Wifi, 
  Tv, 
  Info, 
  X, 
  CheckSquare, 
  Square,
  Building
} from 'lucide-react';

// 3D Utility Colors
const UTILITY_COLORS = {
  electrical: '#ef4444',
  water: '#3b82f6',
  gas: '#f59e0b',
  cable: '#10b981',
  appliance: '#8b5cf6'
};

// 3D Architectural House Structural Mesh Component
const HouseStructure = ({ xRayMode, floorView }) => {
  const wallOpacity = xRayMode ? 0.25 : 0.85;

  return (
    <group>
      {/* Ground Slab */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Ground Floor Walls (Shown if floorView === 'all' or 'ground') */}
      {(floorView === 'all' || floorView === 'ground') && (
        <group position={[0, 1.5, 0]}>
          {/* Outer Walls */}
          <mesh position={[0, 0, -3.95]}>
            <boxGeometry args={[9.8, 3, 0.1]} />
            <meshStandardMaterial color="#f1f5f9" transparent opacity={wallOpacity} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 3.95]}>
            <boxGeometry args={[9.8, 3, 0.1]} />
            <meshStandardMaterial color="#f1f5f9" transparent opacity={wallOpacity} roughness={0.4} />
          </mesh>
          <mesh position={[-4.95, 0, 0]}>
            <boxGeometry args={[0.1, 3, 7.8]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={wallOpacity} roughness={0.4} />
          </mesh>
          <mesh position={[4.95, 0, 0]}>
            <boxGeometry args={[0.1, 3, 7.8]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={wallOpacity} roughness={0.4} />
          </mesh>

          {/* Interior Dividers */}
          <mesh position={[-1.5, 0, 0]}>
            <boxGeometry args={[0.1, 3, 7.8]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={wallOpacity} />
          </mesh>
          <mesh position={[1.5, 0, 1]}>
            <boxGeometry args={[6.8, 3, 0.1]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={wallOpacity} />
          </mesh>
        </group>
      )}

      {/* Inter-Floor Slab */}
      {(floorView === 'all' || floorView === 'first' || floorView === 'ground') && (
        <mesh position={[0, 3.05, 0]}>
          <boxGeometry args={[10, 0.1, 8]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={xRayMode ? 0.3 : 0.9} />
        </mesh>
      )}

      {/* First Floor Walls */}
      {(floorView === 'all' || floorView === 'first') && (
        <group position={[0, 4.6, 0]}>
          <mesh position={[0, 0, -3.95]}>
            <boxGeometry args={[9.8, 3, 0.1]} />
            <meshStandardMaterial color="#f8fafc" transparent opacity={wallOpacity} />
          </mesh>
          <mesh position={[0, 0, 3.95]}>
            <boxGeometry args={[9.8, 3, 0.1]} />
            <meshStandardMaterial color="#f8fafc" transparent opacity={wallOpacity} />
          </mesh>
          <mesh position={[-4.95, 0, 0]}>
            <boxGeometry args={[0.1, 3, 7.8]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={wallOpacity} />
          </mesh>
          <mesh position={[4.95, 0, 0]}>
            <boxGeometry args={[0.1, 3, 7.8]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={wallOpacity} />
          </mesh>
          {/* Master Bedroom Partition */}
          <mesh position={[0, 0, -1]}>
            <boxGeometry args={[9.8, 3, 0.1]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={wallOpacity} />
          </mesh>
        </group>
      )}

      {/* Roof Structure */}
      {(floorView === 'all' || floorView === 'roof') && (
        <mesh position={[0, 6.2, 0]}>
          <boxGeometry args={[10.4, 0.2, 8.4]} />
          <meshStandardMaterial color="#1e293b" transparent opacity={xRayMode ? 0.2 : 0.95} />
        </mesh>
      )}
    </group>
  );
};

// 3D Pipeline Segment Render
const UtilityPipeline = ({ item, isSelected, onClick, isVisible }) => {
  if (!isVisible) return null;

  const color = UTILITY_COLORS[item.type] || '#0d9488';
  const pos = [item.coordinates?.x || 0, item.coordinates?.y || 1, item.coordinates?.z || 0];

  return (
    <group position={pos} onClick={(e) => { e.stopPropagation(); onClick(item); }}>
      
      {/* 3D Pulsing Node Core Sphere */}
      <mesh>
        <sphereGeometry args={[isSelected ? 0.28 : 0.2, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={isSelected ? 0.9 : 0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Pulse Indicator Ring */}
      <mesh scale={isSelected ? [1.4, 1.4, 1.4] : [1.1, 1.1, 1.1]}>
        <ringGeometry args={[0.22, 0.26, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      {/* HTML Floating 3D Label */}
      <Html distanceFactor={10} position={[0, 0.35, 0]} center>
        <div 
          className={`px-2 py-0.5 rounded text-[10px] font-bold shadow-md cursor-pointer whitespace-nowrap transition-transform duration-200 ${
            isSelected ? 'scale-110 ring-2 ring-white' : 'hover:scale-105'
          }`}
          style={{ backgroundColor: color, color: '#ffffff' }}
          onClick={() => onClick(item)}
        >
          {item.name}
        </div>
      </Html>
    </group>
  );
};

const UtilityTwinViewer = ({ utilities = [], projectName = "Digital Utility Twin" }) => {
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [xRayMode, setXRayMode] = useState(true);
  const [floorView, setFloorView] = useState('all'); // all, ground, first, roof
  const [vrMode, setVrMode] = useState(false);
  const controlsRef = useRef();

  // Layer Toggles State
  const [layers, setLayers] = useState({
    electrical: true,
    water: true,
    gas: true,
    cable: true,
    appliance: true
  });

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[650px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row">
      
      {/* 3D Canvas Viewport */}
      <div className="flex-1 relative h-full">
        
        {/* Top Floating View Controls */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          
          <button
            onClick={() => setXRayMode(!xRayMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition ${
              xRayMode
                ? 'bg-teal-500/90 text-slate-950 border-teal-400 font-bold'
                : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {xRayMode ? 'X-Ray Walls (ON)' : 'Solid Walls'}
          </button>

          {/* Floor View Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded-xl p-0.5 text-xs text-slate-300 backdrop-blur-md">
            <button
              onClick={() => setFloorView('all')}
              className={`px-2.5 py-1 rounded-lg transition ${floorView === 'all' ? 'bg-slate-800 text-teal-400 font-bold' : 'hover:text-white'}`}
            >
              All Floors
            </button>
            <button
              onClick={() => setFloorView('ground')}
              className={`px-2.5 py-1 rounded-lg transition ${floorView === 'ground' ? 'bg-slate-800 text-teal-400 font-bold' : 'hover:text-white'}`}
            >
              Ground
            </button>
            <button
              onClick={() => setFloorView('first')}
              className={`px-2.5 py-1 rounded-lg transition ${floorView === 'first' ? 'bg-slate-800 text-teal-400 font-bold' : 'hover:text-white'}`}
            >
              Floor 2
            </button>
          </div>

          <button
            onClick={handleResetCamera}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold backdrop-blur-md"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Camera
          </button>

          <button
            onClick={() => setVrMode(!vrMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              vrMode
                ? 'bg-purple-600 text-white border-purple-400 animate-pulse'
                : 'bg-slate-900/80 text-purple-300 border-purple-800/80 hover:bg-purple-950'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            {vrMode ? 'VR Mode Active' : 'Enter VR Inspection'}
          </button>

        </div>

        {/* 3D WebGL Canvas */}
        <Canvas camera={{ position: [12, 10, 14], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          
          {/* House Geometry */}
          <HouseStructure xRayMode={xRayMode} floorView={floorView} />

          {/* Interactive Utility Route Pins */}
          {utilities.map((item) => (
            <UtilityPipeline
              key={item._id || item.utilityId}
              item={item}
              isSelected={selectedUtility && (selectedUtility._id === item._id || selectedUtility.utilityId === item.utilityId)}
              onClick={(u) => setSelectedUtility(u)}
              isVisible={layers[item.type]}
            />
          ))}

          <OrbitControls 
            ref={controlsRef} 
            enableDamping 
            dampingFactor={0.05} 
            minDistance={4} 
            maxDistance={25} 
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>

        {/* Bottom Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex items-center gap-3 overflow-x-auto max-w-[90vw]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Utility Layer Controls:
          </span>

          <button
            onClick={() => toggleLayer('electrical')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              layers.electrical ? 'bg-rose-950/80 text-rose-300 border-rose-700' : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            Electrical
          </button>

          <button
            onClick={() => toggleLayer('water')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              layers.water ? 'bg-blue-950/80 text-blue-300 border-blue-700' : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Water
          </button>

          <button
            onClick={() => toggleLayer('gas')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              layers.gas ? 'bg-amber-950/80 text-amber-300 border-amber-700' : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Gas
          </button>

          <button
            onClick={() => toggleLayer('cable')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              layers.cable ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Telecom
          </button>

          <button
            onClick={() => toggleLayer('appliance')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              layers.appliance ? 'bg-purple-950/80 text-purple-300 border-purple-700' : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            Appliance
          </button>
        </div>

      </div>

      {/* Right Details Inspection Drawer */}
      <div className="w-full md:w-80 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Utility Inspector</h3>
              <p className="text-[11px] text-teal-400 font-medium">{projectName}</p>
            </div>
            {selectedUtility && (
              <button 
                onClick={() => setSelectedUtility(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {selectedUtility ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full shrink-0" 
                  style={{ backgroundColor: UTILITY_COLORS[selectedUtility.type] }}
                ></span>
                <h4 className="font-extrabold text-white text-base leading-tight">
                  {selectedUtility.name}
                </h4>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/70 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Utility Category</span>
                  <span className="font-bold capitalize text-white" style={{ color: UTILITY_COLORS[selectedUtility.type] }}>
                    {selectedUtility.type} Infrastructure
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Building Room Location</span>
                  <span className="font-semibold text-slate-200">{selectedUtility.room}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Hidden Route Pathway</span>
                  <span className="font-semibold text-slate-200 leading-relaxed block mt-0.5">
                    {selectedUtility.route}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Connection Point</span>
                  <span className="font-semibold text-slate-200">{selectedUtility.connectionPoint}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Lifecycle Status</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold mt-1">
                    ● {selectedUtility.status || 'Active'}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Technical Specifications
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {selectedUtility.description || 'No additional specifications recorded for this utility segment.'}
                </p>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-teal-400 flex items-center justify-center mx-auto border border-slate-700">
                <Info className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-300 font-medium max-w-[200px] mx-auto">
                Click any 3D utility pin or pipeline node in the house to inspect hidden infrastructure specs.
              </p>
            </div>
          )}
        </div>

        {/* Footer info inside inspector */}
        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
          <span>BuildTwin 3D Engine</span>
          <span className="text-teal-500 font-semibold">100% CAD Utility Accuracy</span>
        </div>

      </div>

    </div>
  );
};

export default UtilityTwinViewer;
