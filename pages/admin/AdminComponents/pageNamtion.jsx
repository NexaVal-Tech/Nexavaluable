import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

export default function Pagination({ totalPages = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // number of visible page buttons
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start < maxVisible - 1) {
      if (currentPage < totalPages / 2) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 text-sm font-medium ${
            i === currentPage
              ? "bg-white border border-gray-300 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {start > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="w-8 h-8 flex items-center justify-center rounded-md mx-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              1
            </button>
            {start > 2 && <span className="mx-1 text-gray-500">...</span>}
          </>
        )}
        {pages}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="mx-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded-md mx-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* Left side text */}
      <p className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </p>

      {/* Pagination controls */}
      <div className="flex items-center">
        {/* First */}
        <button
          onClick={() => goToPage(1)}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 mx-1"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* Prev */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 mx-1"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Page numbers */}
        {renderPageNumbers()}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 mx-1"
        >
          <ChevronRight size={14} />
        </button>

        {/* Last */}
        <button
          onClick={() => goToPage(totalPages)}
          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 mx-1"
        >
          <ChevronsRight size={14} />
        </button>
      </div>

      {/* Right side text (optional, like your screenshot) */}
      <p className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
