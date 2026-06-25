import { useState } from 'react';
import { FiHeart, FiCopy, FiTrash2, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { SKILLS } from '../../data/constants';

const PromptCard = ({ prompt, onToggleFavorite, onDelete, onClick }) => {
  const [deleting, setDeleting] = useState(false);

  const skillInfo = SKILLS.find((s) => s.value === prompt.skill);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.generatedPrompt);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this prompt?')) return;
    setDeleting(true);
    await onDelete?.(prompt._id);
    setDeleting(false);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(prompt._id);
  };

  const date = new Date(prompt.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => onClick?.(prompt._id)}
      className="bg-white border-2 border-ink-200 rounded-2xl p-5 hover:border-ink-300 cursor-pointer group relative animate-sketch-in transition-all duration-200 hover:shadow-md"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-sketch font-bold text-lg text-ink-800 truncate pr-2">{prompt.title}</h3>
          <p className="text-xs text-ink-400 mt-0.5">{date}</p>
        </div>
        <button
          onClick={handleFavorite}
          className={`p-1.5 rounded-xl transition-colors shrink-0 border-2 ${
            prompt.isFavorite
              ? 'text-sketch-rose bg-sketch-rose/5 border-sketch-rose/20'
              : 'text-ink-300 hover:text-sketch-rose hover:bg-sketch-rose/5 border-transparent hover:border-sketch-rose/20 opacity-0 group-hover:opacity-100'
          }`}
        >
          <FiHeart size={16} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="text-sm text-ink-500 line-clamp-3 mb-4 leading-relaxed">
        {prompt.generatedPrompt}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {skillInfo && (
          <span className={`badge ${skillInfo.color} bg-opacity-10 border-current/20`}
            style={{ backgroundColor: 'transparent' }}
          >
            {skillInfo.icon} {prompt.skill}
          </span>
        )}
        <span className="badge-ink">{prompt.promptType}</span>
        <span className="badge-ink">{prompt.level}</span>
      </div>

      <div className="absolute top-3 right-12 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 text-ink-400 hover:text-sketch-coral hover:bg-paper-100 rounded-xl transition-colors border-2 border-transparent hover:border-sketch-coral/20"
          title="Copy"
        >
          <FiCopy size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(prompt._id);
          }}
          className="p-1.5 text-ink-400 hover:text-sketch-sky hover:bg-paper-100 rounded-xl transition-colors border-2 border-transparent hover:border-sketch-sky/20"
          title="View"
        >
          <FiExternalLink size={14} />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-1.5 text-ink-400 hover:text-sketch-rose hover:bg-paper-100 rounded-xl transition-colors border-2 border-transparent hover:border-sketch-rose/20 disabled:opacity-50"
          title="Delete"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
