import React from 'react';
import { PhoneCall, ShieldCheck, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">Aftercare</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm text-sm">
              Automated AI clinical voice check-ins post-hospital discharge. Reducing 30-day readmissions, protecting care teams, and preserving patient health.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>HIPAA Compliant &amp; SOC2 Type II Certified Voice Engine</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-3 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/app" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Clinical Dashboard</Link></li>
              <li><Link to="/demo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Call Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-3 text-xs uppercase tracking-wider">Clinical Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><HeartPulse className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> EHR Sync (Epic, Cerner)</li>
              <li>Structured Clinical Protocols</li>
              <li>Red-Flag Auto-Escalation Engine</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Aftercare Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">BAA Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
