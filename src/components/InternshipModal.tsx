import React, { useState } from 'react';
import { Internship, User, ApplicationRecord } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  FileText, 
  Check, 
  Sparkles,
  Calendar,
  BookmarkCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface InternshipModalProps {
  internship: Internship | null;
  user: User | null;
  onClose: () => void;
  onSubmitApplication: (appRecord: ApplicationRecord) => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  internship,
  user,
  onClose,
  onSubmitApplication
}) => {
  if (!internship) return null;

  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || '');
  const [customNotes, setCustomNotes] = useState('');
  const [trackerStatus, setTrackerStatus] = useState<'Applied on Official Portal' | 'Saved to Apply Later'>('Applied on Official Portal');
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({
    resumeReady: true,
    portfolioReady: true
  });
  const [isLogged, setIsLogged] = useState(false);

  const toggleSkillCheck = (key: string) => {
    setCheckedSkills((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogToTracker = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLogged(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    const record: ApplicationRecord = {
      id: 'app_' + Date.now(),
      internshipId: internship.id,
      roleTitle: internship.roleTitle,
      companyName: internship.companyName,
      domainTitle: internship.domainId,
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: trackerStatus,
      applicantName,
      applicantEmail,
      coverNote: customNotes || `Application on ${internship.portalName}. Req: ${internship.jobReqId}`,
      applyUrl: internship.applyUrl,
      portalName: internship.portalName
    };

    onSubmitApplication(record);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-md ${internship.companyLogoBg}`}>
              {internship.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-white">{internship.roleTitle}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {internship.batchSeason}
                </span>
                {internship.location.toLowerCase().includes('karnataka') || internship.location.toLowerCase().includes('bengaluru') ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/80">
                    📍 Karnataka Hub
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/80">
                    🌐 Pan-India Virtual
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{internship.companyName}</span>
                <span>•</span>
                <span className="text-cyan-400 font-mono text-[11px]">Req ID: {internship.jobReqId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Official Portal Notice Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-950 to-indigo-950/60 border border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Official Careers Portal Navigation</span>
              </div>
              <p className="text-xs text-slate-300">
                You will be applying directly on <strong className="text-white">{internship.companyName}'s official portal</strong> ({internship.portalName}).
              </p>
            </div>

            <a
              href={internship.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all shrink-0"
            >
              <span>Open Portal Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Role Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Compensation</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">{internship.stipend}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">{internship.duration}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Location</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">{internship.location}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Deadline</div>
              <div className="text-xs font-bold text-amber-400 mt-0.5">{internship.deadline}</div>
            </div>
          </div>

          {/* Description & Responsibilities */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Position Overview</h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              {internship.description}
            </p>
          </div>

          {internship.responsibilities && internship.responsibilities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Core Responsibilities</h4>
              <ul className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                {internship.responsibilities.map((resp, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ATS Preparation & Required Skills Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pre-Application Checklist & Keywords</span>
              </h4>
              <span className="text-[10px] text-slate-400">Match skills to bypass ATS filters</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-[11px] text-slate-400 font-medium">
                Make sure your resume includes these keywords before applying on {internship.companyName}'s portal:
              </div>

              <div className="flex flex-wrap gap-1.5">
                {internship.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-900 space-y-2 text-xs">
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={!!checkedSkills['resumeReady']}
                    onChange={() => toggleSkillCheck('resumeReady')}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span>1-page PDF Resume customized with relevant coursework & project metrics</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={!!checkedSkills['portfolioReady']}
                    onChange={() => toggleSkillCheck('portfolioReady')}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span>GitHub repository links tested & README documentation clear</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sync to My Tracker Form */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Application Tracker Sync</span>
              </div>
              {isLogged && (
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Logged in Tracker
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              Keep this role recorded in your SkillRoute tracker so you can monitor follow-up dates and interview rounds.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tracker Status</label>
                <select
                  value={trackerStatus}
                  onChange={(e) => setTrackerStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option value="Applied on Official Portal">Applied on Official Portal</option>
                  <option value="Saved to Apply Later">Saved to Apply Later</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Applicant Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Optional Notes / Referral Contact</label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Applied with employee referral, followed up on LinkedIn..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500"
              />
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Portal: <strong className="text-slate-200">{internship.portalName}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleLogToTracker()}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isLogged
                  ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              {isLogged ? '✓ Saved in Tracker' : 'Save to My Tracker'}
            </button>

            <a
              href={internship.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

