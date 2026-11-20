import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  User, UserProfile, CSDomain, ApplicationRecord, Internship, UserState, CourseProgress,
  KnowledgeLevel, RoadmapProgress, ResumeReport,
} from './types';
import { CS_DOMAINS } from './data/domains';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { ProfileSetupPage } from './components/ProfileSetupPage';
import { DashboardPage } from './components/DashboardPage';
import { DomainOverviewPage } from './components/DomainOverviewPage';
import { DomainDetailPage } from './components/DomainDetailPage';
import { ResumeAnalyzerPage } from './components/ResumeAnalyzerPage';
import { InternshipModal } from './components/InternshipModal';
import { ApplicationsDrawer } from './components/ApplicationsDrawer';
import { api, Bootstrap } from './lib/api';
import { PickedResource, suggestLevel, rankDomains } from './lib/personalize';
import { dayKey } from './lib/time';

const EMPTY_STATE: UserState = { courses: {}, roadmaps: {}, applications: [], resume: null };

export default function App() {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [state, setState] = useState<UserState>(EMPTY_STATE);
  const [time, setTime] = useState<Record<string, number>>({});
  const [liveSeconds, setLiveSeconds] = useState(0);

  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedDomain, setSelectedDomain] = useState<CSDomain>(CS_DOMAINS[0]);

  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);
  const [showTracker, setShowTracker] = useState(false);

  const loaded = useRef(false);

  // ---------- restore session on page load ----------
  const applyBootstrap = useCallback((data: Bootstrap) => {
    setUser(data.user);
    setProfile(data.profile);
    setState({ ...EMPTY_STATE, ...data.state });
    setTime(data.time || {});
    setLiveSeconds(0);
    loaded.current = true;
  }, []);

  useEffect(() => {
    api.me().then(applyBootstrap).catch(() => { /* not logged in */ }).finally(() => setBooting(false));
  }, [applyBootstrap]);

  // ---------- save progress (debounced) ----------
  useEffect(() => {
    if (!user || !loaded.current) return;
    const t = setTimeout(() => { api.saveState(state).catch(() => {}); }, 600);
    return () => clearTimeout(t);
  }, [state, user]);

  // ---------- time spent tracking (only while the tab is visible) ----------
  const pending = useRef(0);
  useEffect(() => {
    if (!user) return;
    const flush = (keepalive = false) => {
      const secs = Math.round(pending.current);
      if (secs < 1) return;
      pending.current = 0;
      const day = dayKey();
      api.addTime(day, secs, keepalive).then(() => {
        setTime((t) => ({ ...t, [day]: (t[day] || 0) + secs }));
        setLiveSeconds((l) => Math.max(0, l - secs));
      }).catch(() => { pending.current += secs; });
    };
    const tick = setInterval(() => {
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        pending.current += 1;
        setLiveSeconds((l) => l + 1);
      }
    }, 1000);
    const sender = setInterval(() => {
      // the API accepts at most 120s per request
      if (pending.current >= 30) flush();
    }, 10000);
    const onHide = () => { if (document.visibilityState === 'hidden') flush(true); };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', () => flush(true));
    return () => {
      clearInterval(tick); clearInterval(sender);
      document.removeEventListener('visibilitychange', onHide);
      flush(true);
    };
  }, [user]);

  // ---------- auth ----------
  const handleAuthenticated = (data: Bootstrap) => {
    applyBootstrap(data);
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    try { await api.logout(); } catch { /* ignore */ }
    loaded.current = false;
    setUser(null); setProfile(null); setState(EMPTY_STATE); setTime({}); setLiveSeconds(0);
    setShowTracker(false); setApplyingInternship(null);
    setCurrentPage('dashboard');
  };

  const handleSaveProfile = async (p: UserProfile) => {
    const data = await api.saveProfile(p);
    setUser(data.user);
    setProfile(data.profile);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0 });
  };

  // ---------- navigation ----------
  const handleSelectDomain = (domain: CSDomain) => {
    setSelectedDomain(domain);
    setCurrentPage('detail');
    window.scrollTo({ top: 0 });
  };

  // ---------- roadmap progress ----------
  const roadmapFor = (domain: CSDomain, prev: UserState): RoadmapProgress =>
    prev.roadmaps[domain.id] || { level: suggestLevel(domain, profile), done: {} };

  const handleSetLevel = (level: KnowledgeLevel) => {
    setState((prev) => ({
      ...prev,
      roadmaps: { ...prev.roadmaps, [selectedDomain.id]: { ...roadmapFor(selectedDomain, prev), level, updatedAt: new Date().toISOString() } },
    }));
  };

  const handleToggleTopic = (topicId: string) => {
    setState((prev) => {
      const cur = roadmapFor(selectedDomain, prev);
      const done = { ...cur.done };
      if (done[topicId]) delete done[topicId]; else done[topicId] = true;
      return { ...prev, roadmaps: { ...prev.roadmaps, [selectedDomain.id]: { ...cur, done, updatedAt: new Date().toISOString() } } };
    });
  };

  // ---------- courses & certifications ----------
  const handleStartResource = (r: PickedResource, domainId: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const existing = prev.courses[r.id];
      const next: CourseProgress = existing
        ? { ...existing, lastOpenedAt: now }
        : { id: r.id, kind: r.kind, domainId, title: r.title, provider: r.provider, url: r.url, isFree: r.isFree, status: 'in_progress', progress: 0, startedAt: now, lastOpenedAt: now };
      return { ...prev, courses: { ...prev.courses, [r.id]: next } };
    });
  };

  const handleUpdateCourse = (id: string, patch: Partial<CourseProgress>) => {
    setState((prev) => (prev.courses[id] ? { ...prev, courses: { ...prev.courses, [id]: { ...prev.courses[id], ...patch } } } : prev));
  };

  // ---------- internship applications ----------
  const setApplications = (fn: (prev: ApplicationRecord[]) => ApplicationRecord[]) =>
    setState((prev) => ({ ...prev, applications: fn(prev.applications) }));

  const handleTrackInternship = (internship: Internship, status: ApplicationRecord['status'] = 'Applied on Official Portal') => {
    setApplications((prev) => {
      if (prev.find((a) => a.internshipId === internship.id)) {
        return prev.map((a) => (a.internshipId === internship.id ? { ...a, status } : a));
      }
      const record: ApplicationRecord = {
        id: 'app_' + Date.now(),
        internshipId: internship.id,
        roleTitle: internship.roleTitle,
        companyName: internship.companyName,
        domainTitle: internship.domainId,
        appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status,
        applicantName: profile?.fullName || user?.name || 'Applicant',
        applicantEmail: user?.email || '',
        coverNote: `Submitted on ${internship.portalName}. Req: ${internship.jobReqId}`,
        applyUrl: internship.applyUrl,
        portalName: internship.portalName,
      };
      return [record, ...prev];
    });
  };
  const handleUntrackInternship = (id: string) => setApplications((prev) => prev.filter((a) => a.internshipId !== id));
  const handleUpdateApplicationStatus = (id: string, status: ApplicationRecord['status']) =>
    setApplications((prev) => prev.map((a) => (a.internshipId === id ? { ...a, status } : a)));
  const handleSubmitApplicationRecord = (record: ApplicationRecord) =>
    setApplications((prev) => [record, ...prev.filter((a) => a.internshipId !== record.internshipId)]);

  const handleSaveResume = (r: ResumeReport) => setState((prev) => ({ ...prev, resume: r }));

  // ---------- render ----------
  if (booting) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  const needsProfile = !!user && !profile;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">

      <Navbar
        user={user}
        profile={profile}
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedDomain={selectedDomain}
        domains={CS_DOMAINS}
        onSelectDomain={handleSelectDomain}
        onOpenApplications={() => setShowTracker(true)}
        applicationCount={state.applications.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* The only login / sign-up entry point */}
        {!user && <AuthPage onAuthenticated={handleAuthenticated} />}

        {/* One-time profile questions (asked only until the profile is saved) */}
        {needsProfile && <ProfileSetupPage initial={null} mode="setup" onSave={handleSaveProfile} />}

        {user && profile && currentPage === 'dashboard' && (
          <DashboardPage
            user={user}
            profile={profile}
            domains={CS_DOMAINS}
            courses={state.courses}
            roadmaps={state.roadmaps}
            applications={state.applications}
            resume={state.resume}
            time={time}
            liveSeconds={liveSeconds}
            onOpenDomain={handleSelectDomain}
            onExploreDomains={() => setCurrentPage('overview')}
            onOpenResume={() => setCurrentPage('resume')}
            onOpenTracker={() => setShowTracker(true)}
            onOpenProfile={() => setCurrentPage('profile')}
            onUpdateCourse={handleUpdateCourse}
            onStartResource={handleStartResource}
          />
        )}

        {user && profile && currentPage === 'overview' && (
          <DomainOverviewPage domains={CS_DOMAINS} profile={profile} onSelectDomain={handleSelectDomain} />
        )}

        {user && profile && currentPage === 'detail' && (
          <DomainDetailPage
            key={selectedDomain.id}
            domain={selectedDomain}
            profile={profile}
            progress={state.roadmaps[selectedDomain.id]}
            courses={state.courses}
            onBackToOverview={() => setCurrentPage('overview')}
            onSetLevel={handleSetLevel}
            onToggleTopic={handleToggleTopic}
            onStartResource={handleStartResource}
            onUpdateCourse={handleUpdateCourse}
            onApplyInternship={setApplyingInternship}
            onTrackInternship={handleTrackInternship}
            onUntrackInternship={handleUntrackInternship}
            appliedInternshipIds={state.applications.map((a) => a.internshipId)}
          />
        )}

        {user && profile && currentPage === 'resume' && (
          <ResumeAnalyzerPage profile={profile} domains={CS_DOMAINS} report={state.resume} onSaveReport={handleSaveResume} />
        )}

        {user && profile && currentPage === 'profile' && (
          <ProfileSetupPage initial={profile} mode="edit" onSave={handleSaveProfile} onCancel={() => setCurrentPage('dashboard')} />
        )}
      </main>

      <Footer />

      {applyingInternship && (
        <InternshipModal
          internship={applyingInternship}
          user={user}
          onClose={() => setApplyingInternship(null)}
          onSubmitApplication={handleSubmitApplicationRecord}
        />
      )}

      {showTracker && (
        <ApplicationsDrawer
          applications={state.applications}
          onClose={() => setShowTracker(false)}
          onRemoveApplication={handleUntrackInternship}
          onUpdateStatus={handleUpdateApplicationStatus}
          onClearAll={() => setApplications(() => [])}
        />
      )}

    </div>
  );
}
