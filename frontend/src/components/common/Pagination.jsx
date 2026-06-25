import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  const { page, pages } = pagination;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, page - delta); i <= Math.min(pages - 1, page + delta); i++) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift('...');
    if (page + delta < pages - 1) range.push('...');
    range.unshift(1);
    if (pages > 1) range.push(pages);
    return range;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-xl hover:bg-paper-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-2 border-transparent hover:border-ink-200"
      >
        <FiChevronLeft size={18} />
      </button>
      {getPageNumbers().map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-ink-400">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
              p === page
                ? 'bg-sketch-coral text-white border-sketch-coral shadow-sm'
                : 'text-ink-500 hover:bg-paper-100 border-ink-200'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="p-2 rounded-xl hover:bg-paper-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-2 border-transparent hover:border-ink-200"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
