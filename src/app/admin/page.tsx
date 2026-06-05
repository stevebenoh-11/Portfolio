"use client";

import { useEffect, useState } from "react";
import {
  Inbox,
  Search,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Lock as LockIcon,
  ShieldAlert,
  Loader2,
  LogOut,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Administrative Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null means checking session
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function verifyAndLoad(username: string, pass: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        headers: {
          "x-admin-username": username,
          "x-admin-password": pass,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
        if (data.length > 0) {
          setSelectedSubmission(data[0]);
        }
        localStorage.setItem("admin_user", username);
        localStorage.setItem("admin_pass", pass);
        setIsLoggedIn(true);
        setAuthError("");
      } else {
        const body = await res.json().catch(() => ({}));
        localStorage.removeItem("admin_user");
        localStorage.removeItem("admin_pass");
        setIsLoggedIn(false);
        if (body.detail) setAuthError(`DB Error: ${body.detail}`);
      }
    } catch (err) {
      console.error(err);
      setAuthError("Failed to synchronize with the secure database.");
    } finally {
      setLoading(false);
    }
  }

  // Check persisted credentials on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("admin_user");
    const savedPass = localStorage.getItem("admin_pass");

    Promise.resolve().then(() => {
      if (savedUser && savedPass) {
        verifyAndLoad(savedUser, savedPass);
      } else {
        setIsLoggedIn(false);
        setLoading(false);
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername || !inputPassword) return;

    setSubmitting(true);
    setAuthError("");

    try {
      const res = await fetch("/api/contact", {
        headers: {
          "x-admin-username": inputUsername,
          "x-admin-password": inputPassword,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
        if (data.length > 0) {
          setSelectedSubmission(data[0]);
        }
        localStorage.setItem("admin_user", inputUsername);
        localStorage.setItem("admin_pass", inputPassword);
        setIsLoggedIn(true);
      } else if (res.status === 401) {
        setAuthError("Access Denied: Invalid username or password.");
      } else {
        const body = await res.json().catch(() => ({}));
        setAuthError(body.detail ? `DB Error: ${body.detail}` : "Database authentication offline.");
      }
    } catch (err) {
      console.error(err);
      setAuthError("Network error authenticating session.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_pass");
    setIsLoggedIn(false);
    setSubmissions([]);
    setSelectedSubmission(null);
    setInputUsername("");
    setInputPassword("");
    setAuthError("");
  };

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render authenticating screen
  if (isLoggedIn === null) {
    return (
      <main className="min-h-screen bg-background text-white flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-muted">Synchronizing secure database session...</p>
      </main>
    );
  }

  // Render administrative login screen
  if (isLoggedIn === false) {
    return (
      <main className="min-h-screen bg-background text-white font-sans flex items-center justify-center relative overflow-hidden selection:bg-primary/30">
        {/* Decorative ambient glowing circles */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md mx-6 z-10">
          <div className="rounded-2xl border border-border bg-surface p-8 relative overflow-hidden shadow-2xl">
            {/* Background micro-accents */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <LockIcon size={22} className="animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Database Protected</h1>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Unlock the secure portfolio submissions database.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  required
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Username"
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 animate-fade-in">
                  <ShieldAlert size={16} className="shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-hover transition-all duration-200 glow-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-primary cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Verifying Credentials...
                  </>
                ) : (
                  "Unlock Submissions"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      <Navbar />

      <div className="pt-32 pb-20 mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/50">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 mb-3">
              <Inbox size={12} className="text-primary" />
              <span className="text-xs text-primary font-medium">Internal Database</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Messages Dashboard</h1>
            <p className="text-sm text-muted mt-1">
              Review and manage connection requests submitted to your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-surface border border-border px-4 py-2 rounded-xl text-center">
              <p className="text-xs text-caption">Total Messages</p>
              <p className="text-xl font-bold text-primary">{submissions.length}</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 text-sm font-semibold transition-all duration-200 cursor-pointer"
            >
              <LogOut size={14} />
              Lock DB
            </button>
          </div>
        </div>

        {/* Dashboard Workstation */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted">Reading submissions database...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-border bg-surface max-w-lg mx-auto">
            <Inbox size={48} className="text-caption mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white mb-2">No Submissions Yet</h3>
            <p className="text-sm text-muted px-6 leading-relaxed">
              When someone fills out the contact form on your portfolio, their information will be registered in this database instantly.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column — Message List */}
            <div className="w-full lg:w-5/12 flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search size={16} className="absolute left-4 top-3.5 text-caption" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border text-white text-sm placeholder:text-caption focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Scrollable list */}
              <div className="rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border/50 max-h-[550px] overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-10 text-sm text-muted">
                    No results match your search query.
                  </div>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`w-full p-5 text-left transition-all flex items-start justify-between gap-3 group ${
                        selectedSubmission?.id === sub.id
                          ? "bg-surface-alt border-l-2 border-primary"
                          : "hover:bg-surface-alt/50"
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white truncate max-w-[150px]">
                            {sub.name}
                          </span>
                          <span className="text-[10px] text-caption shrink-0">
                            {new Date(sub.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-primary/80 truncate">
                          {sub.subject}
                        </p>
                        <p className="text-xs text-muted truncate max-w-[280px]">
                          {sub.message}
                        </p>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-caption opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0"
                      />
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Right Column — Message Viewer Panel */}
            <div className="flex-1">
              {selectedSubmission ? (
                <div className="rounded-xl border border-border bg-surface p-6 md:p-8 space-y-6 h-full flex flex-col justify-between">
                  {/* Message Header */}
                  <div className="space-y-4 pb-6 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {selectedSubmission.name}
                        </h2>
                        <p className="text-sm text-primary font-medium mt-0.5">
                          {selectedSubmission.subject}
                        </p>
                      </div>
                      <span className="text-xs text-caption shrink-0 bg-surface-alt px-3 py-1.5 rounded-lg border border-border flex items-center gap-1.5 font-mono">
                        <Calendar size={12} className="text-primary" />
                        {new Date(selectedSubmission.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Meta info row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-alt border border-border/50 hover:border-primary/20 text-xs text-muted hover:text-white transition-all"
                      >
                        <Mail size={14} className="text-primary" />
                        <span className="truncate">{selectedSubmission.email}</span>
                        <ExternalLink size={10} className="ml-auto opacity-50" />
                      </a>

                      <a
                        href={`tel:${selectedSubmission.phone}`}
                        className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-alt border border-border/50 hover:border-primary/20 text-xs text-muted hover:text-white transition-all"
                      >
                        <Phone size={14} className="text-primary" />
                        <span>{selectedSubmission.phone}</span>
                        <ExternalLink size={10} className="ml-auto opacity-50" />
                      </a>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 py-4">
                    <div className="flex gap-3 mb-2">
                      <MessageSquare size={16} className="text-primary mt-1 shrink-0" />
                      <h4 className="text-xs font-semibold text-caption uppercase tracking-wider">
                        Message Content
                      </h4>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-surface-alt p-5 min-h-[180px]">
                      <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-6 border-t border-border/50 text-right">
                    <a
                      href={`https://mail.google.com/mail/u/stevebenoh@gmail.com/?view=cm&fs=1&to=${encodeURIComponent(
                        selectedSubmission.email
                      )}&su=${encodeURIComponent(`Re: ${selectedSubmission.subject}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold text-xs hover:bg-primary-hover transition-colors glow-button"
                    >
                      Reply via Email
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full rounded-xl border border-border bg-surface p-8 flex flex-col items-center justify-center text-center text-muted min-h-[300px]">
                  Select a message from the list to view its full details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
