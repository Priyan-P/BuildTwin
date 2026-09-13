import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Shield, Cpu, Layers, ArrowUpRight, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-teal-400 border border-slate-700">
                <Box className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Build<span className="text-teal-400">Twin</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Design Your Building. Preserve What Is Hidden. BuildTwin provides enterprise-grade 3D Digital Utility Twin mapping for electrical, plumbing, gas, internet, and appliance systems throughout the entire building lifecycle.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg w-fit">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              PWA Online & Ready | Version 2.4 Production Engine
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Utility Twin Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/services" className="hover:text-teal-400 transition">3D Building Modeling</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition">Electrical Conduit Mapping</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition">Plumbing & Drainage</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition">Piped Gas Infrastructure</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition">Fiber Optic & Telecom</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition">VR Inspection Environment</Link></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/how-it-works" className="hover:text-teal-400 transition">Workflow Engine</Link></li>
              <li><Link to="/portfolio" className="hover:text-teal-400 transition">Case Studies</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">Lifecycle Philosophy</Link></li>
              <li><Link to="/book-project" className="hover:text-teal-400 transition">Book a Project</Link></li>
              <li><Link to="/login" className="hover:text-teal-400 transition">Client & Designer Login</Link></li>
            </ul>
          </div>

          {/* Col 4: Utility Standard Colors */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Utility Color Coding</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow"></span>
                <span className="text-slate-300">Electrical Wiring (Red)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shadow"></span>
                <span className="text-slate-300">Water Supply & Waste (Blue)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow"></span>
                <span className="text-slate-300">Gas Pipelines (Yellow)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow"></span>
                <span className="text-slate-300">Telecom & Fiber (Green)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block shadow"></span>
                <span className="text-slate-300">Appliance Circuits (Purple)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BuildTwin Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security & Data Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
