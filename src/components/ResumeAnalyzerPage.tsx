import React, { useMemo, useRef, useState } from 'react';
import { CSDomain, ResumeReport, UserProfile } from '../types';
import { analyseResume, scoreLabel } from '../lib/resumeAnalyzer';
import { rankDomains } from '../lib/personalize';
import { api } from '../lib/api';
import {
  FileText,
  UploadCloud,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronDown,
  Target,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

interface ResumeAnalyzerPageProps {
  profile: UserProfile;
  domains: CSDomain[];
  report: ResumeReport | null;
  onSaveReport: (r: ResumeReport) => void;
}

const SEVERITY_STYLE: Record<string, { box: string; chip: string; label: string }> = {
  high: { box: 'border-rose-800/70 bg-rose-950/30', chip: 'bg-rose-950 text-rose-300 border-rose-800', label: 'Fix first' },
  medium: { box: 'border-amber-800/60 bg-amber-950/20', chip: 'bg-amber-950 text-amber-300 border-amber-800', label: 'Improve' },
  low: { box: 'border-slate-800 bg-slate-950/60', chip: 'bg-slate-800 text-slate-300 border-slate-700', label: 'Polish' },
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = () => reject(new Error('Could not read the file.'));
    r.readAsDataURL(file);
  });

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({ profile, domains, report, onSaveReport }) => {
  const defaultDomain = useMemo(() => {
    if (report) return report.domainId;
    return rankDomains(profile, domains)[0]?.id || domains[0].id;
  }, [profile, domains, report]);

  const [domainId, setDomainId] = useState(defaultDomain);
  const [file, setFile] = useState<File | null>(null);
  const [pasted, setPasted] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [showForm, setShowForm] = useState(!report);
  const inputRef = useRef<HTMLInputElement>(null);

  const domain = domains.find((d) => d.id === domainId) || domains[0];

  const pickFile = (f: File | null) => {
    if (!f) return;
    if (!/\.(pdf|docx|txt)$/i.test(f.name)) { setError('Please upload a PDF, DOCX or TXT file.'); return; }
    if (f.size > 6 * 1024 * 1024) { setError('File is too large. Please upload a file under 6 MB.'); return; }
    setError('');
    setFile(f);
  };

  const run = async () => {
    setError('');
    if (!file && pasted.trim().length < 80) {
      setError('Upload your resume (PDF, DOCX or TXT) or paste at least a few lines of resume text.');
      return;
    }
    setBusy(true);
    try {
      let text = pasted.trim();
      let name = 'Pasted text';
      if (file) {
        const data = await toBase64(file);
        const res = await api.extractResume(file.name, data);
        text = res.text;
        name = file.name;
      }
      const result = analyseResume({ text, fileName: name, domain, profile });
      onSaveReport(result);
      setShowForm(false);
      setFile(null);
      setPasted('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      setError(e?.message || 'Could not analyse this resume. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  // score ring
  const R = 54;
  const C = 2 * Math.PI * R;
  const ringColor = report ? (report.score >= 80 ? '#34d399' : report.score >= 65 ? '#22d3ee' : report.score >= 50 ? '#fbbf24' : '#fb7185') : '#22d3ee';

  return (
    <div className="space-y-8 pb-12">

      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          Resume Analyzer
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Check Your Resume Like a Recruiter</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Get an ATS-style score with fixes for contact details, structure, keywords for your target domain, impact, language and length. Names and institute names are never spell-checked.
        </p>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target domain to check against</label>
            <div className="relative">
              <Target className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <ChevronDown className="w-4 h-4 absolute right-3.5 top-3 text-slate-500 pointer-events-none" />
              <select
                value={domainId}
                onChange={(e) => setDomainId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 appearance-none"
              >
                {domains.map((d) => <option key={d.id} value={d.id}>{d.title}</option>)}
              </select>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Selected from your profile role ({profile.role}). Change it to check the resume for another domain.</p>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files?.[0] || null); }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${dragOver ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-700 bg-slate-950/60 hover:border-slate-600'}`}
          >
            <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(e) => pickFile(e.target.files?.[0] || null)} />
            <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            {file ? (
              <div className="text-xs text-white font-semibold">{file.name} <span className="text-slate-400 font-normal">({Math.round(file.size / 1024)} KB)</span></div>
            ) : (
              <>
                <div className="text-xs font-semibold text-white">Drag & drop your resume here, or click to browse</div>
                <div className="text-[11px] text-slate-500 mt-1">PDF, DOCX or TXT &middot; up to 6 MB</div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500"><div className="flex-1 h-px bg-slate-800" />or paste your resume text<div className="flex-1 h-px bg-slate-800" /></div>

          <textarea
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            rows={6}
            placeholder="Paste the text of your resume here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 resize-y"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={run}
              disabled={busy}
              className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{busy ? 'Analysing your resume...' : 'Analyse My Resume'}</span>
            </button>
            {report && (
              <button onClick={() => { setShowForm(false); setError(''); }} className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors">
                Cancel
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Your resume is read on your own computer's server and only the score report is saved to your account.</p>
        </div>
      )}

      {/* Report */}
      {report && !showForm && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              <span className="text-white font-semibold">{report.fileName}</span> &middot; checked for <span className="text-cyan-300 font-semibold">{report.domainTitle}</span> &middot; {new Date(report.analysedAt).toLocaleString()}
            </div>
            <button onClick={() => { setDomainId(report.domainId); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-colors w-fit">
              <RefreshCw className="w-3.5 h-3.5" /> Analyse another / updated resume
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl text-center space-y-4">
              <div className="relative w-36 h-36 mx-auto">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r={R} fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle cx="60" cy="60" r={R} fill="none" stroke={ringColor} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (C * report.score) / 100} style={{ transition: 'stroke-dashoffset 0.8s' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-extrabold text-white">{report.score}</div>
                  <div className="text-[10px] text-slate-400">out of 100</div>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{scoreLabel(report.score)}</div>
                <div className="text-[11px] text-slate-400 mt-1">{report.wordCount} words analysed</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white">Score Breakdown</h2>
              <div className="space-y-3.5">
                {report.checks.map((c) => {
                  const pct = Math.round((c.score / c.max) * 100);
                  return (
                    <div key={c.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-200 font-semibold">{c.label}</span>
                        <span className="text-slate-400">{c.score}/{c.max} &middot; <span className="text-slate-500">{c.note}</span></span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className={`h-2 rounded-full transition-all duration-500 ${pct >= 75 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : pct >= 50 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-amber-400 to-rose-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Issues */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-400" /> What to Improve <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{report.issues.length}</span></h2>
              {report.issues.length === 0 ? (
                <p className="text-xs text-emerald-300">No major issues found. Great work!</p>
              ) : (
                <div className="space-y-3">
                  {report.issues.map((i, idx) => (
                    <div key={idx} className={`p-3.5 rounded-xl border ${SEVERITY_STYLE[i.severity].box}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${SEVERITY_STYLE[i.severity].chip}`}>{SEVERITY_STYLE[i.severity].label}</span>
                        <span className="text-xs font-bold text-white">{i.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{i.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Strengths */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> What Is Working</h2>
                {report.strengths.length === 0 ? (
                  <p className="text-xs text-slate-400">Fix the items on the left and analyse again to see your strengths.</p>
                ) : (
                  <ul className="space-y-2">
                    {report.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />{s}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Keywords */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <h2 className="text-base font-bold text-white">Keywords for {report.domainTitle}</h2>
                <div>
                  <div className="text-[11px] text-slate-400 mb-1.5">Found on your resume ({report.matchedKeywords.length})</div>
                  <div className="flex flex-wrap gap-1.5">
                    {report.matchedKeywords.length === 0 && <span className="text-[11px] text-slate-500">None found</span>}
                    {report.matchedKeywords.map((k) => <span key={k} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/70 font-mono">{k}</span>)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 mb-1.5">Missing, add if you know them ({report.missingKeywords.length})</div>
                  <div className="flex flex-wrap gap-1.5">
                    {report.missingKeywords.length === 0 && <span className="text-[11px] text-emerald-300">You have all of them!</span>}
                    {report.missingKeywords.map((k) => <span key={k} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-950/40 text-amber-300 border border-amber-800/60 font-mono">{k}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
