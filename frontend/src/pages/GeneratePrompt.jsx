import { useState } from 'react';
import { usePrompts } from '../hooks/usePrompts';
import PromptForm from '../components/prompts/PromptForm';
import PromptResult from '../components/prompts/PromptResult';
import { FiEdit3, FiInfo } from 'react-icons/fi';

const GeneratePrompt = () => {
  const { generate, generating } = usePrompts();
  const [generatedPrompt, setGeneratedPrompt] = useState(null);

  const handleGenerate = async (data) => {
    const result = await generate(data);
    if (result) {
      setGeneratedPrompt(result);
    }
  };

  const handleSave = async () => {
    setGeneratedPrompt(null);
  };

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white border-2 border-ink-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <FiEdit3 size={28} className="text-sketch-coral" />
          </div>
          <h1 className="text-3xl font-sketch font-bold text-ink-800">Generate a Prompt</h1>
          <p className="text-ink-400 mt-2 max-w-lg mx-auto">
            Describe your idea, set your preferences, and let AI craft the perfect prompt
          </p>
        </div>

        <div className="bg-gradient-to-br from-sketch-coral/5 to-sketch-peach/5 border-2 border-sketch-coral/15 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <FiInfo size={18} className="text-sketch-coral shrink-0 mt-0.5" />
          <p className="text-sm text-ink-500">
            For best results, provide a clear idea and relevant context. The AI will structure your prompt professionally with role definition, objectives, constraints, and output format.
          </p>
        </div>

        <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 shadow-sm"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <PromptForm onSubmit={handleGenerate} generating={generating} />
        </div>

        {generatedPrompt && (
          <PromptResult
            prompt={generatedPrompt}
            onSave={handleSave}
            onClose={() => setGeneratedPrompt(null)}
          />
        )}
      </div>
    </div>
  );
};

export default GeneratePrompt;
