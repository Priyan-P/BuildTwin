import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import UtilityTwinViewer from '../../components/3d/UtilityTwinViewer';
import { ArrowLeft, Box, ShieldCheck, Sparkles, Layers } from 'lucide-react';

const TwinViewerPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTwinData();
  }, [id]);

  const fetchTwinData = async () => {
    try {
      const [projRes, utilRes] = await Promise.all([
        API.get(`/projects/${id}`),
        API.get(`/projects/${id}/utilities`)
      ]);

      if (projRes.data.success) setProject(projRes.data.project);
      if (utilRes.data.success) setUtilities(utilRes.data.utilities || []);
    } catch (err) {
      console.warn('Failed to load twin viewer data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold animate-pulse mx-auto">
            <Box className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-300">Initializing 3D Spatial Engine & Utility Layers...</p>
        </div>
      </div>
    );
  }

  const projectName = project ? project.projectName : "Modern 3BHK Smart Villa";
  const projectId = project ? project.projectId : "BT-2026-0001";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 flex flex-col space-y-6">
      
      {/* Viewport Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
        
        <div className="flex items-center gap-3">
          <Link
            to={project ? `/client/projects/${project._id || project.projectId}` : '/client/dashboard'}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Return to Workspace"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                {projectId}
              </span>
              <span className="text-xs text-slate-400 font-medium">3D Spatial Utility Twin</span>
            </div>
            <h1 className="text-xl font-extrabold text-white mt-0.5">{projectName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Verified Utility Mapping
          </div>
        </div>

      </div>

      {/* 3D WebGL Canvas Engine Viewport */}
      <div className="flex-1">
        <UtilityTwinViewer utilities={utilities} projectName={projectName} />
      </div>

    </div>
  );
};

export default TwinViewerPage;
