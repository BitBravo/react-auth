const LoadingSpinner = () => {
  return (
    <div className="absolute flex justify-center items-center h-full w-full flex-col top-0 left-0 bg-gray-100/60">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
      <div className="text-gray-600">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
