import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../services/promptService';
import { FiZap, FiHeart, FiBookmark, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { PageLoader } from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white border-2 border-ink-200 rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 hover:shadow-md hover:border-ink-300"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-xl border-2 border-current/10`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-ink-800 font-sketch">{value}</p>
      <p className="text-sm text-ink-400">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-sketch font-bold text-ink-800">
          {getGreeting()}, {user?.name?.split(' ')[0]} <span className="inline-block animate-wiggle">👋</span>
        </h1>
        <p className="text-ink-400 mt-1">Here's your prompt creation overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={FiZap}
          label="Total Prompts"
          value={stats?.totalPrompts || 0}
          color="bg-sketch-coral/10 text-sketch-coral"
        />
        <StatCard
          icon={FiHeart}
          label="Favorites"
          value={stats?.favoritePrompts || 0}
          color="bg-sketch-rose/10 text-sketch-rose"
        />
        <StatCard
          icon={FiBookmark}
          label="Saved"
          value={stats?.totalPrompts || 0}
          color="bg-sketch-sage/10 text-sketch-sage"
        />
        <StatCard
          icon={FiTrendingUp}
          label="This Month"
          value={stats?.totalPrompts || 0}
          color="bg-sketch-gold/10 text-[var(--accent-gold)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-ink-200 rounded-2xl p-6"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <h2 className="text-xl font-sketch font-bold text-ink-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-sketch-coral rounded-full inline-block" />
            Recent Prompts
          </h2>
          {stats?.recentPrompts?.length > 0 ? (
            <div className="space-y-2">
              {stats.recentPrompts.map((prompt) => (
                <Link
                  key={prompt._id}
                  to="/library"
                  className="block p-3 rounded-xl hover:bg-paper-100 transition-colors border-2 border-transparent hover:border-ink-200"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-ink-700 truncate">{prompt.title}</p>
                    <span className="text-xs text-ink-400 shrink-0 ml-2">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-1.5">
                    <span className="badge-ink text-xs">{prompt.skill}</span>
                    <span className="badge-ink text-xs">{prompt.promptType}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-ink-400 mb-3 font-sketch text-lg">No prompts yet</p>
              <Link to="/generate" className="btn-primary text-sm inline-flex items-center gap-1">
                Create Your First Prompt <FiArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-ink-200 rounded-2xl p-6"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          <h2 className="text-xl font-sketch font-bold text-ink-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-sketch-sky rounded-full inline-block" />
            Skill Distribution
          </h2>
          {stats?.skillDistribution?.length > 0 ? (
            <div className="space-y-4">
              {stats.skillDistribution.map((skill) => (
                <div key={skill._id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-ink-600">{skill._id}</span>
                    <span className="text-ink-400">{skill.count}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${(skill.count / stats.totalPrompts) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-ink-400 font-sketch text-lg">No data yet</p>
              <p className="text-xs text-ink-300 mt-1">Generate prompts to see your skill distribution</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-sketch-coral/5 to-sketch-peach/5 border-2 border-sketch-coral/15"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-sketch font-bold text-ink-800">Ready to create a new prompt?</h3>
            <p className="text-sm text-ink-400 mt-1">Turn your ideas into professional AI prompts in seconds</p>
          </div>
          <Link to="/generate" className="btn-primary flex items-center gap-2">
            Generate Now <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
