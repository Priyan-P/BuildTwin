import React, { useState } from 'react';
import API from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

const ContactPage = () => {
  const { addToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        addToast('Contact message sent successfully!', 'success');
        setSubmittedSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to send message', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">Contact BuildTwin</h1>
        <p className="text-slate-600 text-base">
          Have questions about our 3D Digital Utility Twin mapping services or enterprise architecture partnerships? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-8 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">BuildTwin Platform HQ</h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Headquarters</p>
                  <p>100 Innovation Way, Suite 400</p>
                  <p>Austin, TX 78701, USA</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                <span>support@buildtwin.demo</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <span>+1 (800) 555-TWIN</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM EST</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-400 space-y-1">
            <p className="font-bold text-white">Enterprise CAD Support</p>
            <p>Direct upload assistance for DWG, DXF, and IFC building models.</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-soft">
          {submittedSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you for contacting BuildTwin. Our design engineering team has received your message and will respond within 24 business hours.
              </p>
              <button
                onClick={() => setSubmittedSuccess(false)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Villa Utility Twin Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Tell us about your building blueprint or utility mapping requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-teal-400" />
                {submitting ? 'Sending Message...' : 'Submit Contact Inquiry'}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
