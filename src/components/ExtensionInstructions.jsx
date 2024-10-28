// ExtensionInstructions.js
import React from "react";

const ExtensionInstructions = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-124px)] mx-10 md:mx-0">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-4">
          Installing the Extension
        </h2>
        <p className="text-gray-700 mb-4">
          Follow these steps to load the PassHaven extension in your browser:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          <li>
            Download <strong>PassHaven.zip</strong> and extract its contents
          </li>
          <li>
            Open Chrome or your preferred browser and go to <strong>chrome://extensions</strong>.
          </li>
          <li>
            Enable <strong>Developer Mode</strong> (top-right corner).
          </li>
          <li>
            Click <strong>Load unpacked</strong> and select the extracted extension folder.
          </li>
          <li>
            If prompted, allow any necessary permissions to enable the extension.
          </li>
        </ol>
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 font-medium">
            Note: You might encounter warnings about developer extensions.
            Disabling these can vary by browser and may require caution.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/PassHavenWeb.zip"; // Path to file in public folder
              link.download = "PassHaven.zip"; // Name of the file for download
              link.click();
            }}
          >
            Download PassHaven.zip web extension
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionInstructions;
