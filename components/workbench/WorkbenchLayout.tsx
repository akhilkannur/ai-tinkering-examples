import React from 'react';
import Navbar from '../Navbar';
import { Play, Save, FileText, Database, LayoutTemplate } from 'lucide-react';

interface WorkbenchLayoutProps {
  children: React.ReactNode;
  title: string;
  onRun: () => void;
  isRunning: boolean;
}

const WorkbenchLayout: React.FC<WorkbenchLayoutProps> = ({ 
  children, 
  title, 
  onRun,
  isRunning
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      
      {/* Professional Header - Like VS Code / Cursor */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
               <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> blueprint.md</span>
               <span className="text-gray-300">|</span>
               <span className="flex items-center gap-1"><Database className="w-3 h-3"/> input.csv</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button 
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-bold text-white rounded-lg shadow-sm transition-all
              ${isRunning ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}
            `}
          >
            {isRunning ? (
              <>Running...</>
            ) : (
              <><Play className="w-4 h-4 fill-current" /> Run Agent</>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-grow flex overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default WorkbenchLayout;
