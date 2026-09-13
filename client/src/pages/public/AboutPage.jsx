import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Layers, ShieldCheck, Database, Cpu, Award, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Our Vision & Platform Purpose
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Preserving Building Infrastructure Memory
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          BuildTwin was founded on a simple truth: architectural blueprints document what a building looks like on paper, but standard drawings fail to preserve what is hidden inside the walls over time.
        </p>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              The Digital Utility Twin Paradigm
            </span>
            <h2 className="text-3xl font-bold text-white">
              Architectural Design Documents Form. <br />
              BuildTwin Preserves Function & Hidden Assets.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              When a house or commercial building is constructed, thousands of meters of electrical wires, water pipes, gas lines, and internet cables are permanently sealed behind concrete, drywall, and plaster.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Years later, when a homeowner drills a hole for a TV mount or an electrician repairs a short circuit, they operate in the dark. BuildTwin eliminates this blind spot by providing an interactive 3D spatial twin accessible forever.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-3xl font-black text-teal-400">100%</span>
              <h4 className="font-bold text-sm text-white">Hidden Utility Spatial Accuracy</h4>
            </div>
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-3xl font-black text-emerald-400">50+ Yrs</span>
              <h4 className="font-bold text-sm text-white">Cloud Data Preservation</h4>
            </div>
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-3xl font-black text-blue-400">PWA</span>
              <h4 className="font-bold text-sm text-white">Mobile & VR Accessible</h4>
            </div>
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-3xl font-black text-purple-400">v1 → vN</span>
              <h4 className="font-bold text-sm text-white">Renovation Versioning</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Our Architectural Tech Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. Precision First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every wire route and pipe run is calibrated directly against CAD blueprints and on-site MEP logs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2. Lifetime Continuity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When ownership changes or new contractors arrive, your building's digital memory is seamlessly transferred.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">3. Spatial Innovation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leveraging Three.js WebGL and WebXR technology to make 3D spatial inspection effortless on any browser.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
