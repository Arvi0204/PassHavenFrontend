import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const CHARACTER_SETS = {
  letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  specialChars: "!@#$%^&*()_+[]{}|;:,.<>?",
};

const Generator = ({ isOpen, setIsGeneratorModalOpen }) => {
  const [settings, setSettings] = useState({
    length: 12,
    includeNumbers: false,
    includeSpecialChars: false,
  });

  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    let charset = CHARACTER_SETS.letters;
    const requiredChars = [];

    if (settings.includeNumbers) {
      charset += CHARACTER_SETS.numbers;
      requiredChars.push(randomChar(CHARACTER_SETS.numbers));
    }

    if (settings.includeSpecialChars) {
      charset += CHARACTER_SETS.specialChars;
      requiredChars.push(randomChar(CHARACTER_SETS.specialChars));
    }

    let password = Array.from({ length: settings.length - requiredChars.length }, () =>
      randomChar(charset)
    ).join("");
  
    requiredChars.forEach((char) => {
      const randomIndex = Math.floor(Math.random() * (password.length + 1));
      password =
        password.slice(0, randomIndex) + char + password.slice(randomIndex);
    });
    setGeneratedPassword(password);
  };

  const randomChar = (str) => str.charAt(Math.floor(Math.random() * str.length));

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setIsGeneratorModalOpen(false);
    }, 500);
  };

  useEffect(() => {
    if (settings.length > 0 || (settings.includeNumbers || settings.includeSpecialChars)) {
      generatePassword();
    }
  }, [settings]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsGeneratorModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
              Password Generator
            </h2>
            <div className="mb-5">
              <label
                htmlFor="password-length"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password Length: {settings.length}
              </label>
              <input
                type="range"
                id="password-length"
                min="1"
                max="40"
                value={settings.length}
                onChange={(e) => setSettings({ ...settings, length: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div className="mb-5">
              {[
                { id: "include-numbers", label: "Include Numbers", key: "includeNumbers" },
                { id: "include-special-chars", label: "Include Special Characters", key: "includeSpecialChars" },
              ].map(({ id, label, key }) => (
                <div className="flex items-center mb-4" key={id}>
                  <input
                    id={id}
                    type="checkbox"
                    checked={settings[key]}
                    onChange={() => setSettings({ ...settings, [key]: !settings[key] })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            {generatedPassword && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5"
              >
                <label
                  htmlFor="generated-password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Generated Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="generated-password"
                    value={generatedPassword}
                    readOnly
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-12"
                  />
                  <span
                    className="absolute right-2 top-1 cursor-pointer"
                    onClick={() => copyText(generatedPassword)}
                  >
                    <img src="icons/copy.gif" alt="Copy" width={32} />
                  </span>
                </div>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsGeneratorModalOpen(false)}
              className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Generator;