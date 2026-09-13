import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import API from '../../services/api';
import { 
  Box, 
  Upload, 
  CheckSquare, 
  Square, 
  Calendar, 
  Video, 
  Phone, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Building,
  Sparkles
} from 'lucide-react';

const BookProjectPage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    projectName: '',
    buildingType: 'Villa',
    floors: 2,
    area: 2500,
    location: '',
    constructionStage: 'Planning & Blueprint',
    description: '',
    consultationDate: '',
    consultationTime: '10:00 AM',
    consultationMethod: 'Video Call'
  });

  const [selectedServices, setSelectedServices] = useState([
    '3D Modeling',
    'Electrical Mapping',
    'Plumbing Mapping',
    'VR Visualization'
  ]);

  const [blueprintFile, setBlueprintFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedProject, setSubmittedProject] = useState(null);

  const availableServices = [
    '3D Modeling',
    'Electrical Mapping',
    'Plumbing Mapping',
    'Gas Mapping',
    'Cable/Internet Mapping',
    'Appliance Connections',
    'VR Visualization',
    'Mobile Visualization',
    'Future Utility Documentation'
  ];

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBlueprintFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please sign in to book a project', 'error');
      navigate('/login');
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('projectName', formData.projectName);
      data.append('buildingType', formData.buildingType);
      data.append('floors', formData.floors);
      data.append('area', formData.area);
      data.append('location', formData.location);
      data.append('constructionStage', formData.constructionStage);
      data.append('description', formData.description);
      data.append('services', JSON.stringify(selectedServices));
      
      if (blueprintFile) {
        data.append('blueprint', blueprintFile);
      }

      const res = await API.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSubmittedProject(res.data.project);
        addToast(`Project request submitted! ID: ${res.data.project.projectId}`, 'success');

        // Also schedule consultation if date provided
        if (formData.consultationDate) {
          try {
            await API.post('/bookings', {
              projectId: res.data.project._id,
              date: formData.consultationDate,
              time: formData.consultationTime,
              meetingType: formData.consultationMethod,
              notes: `Consultation for new project: ${formData.projectName}`,
              projectName: formData.projectName
            });
          } catch (bErr) {
            console.warn('Booking warning:', bErr);
          }
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit project request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedProject) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
            Request Submitted Successfully
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">Project Request Received</h1>
          <p className="text-slate-600 text-sm">
            Your unique Project ID has been generated and assigned to our MEP design engineering team.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 text-left space-y-3 max-w-md mx-auto shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Assigned Project ID:</span>
            <span className="text-lg font-black text-teal-400 bg-slate-800 px-3 py-1 rounded-lg">
              {submittedProject.projectId}
            </span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <p><strong>Project Name:</strong> {submittedProject.projectName}</p>
            <p><strong>Building Type:</strong> {submittedProject.buildingType} ({submittedProject.floors} Floors)</p>
            <p><strong>Initial Status:</strong> <span className="text-teal-300 font-semibold">{submittedProject.status}</span></p>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => navigate(`/client/projects/${submittedProject._id || submittedProject.projectId}`)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow transition flex items-center gap-2"
          >
            Track Project Progress
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/client/dashboard')}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-sm rounded-xl transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Digital Utility Twin Intake Form
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Book Your Project Request</h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Submit your architectural blueprint and select hidden utility mapping options for your building.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft space-y-8">
        
        {/* Section 1: Client Info */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 text-xs font-bold flex items-center justify-center">1</span>
            Client Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Project Info */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 text-xs font-bold flex items-center justify-center">2</span>
            Building & Project Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sunset Heights Villa"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Building Type *</label>
              <select
                value={formData.buildingType}
                onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Individual House">Individual House</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial Building">Commercial Building</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Floors</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.floors}
                onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Built-up Area (sq ft)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Address</label>
              <input
                type="text"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Services Required Checkboxes */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 text-xs font-bold flex items-center justify-center">3</span>
            Services Required (Select All That Apply)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableServices.map((srv) => {
              const isChecked = selectedServices.includes(srv);
              return (
                <div
                  key={srv}
                  onClick={() => toggleService(srv)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition text-xs font-medium ${
                    isChecked
                      ? 'bg-teal-50 border-teal-300 text-teal-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{srv}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Blueprint File Upload */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 text-xs font-bold flex items-center justify-center">4</span>
            Architectural Blueprint Upload
          </h3>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-teal-500 transition bg-slate-50">
            <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-800">
              {blueprintFile ? `Selected File: ${blueprintFile.name}` : 'Click or Drag Blueprint PDF, AutoCAD DWG/DXF, or Image here'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Supported formats: PDF, DWG, DXF, PNG, JPG (Max: 25MB)</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg"
              className="mt-3 text-xs mx-auto block text-slate-600"
            />
          </div>
        </div>

        {/* Section 5: Consultation Preference */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 text-xs font-bold flex items-center justify-center">5</span>
            Preferred Consultation Schedule
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Consultation Date</label>
              <input
                type="date"
                value={formData.consultationDate}
                onChange={(e) => setFormData({ ...formData, consultationDate: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
              <select
                value={formData.consultationTime}
                onChange={(e) => setFormData({ ...formData, consultationTime: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="10:00 AM">10:00 AM EST</option>
                <option value="02:00 PM">02:00 PM EST</option>
                <option value="04:30 PM">04:30 PM EST</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Meeting Method</label>
              <select
                value={formData.consultationMethod}
                onChange={(e) => setFormData({ ...formData, consultationMethod: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Video Call">Video Call</option>
                <option value="Phone Call">Phone Call</option>
                <option value="In Person">In Person Office Meeting</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements / Notes</label>
            <textarea
              rows="3"
              placeholder="Describe any special electrical load needs, solar roof routing, or radiant heating requests..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-teal-400" />
          {submitting ? 'Submitting Project Request...' : 'Submit Project Request'}
        </button>

      </form>

    </div>
  );
};

export default BookProjectPage;
