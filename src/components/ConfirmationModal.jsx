import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, confirmText }) => {
  if (!isOpen) return null;

  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-xl h-auto"> {/* Increased min height */}
        <div className="relative p-6 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-7">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"  // Slightly larger icon size
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <p className="mb-4 text-xl text-gray-500 dark:text-gray-300">{message}</p> {/* Larger text */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="py-2 px-4 text-base font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              onClick={onConfirm}
              type="button"
              className="py-2 px-4 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
