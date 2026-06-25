import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPromptById, deletePrompt, toggleFavorite } from '../services/promptService';
import { FiArrowLeft, FiHeart, FiCopy, FiTrash2, FiCheck } from 'react-icons/fi';
import { PageLoader } from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import toast from 'react-hot-toast';

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const data = await getPromptById(id);
        setPrompt(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Prompt not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPrompt();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.generatedPrompt);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFavorite = async () => {
    const updated = await toggleFavorite(id);
    if (updated) setPrompt(updated);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this prompt?')) return;
    const success = await deletePrompt(id);
    if (success) {
      toast.success('Prompt deleted');
      navigate('/library');
    }
  };

  const formatPrompt = (text) => {
    return text?.split('\n').map((line, i) => {
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
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-ink-600 leading-relaxed">{line}</p>;
    });
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  if (!prompt) return <ErrorState message="Prompt not found" />;

  return (
    <div className="page-container max-w-4xl">
      <button
        onClick={() => navigate('/library')}
        className="flex items-center gap-2 text-ink-400 hover:text-ink-700 transition-colors mb-6 btn-ghost"
      >
        <FiArrowLeft size={18} />
        Back to Library
      </button>

      <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 mb-6"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-sketch font-bold text-ink-800">{prompt.title}</h1>
            <p className="text-sm text-ink-400 mt-1">
              Created {new Date(prompt.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-xl transition-colors border-2 ${
                prompt.isFavorite
                  ? 'text-sketch-rose bg-sketch-rose/5 border-sketch-rose/20'
                  : 'text-ink-300 hover:text-sketch-rose hover:bg-sketch-rose/5 border-transparent hover:border-sketch-rose/20'
              }`}
            >
              <FiHeart size={18} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-ink-400 hover:text-sketch-coral hover:bg-paper-100 transition-colors border-2 border-transparent hover:border-sketch-coral/20"
            >
              {copied ? <FiCheck size={18} className="text-sketch-sage" /> : <FiCopy size={18} />}
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-ink-400 hover:text-sketch-rose hover:bg-paper-100 transition-colors border-2 border-transparent hover:border-sketch-rose/20"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="badge-coral">{prompt.skill}</span>
          <span className="badge-ink">{prompt.promptType}</span>
          <span className="badge-ink">{prompt.level}</span>
          <span className="badge-ink">{prompt.outputLength}</span>
        </div>

        <div className="bg-paper-100 border-2 border-ink-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-ink-500 font-medium mb-1">Original Idea:</p>
          <p className="text-ink-700">{prompt.originalIdea}</p>
        </div>

        {prompt.goal && (
          <div className="bg-paper-100 border-2 border-ink-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-ink-500 font-medium mb-1">Goal:</p>
            <p className="text-ink-700">{prompt.goal}</p>
          </div>
        )}
      </div>

      <div className="bg-white border-2 border-ink-200 rounded-2xl p-6"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-xl font-sketch font-bold text-ink-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-sketch-coral rounded-full inline-block" />
          Generated Prompt
        </h2>
        <div className="prose max-w-none">
          {formatPrompt(prompt.generatedPrompt)}
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
