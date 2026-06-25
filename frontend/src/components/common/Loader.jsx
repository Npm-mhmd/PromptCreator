export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizes[size]} border-2 border-ink-200 border-t-sketch-coral rounded-full animate-spin ${className}`} />
  );
};

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <Spinner size="lg" />
      <p className="mt-4 text-ink-400 text-sm font-sketch text-lg">Doodling...</p>
    </div>
  </div>
);

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-paper-200 rounded-xl ${className}`} />
);

export const CardSkeleton = () => (
  <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 space-y-3">
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
    <Skeleton className="h-20 w-full" />
    <div className="flex gap-2 pt-2">
      <Skeleton className="h-7 w-20 rounded-full" />
      <Skeleton className="h-7 w-20 rounded-full" />
    </div>
  </div>
);
