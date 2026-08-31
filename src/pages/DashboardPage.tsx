import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  Calendar,
  PhoneCall
} from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';
import { PatientStatus } from '../types';

export const DashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'ALL' | 'CALLS_TODAY'>('ALL');

  // Counts
  const needsAttentionCount = MOCK_PATIENTS.filter((p) => p.status === 'Needs Attention').length;
  const normalCount = MOCK_PATIENTS.filter((p) => p.status === 'Normal').length;
  const callsTodayCount = 12;

  // Filtered patients
  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.procedure.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'CALLS_TODAY') {
      return patient.lastCallDate.toLowerCase().includes('today');
    }
    return patient.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Patient Follow-ups
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
                Live Clinical Feed
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Real-time post-discharge AI check-ins, triage alert monitoring, and patient history.
            </p>
          </div>

          {/* Search & Filter bar in header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient name, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors shadow-xs ${
                  statusFilter === 'ALL'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                All ({MOCK_PATIENTS.length})
              </button>
              <Link
                to="/demo"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/20 dark:hover:bg-emerald-600/30 text-xs font-medium transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Simulate Call
              </Link>
            </div>
          </div>
        </div>

        {/* SUMMARY STAT CARDS (3 columns - CLICKABLE TO FILTER) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Needs Attention Card */}
          <button
            onClick={() =>
              setStatusFilter(statusFilter === 'Needs Attention' ? 'ALL' : 'Needs Attention')
            }
            className={`p-6 rounded-2xl border text-left transition-all group relative overflow-hidden ${
              statusFilter === 'Needs Attention'
                ? 'bg-red-50 dark:bg-red-950/40 border-red-500 ring-2 ring-red-500/50 shadow-md shadow-red-950/10 dark:shadow-red-950/50'
                : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-red-900/40 hover:border-red-400 dark:hover:border-red-500/60 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider text-red-600 dark:text-red-400 uppercase">
                Needs Attention
              </span>
              <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{needsAttentionCount}</span>
              <span className="text-xs text-red-600 dark:text-red-300 font-medium">Flagged Patients</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              <span>Immediate triage callback required</span>
              <ChevronRight className="w-3 h-3 text-red-500 dark:text-red-400 group-hover:translate-x-1 transition-transform" />
            </p>
          </button>

          {/* Normal Check-ins Card */}
          <button
            onClick={() => setStatusFilter(statusFilter === 'Normal' ? 'ALL' : 'Normal')}
            className={`p-6 rounded-2xl border text-left transition-all group relative overflow-hidden ${
              statusFilter === 'Normal'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/50 shadow-md shadow-emerald-950/10 dark:shadow-emerald-950/50'
                : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-500/60 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                Normal Check-ins
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{normalCount}</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">On Track</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              <span>Recovery progressing smoothly</span>
              <ChevronRight className="w-3 h-3 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </p>
          </button>

          {/* Calls Today Card */}
          <button
            onClick={() =>
              setStatusFilter(statusFilter === 'CALLS_TODAY' ? 'ALL' : 'CALLS_TODAY')
            }
            className={`p-6 rounded-2xl border text-left transition-all group relative overflow-hidden ${
              statusFilter === 'CALLS_TODAY'
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/50 shadow-md shadow-blue-950/10 dark:shadow-blue-950/50'
                : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500/60 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Calls Today
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{callsTodayCount}</span>
              <span className="text-xs text-blue-600 dark:text-blue-300 font-medium">Completed Calls</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              <span>Automated Day 1, 3 &amp; 7 check-ins</span>
              <ChevronRight className="w-3 h-3 text-blue-500 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
            </p>
          </button>
        </div>

        {/* ACTIVE FILTER BADGE indicator */}
        {statusFilter !== 'ALL' && (
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
            <span>
              Showing filter: <strong className="text-slate-900 dark:text-white">{statusFilter}</strong> ({filteredPatients.length} matching)
            </span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Reset to Show All Patients
            </button>
          </div>
        )}

        {/* PATIENT DATA TABLE */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs dark:shadow-xl transition-colors duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Patient</th>
                  <th className="py-4 px-6">Procedure &amp; Discharge</th>
                  <th className="py-4 px-6">Clinical Status</th>
                  <th className="py-4 px-6">Last AI Call</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No patients found matching your search or status filter.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Patient Name, ID, Age */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                              patient.status === 'Needs Attention'
                                ? 'bg-red-500/15 text-red-600 dark:text-red-300 border border-red-500/30'
                                : patient.status === 'Normal'
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {patient.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <Link
                              to={`/patient/${patient.id}`}
                              className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                            >
                              {patient.name}
                            </Link>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>ID: {patient.id}</span>
                              <span>•</span>
                              <span>{patient.age} yrs ({patient.gender[0]})</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Procedure & Discharge Date */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{patient.procedure}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>Discharged {patient.dischargeDate}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1 items-start">
                          {patient.status === 'Needs Attention' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-400 font-semibold text-xs">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Needs Attention
                            </span>
                          )}
                          {patient.status === 'Normal' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Normal
                            </span>
                          )}
                          {patient.status === 'Pending' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              Pending
                            </span>
                          )}

                          {/* Red reason if Needs Attention */}
                          {patient.status === 'Needs Attention' && patient.flaggedReason && (
                            <p className="text-xs font-medium text-red-600 dark:text-red-400 mt-1 max-w-xs leading-tight">
                              {patient.flaggedReason}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Last Call */}
                      <td className="py-4 px-6 text-slate-700 dark:text-slate-300 text-xs">
                        <div className="font-medium">{patient.lastCallDate}</div>
                        {patient.history.length > 0 && (
                          <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                            {patient.history[0].day} ({patient.history[0].duration})
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/patient/${patient.id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-600 text-blue-700 dark:text-blue-300 hover:text-white border border-blue-200 dark:border-blue-500/30 text-xs font-semibold transition-all group-hover:shadow-xs"
                        >
                          View Details
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Stats */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>
              Showing {filteredPatients.length} of {MOCK_PATIENTS.length} total active post-op patients
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              EHR Sync Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
