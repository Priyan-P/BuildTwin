import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Zap, 
  Droplet, 
  Flame, 
  Wifi, 
  Tv, 
  Tv2, 
  Smartphone, 
  FileText, 
  RefreshCw, 
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      id: 1,
      category: 'modeling',
      icon: Box,
      title: '1. Architectural 3D Modeling',
      description: 'Convert 2D AutoCAD floor plans, blueprints, or CAD drawings into hyper-accurate 3D digital building structures.',
      details: 'Our BIM & 3D CAD modeling team builds millimeter-accurate digital representations of walls, joists, slabs, and rooms.'
    },
    {
      id: 2,
      category: 'mapping',
      icon: Zap,
      title: '2. Electrical Utility Mapping',
      description: 'Map embedded electrical wiring, distribution boards, switches, sockets, ceiling fan points, and main feeder routes.',
      details: 'Identifies every concealed conduit embedded in concrete walls and ceiling joists to prevent accidental drill damage.'
    },
    {
      id: 3,
      category: 'mapping',
      icon: Droplet,
      title: '3. Plumbing Mapping',
      description: 'Map municipal water supply, hot/cold PEX loops, bathroom mixers, kitchen drainage, P-traps, and main shutoff valves.',
      details: 'Full spatial record of underground DWV waste pipes, radiant heating loops, and pressure control manifolds.'
    },
    {
      id: 4,
      category: 'mapping',
      icon: Flame,
      title: '4. Gas Utility Mapping',
      description: 'Map piped natural gas (PNG) or LPG lines, safety shutoff valves, meter regulators, and kitchen stove connections.',
      details: 'Critical safety documentation documenting gas line conduits embedded within outer perimeter wall cavity channels.'
    },
    {
      id: 5,
      category: 'mapping',
      icon: Wifi,
      title: '5. Cable & Communication Mapping',
      description: 'Map fiber optic gateways, structured Cat6 internet ethernet drops, WiFi Access Point conduits, and Cable TV runs.',
      details: 'Ensures structured low-voltage wiring pathways remain accessible for future high-speed internet upgrades.'
    },
    {
      id: 6,
      category: 'mapping',
      icon: Tv,
      title: '6. Appliance Dedicated Connections',
      description: 'Map high-amperage dedicated circuits for AC split units, water geysers, kitchen ovens, refrigerators, and EV chargers.',
      details: 'Ensures heavy-draw appliances are connected to correctly rated breakers and dedicated wall channels.'
    },
    {
      id: 7,
      category: 'visualization',
      icon: Box,
      title: '7. VR Visualization Inspection',
      description: 'Create an immersive Virtual Reality (VR) walkthrough environment for full 3D spatial inspection before construction.',
      details: 'Compatible with standard VR headsets and web browser 3D viewports for interactive walk-throughs.'
    },
    {
      id: 8,
      category: 'visualization',
      icon: Smartphone,
      title: '8. Mobile Visualization PWA',
      description: 'Access a lightweight, fast 3D utility model directly from your mobile smartphone or tablet on the construction site.',
      details: 'Built as an offline-ready Progressive Web App so site engineers can view utility routes anywhere.'
    },
    {
      id: 9,
      category: 'documentation',
      icon: FileText,
      title: '9. Digital Utility Documentation',
      description: 'Generate standardized, audit-ready PDF and 3D digital records detailing utility positions and maintenance specs.',
      details: 'Creates an official digital certificate of utility mapping for insurance, bank compliance, and home resale value.'
    },
    {
      id: 10,
      category: 'documentation',
      icon: RefreshCw,
      title: '10. Future Modification & Updates',
      description: 'Update the Digital Twin whenever home renovations, kitchen remodels, or building expansions take place.',
      details: 'Supports version history (v1.0, v1.1, v2.0) so your digital twin evolves alongside your building.'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="py-12 space-y-12">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Complete Utility Lifecycle Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          BuildTwin Core Services
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Comprehensive 3D modeling, hidden utility mapping, VR inspection, and long-term digital documentation for modern buildings.
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Services (10)
          </button>
          <button
            onClick={() => setActiveCategory('mapping')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeCategory === 'mapping' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Utility Mapping (5)
          </button>
          <button
            onClick={() => setActiveCategory('visualization')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeCategory === 'visualization' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            VR & Mobile Twin (2)
          </button>
          <button
            onClick={() => setActiveCategory('documentation')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeCategory === 'documentation' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Documentation & Versions (2)
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{service.description}</p>
                  <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                    {service.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/how-it-works"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/book-project"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl transition border border-teal-200"
                  >
                    Request Service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
