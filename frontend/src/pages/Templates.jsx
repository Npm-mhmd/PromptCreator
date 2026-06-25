import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../data/constants';
import { FiLayers, FiArrowRight } from 'react-icons/fi';

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-sketch font-bold text-ink-800">Prompt Templates</h1>
        <p className="text-ink-400 mt-1">
          Pre-configured templates to jumpstart your prompt generation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() =>
              navigate('/generate', {
                state: {
                  skill: template.skill,
                  level: template.level,
                  promptType: template.promptType,
                },
              })
            }
            className="bg-white border-2 border-ink-200 rounded-2xl p-5 text-left group hover:shadow-md transition-all duration-200 hover:border-ink-300"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} border-2 ${template.border} flex items-center justify-center text-xl mb-4`}
            >
              {template.icon}
            </div>
            <h3 className="font-sketch font-bold text-lg text-ink-800 group-hover:text-sketch-coral transition-colors">
              {template.title}
            </h3>
            <p className="text-sm text-ink-400 mt-1">{template.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="badge-ink">{template.skill}</span>
              <span className="badge-ink">{template.level}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-white border-2 border-ink-200 rounded-2xl p-6 text-center"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <div className="w-12 h-12 bg-sketch-coral/10 border-2 border-sketch-coral/20 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FiLayers size={24} className="text-sketch-coral" />
        </div>
        <h3 className="text-xl font-sketch font-bold text-ink-800 mb-2">Custom Template</h3>
        <p className="text-ink-400 mb-4 max-w-md mx-auto">
          Don't see what you need? Create a fully custom prompt from scratch
        </p>
        <button onClick={() => navigate('/generate')} className="btn-primary inline-flex items-center gap-2">
          Start from Scratch <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Templates;
