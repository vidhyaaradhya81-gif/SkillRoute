import React from 'react';
import { Compass, Github, Twitter, Linkedin, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">SkillRoute</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              SkillRoute is a smart courses recommender that builds personalised roadmaps, courses, certifications and internship suggestions for engineering students.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick CS Domains */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Popular Domains
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Full-Stack Web Development</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Data Science & Machine Learning</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Cloud Computing & DevOps</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Cybersecurity & Ethical Hacking</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Generative AI & LLM Engineering</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Career Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-cyan-300 transition-colors">2026 Industry Certifications Guide</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Internship Application Tracker</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Resume Analyzer</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">AI Skill Gap Analysis</a></li>
              <li><a href="#" className="hover:text-cyan-300 transition-colors">Open Source Apprenticeships</a></li>
            </ul>
          </div>

          {/* Standards & Verified Badge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Quality Assured
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Roadmaps built from open-source career guides and top university curricula, matched to current 2026 hiring requirements.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live 2026 Curriculum Updated
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 SkillRoute. Built for Engineering Students & Future Professionals.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
