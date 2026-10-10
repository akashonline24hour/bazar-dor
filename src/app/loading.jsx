export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F0F2F0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Button Skeleton */}
        <div className="h-10 w-36 bg-gray-200 animate-pulse rounded-2xl"></div>

        {/* Header Banner Skeleton */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 animate-pulse rounded-3xl"></div>
            <div className="space-y-2">
              <div className="h-7 w-48 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
          <div className="h-12 w-44 bg-gray-200 animate-pulse rounded-2xl hidden md:block"></div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl p-4 border border-gray-100 space-y-4"
            >
              <div className="h-40 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
