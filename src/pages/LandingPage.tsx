import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Activity,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck,
  UserCheck,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[200px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Now Live Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs dark:shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Now Live: Autonomous Post-Discharge Clinical Calling</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Zero-effort clinical follow-ups that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-blue-600">
                save lives.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              An AI voice agent that automatically calls patients after discharge, runs structured clinical check-ins, and instantly flags anyone who needs to be reseen.
            </p>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Experience the AI Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/app"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-base transition-all shadow-xs dark:shadow-none hover:scale-[1.02] active:scale-95"
              >
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>View Clinical Dashboard</span>
              </Link>
            </div>

            {/* Mini Trust Bar */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>99.4% Call Response Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Epic &amp; Cerner EHR Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Sub-30 Minute Escalation Speed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID (3 columns) */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-2">Engineered for Hospitals</h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Purpose-built for post-op safety</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-blue-400/50 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Tailored Sequences</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Day 1, 3, and 7 follow-ups tailored specifically to the patient’s surgical procedure, medication schedule, and mobility guidelines.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-red-400/50 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Escalation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Red flags like severe pain, fever, or wound swelling trigger immediate human nurse callbacks and highlight the patient in red on the triage board.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-emerald-400/50 dark:hover:border-slate-700 transition-all shadow-xs dark:shadow-none group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Seamless EHR Sync</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Call transcripts, symptom metrics, and clinical notes automatically sync directly into hospital software like Epic and Cerner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4 steps in a horizontal row) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-2">Workflow</h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">How Aftercare Works</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">From hospital exit to home recovery in 4 automated steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20 dark:border-blue-500/30">
                    1
                  </span>
                  <FileCheck className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Discharge</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Hospital staff enroll patient upon discharge. Patient receives SMS notice of upcoming follow-up call window.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20 dark:border-blue-500/30">
                    2
                  </span>
                  <PhoneCall className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Calls</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Aftercare voice agent places automated phone check-in on Days 1, 3, and 7 using compassionate clinical dialogues.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20 dark:border-blue-500/30">
                    3
                  </span>
                  <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Assessment</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  AI runs a structured clinical check-in based on the procedure.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20 dark:border-blue-500/30">
                    4
                  </span>
                  <UserCheck className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Action</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Normal check-ins auto-file to EHR. High-risk patients trigger immediate nurse alert push notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION CARD */}
      <section className="py-16 bg-slate-100/50 dark:bg-slate-900/40 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-blue-100/80 via-white to-blue-50/70 dark:from-blue-900/50 dark:via-slate-900 dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl dark:shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Test the AI voice agent right now
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-base">
                Experience a simulated post-discharge phone call with Eleanor Rigby, a 72-year-old knee replacement patient.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/demo"
                  className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Launch Interactive Call Demo
                </Link>
                <Link
                  to="/app"
                  className="px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all border border-slate-300 dark:border-slate-700 shadow-xs dark:shadow-none flex items-center gap-2"
                >
                  Open Nurse Dashboard
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
