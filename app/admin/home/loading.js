export default function AdminHomeLoading() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-pulse">
      <header className="mb-10">
        <div className="h-10 w-64 bg-gray-200 rounded-lg mb-2"></div>
        <div className="h-5 w-48 bg-gray-100 rounded-md"></div>
      </header>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-3 w-20 bg-gray-100 rounded"></div>
              <div className="h-12 w-16 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gray-50"></div>
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="h-6 w-40 bg-gray-200 rounded-md mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center space-y-4 p-8">
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div className="h-4 w-24 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
