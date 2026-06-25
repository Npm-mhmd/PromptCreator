import { Link } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';

const EmptyState = ({ icon = '📝', title, description, actionLabel, actionLink, onAction }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-sketch-in">
    <div className="w-20 h-20 bg-white border-2 border-ink-200 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-2xl font-sketch font-bold text-ink-800 mb-2">{title}</h3>
    <p className="text-ink-400 text-center max-w-md mb-6">{description}</p>
    {actionLabel && actionLink && (
      <Link to={actionLink} className="btn-primary flex items-center gap-2">
        <FiEdit3 size={16} />
        {actionLabel}
      </Link>
    )}
    {actionLabel && onAction && !actionLink && (
      <button onClick={onAction} className="btn-primary">
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
