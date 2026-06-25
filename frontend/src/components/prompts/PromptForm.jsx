import { useForm } from 'react-hook-form';
import { SKILLS, LEVELS, PROMPT_TYPES, OUTPUT_LENGTHS } from '../../data/constants';
import { FiSend, FiLoader, FiEdit3 } from 'react-icons/fi';

const PromptForm = ({ onSubmit, generating }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      originalIdea: '',
      goal: '',
      context: '',
      skill: '',
      level: '',
      promptType: '',
      outputLength: 'Medium',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
          Your Idea <span className="text-sketch-coral">*</span>
        </label>
        <textarea
          {...register('originalIdea', { required: 'Please enter your idea' })}
          placeholder="e.g., Create a portfolio website..."
          className="textarea-field"
          rows={3}
        />
        {errors.originalIdea && (
          <p className="mt-1 text-sm text-sketch-rose">{errors.originalIdea.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
          Goal <span className="text-ink-300">(optional)</span>
        </label>
        <input
          {...register('goal')}
          placeholder="e.g., Showcase my projects and get hired..."
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
          Context <span className="text-ink-300">(optional)</span>
        </label>
        <textarea
          {...register('context')}
          placeholder="e.g., I'm a frontend developer with 3 years of experience..."
          className="textarea-field"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
            Skill <span className="text-sketch-coral">*</span>
          </label>
          <select
            {...register('skill', { required: 'Select a skill' })}
            className="select-field"
          >
            <option value="">Select skill...</option>
            {SKILLS.map((s) => (
              <option key={s.value} value={s.value}>{s.icon} {s.label}</option>
            ))}
          </select>
          {errors.skill && (
            <p className="mt-1 text-sm text-sketch-rose">{errors.skill.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
            Level <span className="text-sketch-coral">*</span>
          </label>
          <select
            {...register('level', { required: 'Select a level' })}
            className="select-field"
          >
            <option value="">Select level...</option>
            {LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-sketch-rose">{errors.level.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
            Prompt Type <span className="text-sketch-coral">*</span>
          </label>
          <select
            {...register('promptType', { required: 'Select prompt type' })}
            className="select-field"
          >
            <option value="">Select type...</option>
            {PROMPT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
            ))}
          </select>
          {errors.promptType && (
            <p className="mt-1 text-sm text-sketch-rose">{errors.promptType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2 font-sketch text-base">
            Output Length
          </label>
          <select {...register('outputLength')} className="select-field">
            {OUTPUT_LENGTHS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={generating}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base"
      >
        {generating ? (
          <>
            <FiLoader className="animate-spin" size={18} />
            Sketching...
          </>
        ) : (
          <>
            <FiEdit3 size={18} />
            Generate Prompt
          </>
        )}
      </button>
    </form>
  );
};

export default PromptForm;
