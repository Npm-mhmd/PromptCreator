const ErrorState = ({ message = 'Something went wrong', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 animate-sketch-in">
    <div className="w-16 h-16 bg-sketch-rose/10 border-2 border-sketch-rose/20 rounded-2xl flex items-center justify-center mb-4">
      <span className="text-2xl">✏️</span>
    </div>
    <h3 className="text-xl font-sketch font-bold text-ink-800 mb-2">Oops!</h3>
    <p className="text-ink-400 text-center max-w-md mb-6">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary">
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
