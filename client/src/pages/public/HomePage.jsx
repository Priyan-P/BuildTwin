import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Flame, 
  Wifi, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Eye,
  Database,
  Building,
  Wrench,
  ChevronRight,
  TrendingUp,
  FolderGit2
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
        
        {/* Subtle Background Glow Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-700/80 text-teal-400 text-xs font-bold uppercase tracking-wider shadow-inner">
                <Sparkles className="w-4 h-4 text-teal-400" />
                Enterprise 3D Digital Utility Twin Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Your Building Has a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400">
                  Digital Memory.
                </span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Create, visualize and preserve your building's hidden electrical, plumbing, gas, and communication infrastructure in an interactive 3D Digital Twin.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/book-project"
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-glow transition transform hover:-translate-y-0.5"
                >
                  Book a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="flex items-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition"
                >
                  Explore How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  AutoCAD DWG/DXF Ready
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  VR & Mobile Accessible
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Version Lifecycle Archive
                </div>
              </div>

            </div>

            {/* Right Hero Visual Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-800/90 rounded-3xl p-4 border border-slate-700 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                
                {/* 3D Visual House Rendering Overlay */}
                <div className="relative h-80 rounded-2xl bg-slate-950 overflow-hidden flex flex-col justify-between p-5 border border-slate-800">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
                      ● Live X-Ray Utility Twin
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-1 rounded">
                      CAD Model: Villa-2026.dwg
                    </span>
                  </div>

                  {/* Wireframe Mockup Simulation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-75 pointer-events-none">
                    <div className="w-48 h-48 border-2 border-dashed border-slate-700 rounded-xl rotate-12 flex items-center justify-center relative">
                      {/* Electrical Line */}
                      <div className="absolute w-full h-0.5 bg-rose-500 shadow-glow top-1/4 -rotate-6"></div>
                      {/* Water Line */}
                      <div className="absolute w-full h-0.5 bg-blue-500 shadow-glow top-2/4 rotate-12"></div>
                      {/* Gas Line */}
                      <div className="absolute w-full h-0.5 bg-amber-500 shadow-glow bottom-1/4 -rotate-12"></div>
                      {/* Cable Line */}
                      <div className="absolute w-full h-0.5 bg-emerald-500 shadow-glow bottom-2/4 rotate-6"></div>
                    </div>
                  </div>

                  {/* Bottom Utility Legend */}
                  <div className="z-10 bg-slate-900/95 border border-slate-800 rounded-xl p-3 grid grid-cols-3 gap-2 text-[10px] font-bold">
                    <div className="flex items-center gap-1.5 text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      Electrical
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      Water Line
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      Gas Route
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Internet/Fiber
                    </div>
                    <div className="flex items-center gap-1.5 text-purple-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      Appliances
                    </div>
                    <div className="flex items-center gap-1 text-teal-400">
                      <Eye className="w-3 h-3" />
                      Interactive
                    </div>
                  </div>

                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
                  <span>BuildTwin 3D Spatial Engine</span>
                  <Link to="/portfolio" className="text-teal-400 hover:underline font-semibold flex items-center gap-1">
                    View Live Sample <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY BUILDTWIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600">Core Value Proposition</h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Why BuildTwin?
          </p>
          <p className="text-slate-600 text-base">
            Architectural blueprints show where walls go. BuildTwin documents what is hidden inside those walls forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Hidden Utility Visualization</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instantly see through walls, concrete slabs, and ceiling cavities to pinpoint exact wiring, plumbing, and gas routes before drilling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Safer Maintenance</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eliminate dangerous drill accidents, electrical short circuits, and accidental pipe ruptures during routine home repairs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Future Renovation Support</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seamlessly pass accurate digital twin records to new contractors when remodeling kitchens, expanding rooms, or adding solar panels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-xl transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Long-Term Digital Storage</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Securely store your building's utility model in the cloud for decades, accessible on desktop, mobile app, and VR headsets.
            </p>
          </div>

        </div>
      </section>

      {/* FROM BLUEPRINT TO DIGITAL TWIN WORKFLOW */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">Streamlined Process</h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">
              From Blueprint to Digital Twin
            </p>
            <p className="text-slate-400 text-base">
              Our end-to-end service converts 2D architectural CAD files into lifetime digital utility models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'Architectural Blueprint', desc: 'Client uploads PDF or AutoCAD DWG file' },
              { step: '02', title: '3D Building Model', desc: 'Designers construct precise 3D structural model' },
              { step: '03', title: 'Utility Mapping', desc: 'Map electrical, water, gas & telecom routes' },
              { step: '04', title: 'Digital Storage', desc: 'Secure cloud archive & version controls' },
              { step: '05', title: 'VR / Mobile View', desc: 'Inspect in interactive 3D / VR mode' },
              { step: '06', title: 'Future Maintenance', desc: 'Update model during future renovations' }
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 text-center space-y-2 relative">
                <span className="text-2xl font-black text-teal-400 block">{s.step}</span>
                <h4 className="font-bold text-sm text-white">{s.title}</h4>
                <p className="text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHO CAN USE IT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600">Target Stakeholders</h2>
            <p className="text-3xl font-extrabold text-slate-900">
              Built for the Entire Building Ecosystem
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              BuildTwin brings clarity to every professional and property owner involved in constructing, managing, and maintaining modern buildings.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-teal-700 font-bold hover:text-teal-800 pt-2"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { name: 'Homeowners', desc: 'Preserve house utility memory' },
              { name: 'Architects', desc: 'Enhance blueprint deliverables' },
              { name: 'Builders', desc: 'Ensure safe MEP construction' },
              { name: 'Electricians', desc: 'Trace concealed conduit routes' },
              { name: 'Plumbers', desc: 'Map water supply & drainage' },
              { name: 'Property Managers', desc: 'Long-term building records' }
            ].map((userItem, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <h4 className="font-bold text-sm text-slate-900">{userItem.name}</h4>
                <p className="text-xs text-slate-500">{userItem.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BUILDING LIFECYCLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600">Complete Lifecycle Support</h2>
          <p className="text-3xl font-extrabold text-slate-900">
            Built for the Entire Building Lifecycle
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm font-extrabold text-slate-800">
          <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-900">Construction</span>
          <ArrowRight className="w-4 h-4 text-teal-600" />
          <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-900">Maintenance</span>
          <ArrowRight className="w-4 h-4 text-teal-600" />
          <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-900">Renovation</span>
          <ArrowRight className="w-4 h-4 text-teal-600" />
          <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs text-slate-900">Expansion</span>
          <ArrowRight className="w-4 h-4 text-teal-600" />
          <span className="px-4 py-2 bg-teal-600 text-white rounded-xl shadow-md">Future Ownership</span>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Start Your Digital Utility Twin Today</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Upload your architectural blueprint and let our design team map your building's hidden infrastructure.
          </p>
          <div>
            <Link
              to="/book-project"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-glow transition"
            >
              Start Your Project Request
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
