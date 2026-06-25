import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompts } from '../hooks/usePrompts';
import PromptCard from '../components/prompts/PromptCard';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { CardSkeleton } from '../components/common/Loader';
import { SKILLS, PROMPT_TYPES } from '../data/constants';
import { FiSearch, FiFilter, FiSlash, FiX } from 'react-icons/fi';

const PromptLibrary = () => {
  const navigate = useNavigate();
  const { prompts, pagination, loading, fetchPrompts, remove, toggleFav } = usePrompts();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ skill: '', promptType: '', isFavorite: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);

  const loadPrompts = useCallback(async (page = 1) => {
    setError(null);
    try {
      const params = { page, limit: 12 };
      if (search.trim()) params.search = search.trim();
      if (filters.skill) params.skill = filters.skill;
      if (filters.promptType) params.promptType = filters.promptType;
      if (filters.isFavorite) params.isFavorite = filters.isFavorite;
      await fetchPrompts(params);
    } catch {
      setError('Failed to load prompts');
    }
  }, [search, filters, fetchPrompts]);

  useEffect(() => {
    const timer = setTimeout(() => loadPrompts(1), 300);
    return () => clearTimeout(timer);
  }, [search, filters, loadPrompts]);

  const handleToggleFavorite = async (id) => {
    await toggleFav(id);
  };

  const handleDelete = async (id) => {
    await remove(id);
  };

  const clearFilters = () => {
    setFilters({ skill: '', promptType: '', isFavorite: '' });
    setSearch('');
  };

  const hasActiveFilters = search || filters.skill || filters.promptType || filters.isFavorite;

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-sketch font-bold text-ink-800">My Prompts</h1>
        <p className="text-ink-400 mt-1">Browse, search, and manage your generated prompts</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            className="input-field pl-10"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center gap-2 ${showFilters ? 'border-sketch-coral text-sketch-coral' : ''}`}
        >
          <FiFilter size={16} />
          Filters
        </button>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn-ghost flex items-center gap-2 text-sketch-rose">
            <FiSlash size={16} />
            Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 bg-white border-2 border-ink-200 rounded-2xl animate-fade-in">
          <select
            value={filters.skill}
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
            className="select-field"
          >
            <option value="">All Skills</option>
            {SKILLS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <select
            value={filters.promptType}
            onChange={(e) => setFilters({ ...filters, promptType: e.target.value })}
            className="select-field"
          >
            <option value="">All Types</option>
            {PROMPT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <select
            value={filters.isFavorite}
            onChange={(e) => setFilters({ ...filters, isFavorite: e.target.value })}
            className="select-field"
          >
            <option value="">All Prompts</option>
            <option value="true">Favorites Only</option>
          </select>
        </div>
      )}

      {error ? (
        <ErrorState message={error} onRetry={() => loadPrompts(1)} />
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : prompts.length === 0 ? (
        <EmptyState
          icon={hasActiveFilters ? '🔍' : '📝'}
          title={hasActiveFilters ? 'No prompts found' : 'No prompts yet'}
          description={
            hasActiveFilters
              ? 'Try adjusting your search or filters'
              : 'Generate your first prompt to get started'
          }
          actionLabel={hasActiveFilters ? 'Clear Filters' : 'Generate Prompt'}
          onAction={hasActiveFilters ? clearFilters : undefined}
          actionLink={hasActiveFilters ? undefined : '/generate'}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt._id}
                prompt={prompt}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
                onClick={(id) => navigate(`/library/${id}`)}
              />
            ))}
          </div>
          <Pagination
            pagination={pagination}
            onPageChange={(page) => loadPrompts(page)}
          />
        </>
      )}
    </div>
  );
};

export default PromptLibrary;
