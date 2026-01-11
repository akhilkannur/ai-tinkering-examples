import React from 'react';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AgentOutputProps {
  logs: Array<{ type: string; message: string }>;
  result: string | null;
}

const AgentOutput: React.FC<AgentOutputProps> = ({ logs, result }) => {
  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 border-l border-gray-800">
      
      {/* Live Logs Section */}
      <div className="flex-grow overflow-y-auto p-4 font-mono text-sm space-y-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">
          Agent "Thought" Stream
        </div>
        
        {logs.length === 0 && !result && (
          <div className="text-gray-600 italic text-center mt-10">
            Ready to start.<br/>Click "Run Agent" to see the logic flow.
          </div>
        )}

        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2">
            <span className="text-indigo-400 shrink-0">➜</span>
            <span className={log.type === 'thinking' ? 'text-yellow-400' : 'text-gray-300'}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      {/* Final Output Preview */}
      <div className="h-1/3 bg-gray-800 border-t border-gray-700 p-4 flex flex-col">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-green-400"/> Final Output Preview
        </div>
        <div className="flex-grow bg-gray-900 rounded border border-gray-700 p-3 overflow-y-auto font-sans text-sm text-gray-300 whitespace-pre-wrap">
          {result || <span className="text-gray-600 italic">Output will appear here...</span>}
        </div>
      </div>
    </div>
  );
};

export default AgentOutput;
