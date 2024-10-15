export default function Spinner() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="animate-spin inline-block w-7 h-7 border-[3px] border-current border-t-transparent text-orange-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  