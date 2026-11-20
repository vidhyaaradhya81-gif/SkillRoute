import React from 'react';
import { ApplicationRecord } from '../types';
import { 
  X, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Trash2, 
  Clock, 
  Sparkles,
  Bookmark
} from 'lucide-react';

interface ApplicationsDrawerProps {
  applications: ApplicationRecord[];
  onClose: () => void;
  onRemoveApplication?: (internshipId: string) => void;
  onUpdateStatus?: (internshipId: string, newStatus: ApplicationRecord['status']) => void;
  onClearAll?: () => void;
}

export const ApplicationsDrawer: React.FC<ApplicationsDrawerProps> = ({ 
  applications, 
  onClose,
  onRemoveApplication,
  onUpdateStatus,
  onClearAll
}) => {
  const getStatusBadge = (status: ApplicationRecord['status']) => {
    switch (status) {
      case 'Applied on Official Portal':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Applied on Portal
          </span>
        );
      case 'Saved to Apply Later':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-amber-400" />
            Saved for Later
          </span>
        );
      case 'Under Review':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-400" />
            Under Review
          </span>
        );
      case 'Interview Scheduled':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            Interviewing
          </span>
        );
      case 'Offer Received':
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-yellow-950 text-yellow-300 border border-yellow-700 flex items-center gap-1">
            🎉 Offer Received
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">My Application Tracker</h3>
              <p className="text-xs text-slate-400">
                {applications.length === 0 
                  ? 'No applications logged yet' 
                  : `${applications.length} Tracked Career Opportunities`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {applications.length > 0 && onClearAll && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all tracked applications?')) {
                    onClearAll();
                  }
                }}
                className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-slate-800"
                title="Clear all applications"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Applications */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-16 space-y-3 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300">Your tracker is currently empty</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clicking <strong className="text-emerald-400">"Apply on Official Portal"</strong> opens the company's careers site in a new tab.
              </p>
              <p className="text-[11px] text-slate-500 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                💡 When you submit your application on their portal, click <strong className="text-cyan-300">"Mark as Applied"</strong> on the internship card to monitor your status and dates here.
              </p>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                    {app.domainTitle}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(app.status)}
                    {onRemoveApplication && (
                      <button
                        onClick={() => onRemoveApplication(app.internshipId)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                        title="Remove from tracker"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{app.roleTitle}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-slate-300">{app.companyName}</span>
                    {app.portalName && (
                      <span className="text-[10px] text-cyan-400 font-medium">({app.portalName})</span>
                    )}
                  </p>
                </div>

                {app.coverNote && (
                  <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                    "{app.coverNote}"
                  </p>
                )}

                {/* Status Updater */}
                {onUpdateStatus && (
                  <div className="pt-1 flex items-center justify-between gap-2 text-xs">
                    <label className="text-[11px] text-slate-400">Update Status:</label>
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.internshipId, e.target.value as ApplicationRecord['status'])}
                      className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="Applied on Official Portal">Applied on Official Portal</option>
                      <option value="Saved to Apply Later">Saved to Apply Later</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Offer Received">Offer Received</option>
                    </select>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Logged: {app.appliedAt}
                  </span>

                  {app.applyUrl ? (
                    <a
                      href={app.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 text-[11px] font-semibold border border-slate-800 flex items-center gap-1 transition-colors"
                    >
                      <span>Revisit Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400">
                      Applicant: <strong className="text-slate-300">{app.applicantName}</strong>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-center">
          <p className="text-[11px] text-slate-500">
            Track official portal submissions and recruitment rounds in SkillRoute.
          </p>
        </div>

      </div>
    </div>
  );
};

