import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  FileText,
  User,
  Calendar,
  Phone,
  Stethoscope,
  Clock,
  MessageSquare,
  ShieldAlert,
  X,
  Activity
} from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEhrModal, setShowEhrModal] = useState(false);

  const patient = MOCK_PATIENTS.find((p) => p.id === id) || MOCK_PATIENTS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-20 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full space-y-8">
        {/* TOP NAV & BACK BUTTON */}
        <div>
          <button
            onClick={() => navigate('/app')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Back to Clinical Dashboard</span>
          </button>
        </div>

        {/* PATIENT PROFILE CARD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors duration-200">
          {/* Accent line on top */}
          <div
            className={`absolute top-0 left-0 right-0 h-1.5 ${
              patient.status === 'Needs Attention'
                ? 'bg-red-500'
                : patient.status === 'Normal'
                ? 'bg-emerald-500'
                : 'bg-slate-400 dark:bg-slate-700'
            }`}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Info Column */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{patient.name}</h1>
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700">
                  {patient.id}
                </span>

                {/* Prominent Alert Badge */}
                {patient.status === 'Needs Attention' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 dark:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30 dark:border-red-500/40 text-xs font-bold animate-pulse">
                    <ShieldAlert className="w-4 h-4" />
                    Needs Attention - Escalated
                  </span>
                )}
                {patient.status === 'Normal' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/40 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Recovery Normal
                  </span>
                )}
              </div>

              {/* Red warning bar if flagged */}
              {patient.status === 'Needs Attention' && patient.flaggedReason && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-300 text-xs font-medium flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-900 dark:text-red-200">Clinical Alert Triggered:</strong>{' '}
                    {patient.flaggedReason}
                  </div>
                </div>
              )}

              {/* Patient Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Age &amp; Gender</span>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {patient.age} years ({patient.gender})
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <Stethoscope className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Surgical Procedure</span>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white truncate">{patient.procedure}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Discharge Date</span>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">{patient.dischargeDate}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Contact Phone</span>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white">{patient.phone}</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-4">
                <span>Attending: <strong className="text-slate-800 dark:text-slate-200">{patient.attendingPhysician}</strong></span>
                <span>•</span>
                <span>Team: <strong className="text-slate-800 dark:text-slate-200">{patient.careTeam}</strong></span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => setShowEhrModal(true)}
                className="flex-1 lg:w-44 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs border border-slate-300 dark:border-slate-700 shadow-xs transition-all"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>View EHR Chart</span>
              </button>

              <Link
                to="/demo"
                className="flex-1 lg:w-44 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Patient</span>
              </Link>
            </div>
          </div>
        </div>

        {/* FOLLOW-UP HISTORY TIMELINE */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Follow-up History Timeline
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {patient.history.length} Automated AI Call Check-in(s) Recorded
            </span>
          </div>

          {patient.history.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 dark:text-slate-400 shadow-xs">
              No previous call records logged yet for this patient.
            </div>
          ) : (
            patient.history.map((call) => (
              <div
                key={call.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-xl transition-colors duration-200"
              >
                {/* Header card color */}
                <div
                  className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    call.status === 'Needs Attention'
                      ? 'bg-red-50 dark:bg-red-950/70 border-b border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-200'
                      : 'bg-emerald-50 dark:bg-emerald-950/70 border-b border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {call.status === 'Needs Attention' ? (
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        {call.day} ({call.status})
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 opacity-90">{call.date}</p>
                    </div>
                  </div>

                  <div className="text-xs font-mono px-2.5 py-1 rounded bg-slate-200/80 dark:bg-black/40 border border-slate-300 dark:border-white/10 self-start sm:self-auto text-slate-700 dark:text-slate-300 font-medium">
                    Duration: {call.duration}
                  </div>
                </div>

                {/* Call Content Body */}
                <div className="p-6 space-y-6">
                  {/* AI Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      <Activity className="w-4 h-4" />
                      <span>AI Clinical Summary</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{call.summary}</p>
                  </div>

                  {/* Chat-Bubble Style Transcript */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      Call Audio Transcript
                    </h4>

                    <div className="space-y-3 bg-slate-50/70 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 max-h-96 overflow-y-auto">
                      {call.transcript.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${
                            msg.sender === 'ai' ? 'items-start' : 'items-end'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-500 mb-1 px-1">
                            <span className="font-semibold text-slate-600 dark:text-slate-400">
                              {msg.sender === 'ai' ? 'PatientCall AI Voice' : patient.name}
                            </span>
                            <span>•</span>
                            <span>{msg.timestamp}</span>
                          </div>

                          <div
                            className={`max-w-xl rounded-2xl px-4 py-2.5 text-sm ${
                              msg.sender === 'ai'
                                ? 'bg-blue-50 text-blue-950 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-100 dark:border-blue-800/50 rounded-tl-xs shadow-xs'
                                : 'bg-white text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 rounded-tr-xs shadow-xs'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* EHR CHART MODAL */}
      {showEhrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Electronic Health Record (Epic Sync)</h3>
              </div>
              <button
                onClick={() => setShowEhrModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm text-slate-700 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-xs text-slate-500 block">Patient Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{patient.name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">MRN / ID</span>
                  <span className="font-mono text-slate-900 dark:text-white">{patient.id}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">DOB</span>
                  <span className="text-slate-900 dark:text-white">1954-04-12 (72 yrs)</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-xs uppercase text-blue-600 dark:text-blue-400">
                  Discharge Summary
                </h4>
                <p className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Patient underwent uneventful {patient.procedure} on {patient.dischargeDate}. Discharged with prescribed analgesics, DVT prophylaxis, and physical therapy protocol. Enrolled in Aftercare automated AI post-discharge clinical monitoring program.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-xs uppercase text-blue-600 dark:text-blue-400">
                  Vitals &amp; Medication Record
                </h4>
                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                  <div className="p-3 flex justify-between">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Oxycodone 5mg (PRN Pain)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Prescribed</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Enoxaparin 40mg SC daily</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Acetaminophen 1000mg q8h</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowEhrModal(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20"
                >
                  Close Chart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
