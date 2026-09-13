import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Eye, Layers, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');

  const portfolioItems = [
    {
      id: 'BT-2026-0001',
      title: 'Modern 3BHK Smart Villa',
      category: 'residential',
      type: 'Villa',
      area: '3,400 sq ft',
      services: ['3D Modeling', 'Electrical Mapping', 'Plumbing Mapping', 'VR Visualization'],
      description: 'Complete digital utility twin featuring embedded ceiling LED harness mapping, solar roof inverter routes, and hot water PEX manifold tracking.',
      tag: 'VR & Utility Mapping'
    },
    {
      id: 'BT-2026-0002',
      title: 'Grand Horizon Commercial Hub',
      category: 'commercial',
      type: 'Commercial Building',
      area: '18,500 sq ft',
      services: ['3D Modeling', 'Electrical Mapping', 'Plumbing Mapping', 'Gas Mapping'],
      description: 'Multi-story commercial complex with heavy 3-phase electrical feeder tracing and fire suppression sprinkler line documentation.',
      tag: 'Commercial Utility Twin'
    },
    {
      id: 'BT-2026-0003',
      title: 'AeroPark Modern Townhouse',
      category: 'residential',
      type: 'Individual House',
      area: '2,800 sq ft',
      services: ['Electrical Mapping', 'Plumbing Mapping', 'Appliance Connections', 'Mobile Visualization'],
      description: 'Radiant floor heating plumbing twin and structured fiber optic hub tracing for smart home automation.',
      tag: 'Residential'
    },
    {
      id: 'BT-2026-0004',
      title: 'Vanguard Tech Park Office Tower',
      category: 'commercial',
      type: 'Office',
      area: '42,000 sq ft',
      services: ['3D Modeling', 'Cable/Internet Mapping', 'VR Visualization', 'Documentation'],
      description: 'High-density server room data cabling conduit maps and multi-zone VR HVAC inspection model.',
      tag: 'VR Inspection'
    }
  ];

  const filtered = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(p => p.category === filter || (filter === 'vr' && p.services.includes('VR Visualization')) || (filter === 'mapping' && p.services.includes('Electrical Mapping')));

  return (
    <div className="py-12 space-y-12">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Featured Digital Twin Deployments
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          BuildTwin Project Portfolio
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Explore real-world 3D Digital Utility Twins delivered for luxury villas, commercial towers, and smart residences.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {['all', 'residential', 'commercial', 'vr', 'mapping'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition ${
                filter === tab 
                  ? 'bg-slate-900 text-white shadow' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab === 'all' ? 'All Projects' : tab === 'vr' ? 'VR Twins' : tab === 'mapping' ? 'Utility Mapping' : tab}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              
              {/* Preview Banner */}
              <div className="bg-slate-950 p-6 text-white relative min-h-[180px] flex flex-col justify-between border-b border-slate-800">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold text-teal-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    ID: {item.id}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                    {item.type} • {item.area}
                  </span>
                </div>

                <div className="z-10 mt-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">{item.title}</h3>
                </div>

                {/* Background decorative grid */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Services Applied</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.services.map((srv, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-400" />
                    Inspect Digital Twin Demo
                  </Link>
                  <Link
                    to="/book-project"
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900"
                  >
                    Build Similar Twin →
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default PortfolioPage;
