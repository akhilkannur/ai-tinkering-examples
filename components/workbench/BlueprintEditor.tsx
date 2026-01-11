import React from 'react';

interface BlueprintEditorProps {
  content: string;
  onChange: (value: string) => void;
}

const BlueprintEditor: React.FC<BlueprintEditorProps> = ({ content, onChange }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-mono text-gray-500 uppercase tracking-wider flex justify-between">
        <span>blueprint.md (Editable)</span>
        <span className="text-indigo-600 font-semibold">System Instructions</span>
      </div>
      <textarea
        className="flex-grow w-full p-4 font-mono text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/10 leading-relaxed"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default BlueprintEditor;
