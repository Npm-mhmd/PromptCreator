import { useState } from 'react';
import { FiCopy, FiCheck, FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PromptResult = ({ prompt, onSave, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.generatedPrompt);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPrompt = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={i} className="text-sketch-coral font-sketch font-bold mt-5 mb-2 text-xl">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-ink-600 ml-5 list-disc marker:text-sketch-coral">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return (
        <p key={i} className="text-ink-600 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-ink-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border-2 border-ink-200 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-xl animate-slide-up"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="p-4 border-b-2 border-ink-100 flex items-center justify-between">
          <h3 className="text-lg font-sketch font-bold text-ink-800 flex items-center gap-2">
            <span>✨</span> Generated Prompt
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              {copied ? <FiCheck size={16} className="text-sketch-sage" /> : <FiCopy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            {onSave && (
              <button onClick={onSave} className="btn-primary flex items-center gap-2 text-sm px-4 py-1.5">
                <FiSave size={16} />
                Save
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-paper-100 rounded-xl transition-colors border-2 border-transparent hover:border-ink-200">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="mb-4 pb-4 border-b-2 border-ink-100">
            <div className="flex items-center gap-2 text-sm">
              <span className="badge-coral">{prompt.skill}</span>
              <span className="badge-ink">{prompt.promptType}</span>
              <span className="badge-ink">{prompt.level}</span>
            </div>
            {prompt.goal && (
              <p className="mt-2 text-sm text-ink-400">
                <span className="text-ink-600 font-medium">Goal:</span> {prompt.goal}
              </p>
            )}
          </div>
          <div className="prose max-w-none">
            {formatPrompt(prompt.generatedPrompt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptResult;
