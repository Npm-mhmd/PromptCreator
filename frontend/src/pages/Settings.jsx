import { useTheme } from '../context/ThemeContext';
import { FiCheck } from 'react-icons/fi';

const previewColors = {
  light: ['#e8635a', '#5a9fd4', '#7cb87e', '#d4a84b'],
  dark: ['#ff7e67', '#6bb5ff', '#7ddf8a', '#f0c85a'],
  green: ['#4a9e5a', '#4a8fc4', '#5aae6a', '#c4a44a'],
  blue: ['#5a8fcf', '#4a9fd4', '#5aae7e', '#c4a04a'],
};

const Settings = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="page-container max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] border-2 border-[var(--accent-border)] flex items-center justify-center">
          <span className="text-2xl">🎨</span>
        </div>
        <div>
          <h1 className="text-3xl font-sketch font-bold" style={{ color: 'var(--text-primary)' }}>
            Theme Settings
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Choose your preferred sketch style
          </p>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{themes[theme]?.emoji}</span>
          <h2 className="text-xl font-sketch font-bold" style={{ color: 'var(--text-primary)' }}>
            Current: {themes[theme]?.name}
          </h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {themes[theme]?.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(themes).map(([id, t]) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`theme-card ${theme === id ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{t.emoji}</span>
              {theme === id && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent)',
                    boxShadow: 'var(--shadow-accent)',
                  }}
                >
                  <FiCheck size={14} className="text-white" />
                </div>
              )}
            </div>
            <h3 className="font-sketch font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              {t.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {t.desc}
            </p>
            <div className="flex gap-1.5 justify-center mt-3">
              {previewColors[id].map((c, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2"
                  style={{
                    backgroundColor: c,
                    borderColor: 'var(--border-color)',
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      <div
        className="mt-8 rounded-2xl p-5"
        style={{
          backgroundColor: 'var(--accent-light)',
          border: '2px solid var(--accent-border)',
        }}
      >
        <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          <span className="font-sketch text-base">✏️ Tip:</span> Your theme preference is saved automatically.
          Try each theme to see which sketch style fits your workflow best!
        </p>
      </div>
    </div>
  );
};

export default Settings;
