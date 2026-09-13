import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, 
  UserCheck, 
  Box, 
  Layers, 
  Palette, 
  Database, 
  Smartphone, 
  CheckCircle2, 
  RefreshCw, 
  Award,
  ArrowRight,
  Zap,
  Droplet,
  Flame,
  Wifi,
  Tv
} from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      step: '01',
      title: 'STEP 1: Architectural Blueprint Submission',
      desc: 'Client submits floor plans, CAD files (DWG/DXF), or PDF blueprints with building specifications.',
      icon: FileCheck
    },
    {
      step: '02',
      title: 'STEP 2: Designer Requirement Review',
      desc: 'Lead MEP utility designer reviews building dimensions, floor counts, wall slab materials, and service scope.',
      icon: UserCheck
    },
    {
      step: '03',
      title: 'STEP 3: 3D Building Model Creation',
      desc: 'Convert 2D architectural lines into a millimeter-accurate 3D digital building structure.',
      icon: Box
    },
    {
      step: '04',
      title: 'STEP 4: Map Hidden Utilities',
      desc: 'Embed hidden infrastructure routes inside walls, slab channels, and ceiling joists.',
      icon: Layers,
      subCategories: [
        { name: 'Electrical', desc: 'Wiring, switch boxes, distribution DBs', color: 'bg-rose-500' },
        { name: 'Water', desc: 'Cold/hot water supply, PVC drainage', color: 'bg-blue-500' },
        { name: 'Gas', desc: 'Piped gas lines, shutoff valves', color: 'bg-amber-500' },
        { name: 'Cable/Internet', desc: 'Fiber optic drops, Cat6 ethernet runs', color: 'bg-emerald-500' },
        { name: 'Appliance', desc: 'AC line sets, geysers, heavy circuits', color: 'bg-purple-500' }
      ]
    },
    {
      step: '05',
      title: 'STEP 5: Color Coding & Spatial Labels',
      desc: 'Apply standard color codes (Red=Electrical, Blue=Water, Yellow=Gas, Green=Telecom, Purple=Appliance) and attach room labels.',
      icon: Palette
    },
    {
      step: '06',
      title: 'STEP 6: Secure Utility Data Archiving',
      desc: 'Store route coordinates, breaker numbers, pipe diameters, and maintenance specs in the encrypted database.',
      icon: Database
    },
    {
      step: '07',
      title: 'STEP 7: VR / Mobile Twin Generation',
      desc: 'Generate interactive 3D WebGL, VR headset inspection environment, and PWA mobile viewer.',
      icon: Smartphone
    },
    {
      step: '08',
      title: 'STEP 8: Client Interactive Review',
      desc: 'Client receives project link, rotates 3D house model, toggles utility layers, and inspects room routes.',
      icon: CheckCircle2
    },
    {
      step: '09',
      title: 'STEP 9: Designer Revisions',
      desc: 'Designer makes requested updates (e.g. kitchen socket move or solar inverter routing) and creates Version v1.1.',
      icon: RefreshCw
    },
    {
      step: '10',
      title: 'STEP 10: Final Digital Twin Handover',
      desc: 'Final Digital Utility Twin is delivered, certified, and archived for lifetime building maintenance and renovation.',
      icon: Award
    }
  ];

  return (
    <div className="py-12 space-y-12">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Step-by-Step Methodology
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How BuildTwin Works
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          A 10-step precision workflow transforming raw architectural blueprints into permanent 3D Digital Utility Twins.
        </p>
      </section>

      {/* Vertical Timeline Workflow */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border-l-4 border-slate-200 ml-4 sm:ml-8 space-y-10 py-4">
          
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                
                {/* Number Badge Dot */}
                <div className="absolute -left-6 sm:-left-7 top-0 w-11 h-11 rounded-2xl bg-slate-900 text-teal-400 font-black text-sm flex items-center justify-center border-4 border-white shadow-md group-hover:bg-teal-600 group-hover:text-white transition">
                  {item.step}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft hover:shadow-xl transition space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>

                  {/* Subcategories for Step 4 */}
                  {item.subCategories && (
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.subCategories.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5 text-xs">
                          <span className={`w-3 h-3 rounded-full shrink-0 ${sub.color}`}></span>
                          <div>
                            <span className="font-bold text-slate-900 block">{sub.name}</span>
                            <span className="text-[11px] text-slate-500">{sub.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* Bottom Action */}
      <section className="text-center pt-8">
        <Link
          to="/book-project"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-2xl shadow-xl transition"
        >
          Book Your Project Workflow
          <ArrowRight className="w-5 h-5 text-teal-400" />
        </Link>
      </section>

    </div>
  );
};

export default HowItWorksPage;
