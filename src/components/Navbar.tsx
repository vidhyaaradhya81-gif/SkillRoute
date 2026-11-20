import React from 'react';
import { User, CSDomain, UserProfile } from '../types';
import { 
  Compass, 
  Briefcase, 
  Sparkles, 
  LogOut, 
  User as UserIcon, 
  ChevronDown, 
  Bookmark, 
  Layers,
  GraduationCap,
  FileText,
  LayoutDashboard
} from 'lucide-react';

export type PageId = 'dashboard' | 'overview' | 'detail' | 'resume' | 'profile';

interface NavbarProps {
  user: User | null;
  profile: UserProfile | null;
  onLogout: () => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  selectedDomain: CSDomain | null;
  domains: CSDomain[];
  onSelectDomain: (domain: CSDomain) => void;
  onOpenApplications: () => void;
  applicationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  profile,
  onLogout,
  currentPage,
  setCurrentPage,
  selectedDomain,
  domains,
  onSelectDomain,
  onOpenApplications,
  applicationCount
}) => {
  const [domainDropdownOpen, setDomainDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => user && setCurrentPage('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 tracking-tight">
              SkillRoute
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 font-medium">
              Smart Courses Recommender
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        {user && profile && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('overview')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'overview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Explore Domains
            </button>
            <button
              onClick={() => setCurrentPage('resume')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'resume'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Resume Analyzer
            </button>

            {/* Quick Domain Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDomainDropdownOpen(!domainDropdownOpen)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  currentPage === 'detail' && selectedDomain
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{selectedDomain ? selectedDomain.title : 'Quick Switch'}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {domainDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto"
                  onMouseLeave={() => setDomainDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-800">
                    Select Domain
                  </div>
                  {domains.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        onSelectDomain(d);
                        setCurrentPage('detail');
                        setDomainDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                        selectedDomain?.id === d.id ? 'text-cyan-400 bg-cyan-950/30 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      <span className="truncate">{d.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {d.internships.length} Internships
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {/* My Applications Button */}
              {profile && <button
                onClick={onOpenApplications}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
                title="View My Applications"
              >
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">My Tracker</span>
                {applicationCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500 text-slate-950 font-bold">
                    {applicationCount}
                  </span>
                )}
              </button>}

              {/* User Avatar Badge */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <button
                  onClick={() => profile && setCurrentPage('profile')}
                  className="flex items-center gap-2 text-left"
                  title={profile ? 'Edit my profile' : undefined}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-blue-500/30">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-medium text-slate-200 leading-none">{user.name}</div>
                    <div className="text-[10px] text-slate-400">{profile ? profile.role : user.email}</div>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : null}
        </div>

      </div>
    </header>
  );
};
