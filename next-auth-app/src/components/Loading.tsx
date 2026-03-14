export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4 bg-gray-900/80 px-8 py-6 rounded-xl border border-gray-800 shadow-xl">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-300 text-sm">Loading...</p>

      </div>
    </div>
  );
}