import React, { useState, useMemo } from 'react';
import { CSDomain, UserProfile } from '../types';
import { domainMatchPercent, rankDomains } from '../lib/personalize';
import { 
  Search, 
  Filter, 
  Code2, 
  Database, 
  Cloud, 
  ShieldAlert, 
  Sparkles, 
  Smartphone, 
  Gamepad2, 
  Cpu, 
  ArrowRight, 
  Briefcase, 
  Award, 
  TrendingUp,
  Layers
} from 'lucide-react';

interface DomainOverviewPageProps {
  domains: CSDomain[];
  profile: UserProfile | null;
  onSelectDomain: (domain: CSDomain) => void;
}

// Icon mapper helper
const getDomainIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-6 h-6 text-cyan-400" />;
    case 'Database': return <Database className="w-6 h-6 text-blue-400" />;
    case 'Cloud': return <Cloud className="w-6 h-6 text-indigo-400" />;
    case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-400" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
    case 'Smartphone': return <Smartphone className="w-6 h-6 text-emerald-400" />;
    case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-amber-400" />;
    case 'Cpu': return <Cpu className="w-6 h-6 text-teal-400" />;
    default: return <Layers className="w-6 h-6 text-cyan-400" />;
  }
};

export const DomainOverviewPage: React.FC<DomainOverviewPageProps> = ({ domains, profile, onSelectDomain }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web & App', 'AI & Data', 'Cloud & Sec', 'Systems & Hardware'];

  const filteredDomains = useMemo(() => {
    return rankDomains(profile, domains).filter((d) => {
      const matchesSearch = 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.topTools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || d.categoryTag === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [domains, profile, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Title & Introduction Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          {domains.length} Domains &middot; Sorted For You
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Career Domains
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Domains are sorted by how well they match your skills, specialisation and target role. Pick one to get a roadmap built around what you already know, with the best courses, certifications and internships.
        </p>
      </div>

      {/* Search Bar & Category Filter Bar */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* Search Bar Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domains or tools (e.g. React, PyTorch, Kubernetes, AWS)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Domain Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map((domain) => (
          <div
            key={domain.id}
            onClick={() => onSelectDomain(domain)}
            className="group relative p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getDomainIcon(domain.iconName)}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300">
                    {domain.categoryTag}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                    {domainMatchPercent(profile, domain) > 0 ? `${domainMatchPercent(profile, domain)}% match` : domain.hiringDemand}
                  </span>
                </div>
              </div>

              {/* Title & 2-sentence description */}
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {domain.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {domain.shortDescription}
              </p>

              {/* Top Tools Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {domain.topTools.slice(0, 5).map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 font-mono"
                  >
                    {tool}
                  </span>
                ))}
                {domain.topTools.length > 5 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-950 text-slate-500">
                    +{domain.topTools.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Salary & Action CTA */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Avg Base Salary</span>
                <span className="font-bold text-slate-200">{domain.avgSalary}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-indigo-400" />
                    {domain.industryCertifications.length} Certs
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    {domain.internships.length} Internships
                  </span>
                </div>
              </div>

              <div className="w-full py-2.5 rounded-xl bg-slate-950 group-hover:bg-cyan-600 text-slate-300 group-hover:text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all">
                <span>View My Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredDomains.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <p className="text-sm text-slate-400 mb-2">No domains match your search query "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-cyan-400 hover:underline font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
