import React, { useState } from 'react';
import { History, X, GitCommit, FileText, CheckCircle2, Clock, Plus } from 'lucide-react';

const VersionHistoryModal = ({ isOpen, onClose, versions = [], onAddVersion, isDesigner = false }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [versionNumber, setVersionNumber] = useState('');
  const [changes, setChanges] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!versionNumber || !changes) return;
    onAddVersion({ versionNumber, changes, notes });
    setVersionNumber('');
    setChanges('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Project Version History</h3>
              <p className="text-xs text-teal-400">Digital Utility Twin Evolution Audit Log</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {isDesigner && (
            <div className="border-b border-slate-100 pb-4">
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
                >
                  <Plus className="w-4 h-4" />
                  Create New Project Version
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-700">Record New Building Version</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Version Identifier</label>
                      <input
                        type="text"
                        placeholder="e.g. v1.2 or v2.0"
                        value={versionNumber}
                        onChange={(e) => setVersionNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Changes Summary</label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Rerouted Kitchen water lines and updated second floor electrical conduit baseline..."
                      value={changes}
                      onChange={(e) => setChanges(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                    >
                      Save Version
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Timeline List */}
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
            {versions.map((ver, idx) => (
              <div key={ver._id || ver.versionId || idx} className="relative pl-6">
                
                {/* Node Dot */}
                <div className={`absolute -left-2.5 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white shadow ${
                  idx === 0 ? 'bg-teal-600 ring-4 ring-teal-100' : 'bg-slate-700'
                }`}>
                  <GitCommit className="w-3 h-3" />
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{ver.versionNumber}</span>
                      {idx === 0 && (
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full">
                          CURRENT ACTIVE
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(ver.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700">{ver.changes}</p>
                  
                  {ver.notes && (
                    <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded border border-slate-100">
                      "{ver.notes}"
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Logged by: <strong>{ver.createdByName || 'Lead Designer'}</strong></span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default VersionHistoryModal;
