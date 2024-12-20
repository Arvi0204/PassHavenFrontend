import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import passwordContext from "../context/passwordContext";
import Generator from "./Generator";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  let { setPasswordArray } = useContext(passwordContext);
  let navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = sessionStorage.getItem("token");

  const confirmLogout = async () => {
    await setPasswordArray([]);
    sessionStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!!!");
    setIsLogoutModalOpen(false);
  };

  const renderAuthLinks = (token) => {
    return token ? (
      <div className="flex gap-6 justify-center items-center">
        <Link
          to="/extension"
          className="relative flex items-center gap-2 group"
        >
          <lord-icon
            src="https://cdn.lordicon.com/xcrjfuzb.json"
            trigger="hover"
            state="hover-arrow-down-2"
            colors="primary:#ffffff"
            style={{ width: "25px", height: "25px" }}
          />
          <div className="absolute top-full right-0 mt-4 hidden group-hover:flex items-center justify-center w-max px-3 py-1 bg-gray-800 text-white text-md font-medium rounded-lg shadow-lg transition-transform transform-gpu scale-95 group-hover:scale-100">
            Download&nbsp;<span className="text-blue-500">&lt;</span>
            Pass
            <span className="text-blue-500">Haven/&gt;</span>&nbsp;extension
          </div>
        </Link>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="flex gap-3">
        <Link
          to="/login"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  const renderNavLinks = () => (
    <motion.li className="flex flex-col items-center md:flex-row gap-6">
      <Link className="flex gap-2 items-center hover:font-bold" to="/" onClick={() => setIsDropdownOpen(false)}>
        <lord-icon
          src="https://cdn.lordicon.com/fkaukecx.json"
          trigger="hover"
          style={{ width: "25px", height: "25px", filter: "invert(1)" }}
        />
        Passwords
      </Link>
      <div
        className="flex gap-2 items-center hover:font-bold cursor-pointer"
        onClick={() => {
          setIsDropdownOpen(false);
          setIsGeneratorModalOpen(true);
        }}
      >
        <lord-icon
          src="https://cdn.lordicon.com/qnpnzlkk.json"
          trigger="hover"
          style={{ width: "25px", height: "25px", filter: "invert(1)" }}
        />
        Generator
      </div>
      <Link to="/user" className="flex items-center gap-2" onClick={() => setIsDropdownOpen(false)}>
        <lord-icon
          src="https://cdn.lordicon.com/hrjifpbq.json"
          trigger="hover"
          style={{ width: "25px", height: "25px", filter: "invert(1)" }}
        />
        <span className="hover:font-bold">Account</span>
      </Link>
    </motion.li>
  );

  return (
    <>
      <nav className="bg-slate-800 text-white w-full sticky z-20 top-0 start-0 min-h-12 px-5">
        <div className={`max-w-screen-xl flex max-[400px]:flex-col max-[400px]:gap-3 flex-wrap items-center justify-between mx-auto py-2`}>
          <Link to="/home" className="logo font-bold text-2xl">
            <span className="text-blue-500">&lt;</span>
            Pass
            <span className="text-blue-500">Haven/&gt;</span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {renderAuthLinks(token)}
            {token && (
              <button
                data-collapse-toggle="navbar-sticky"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            )}
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="items-center justify-center flex-col w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                  {token ? renderNavLinks() : ""}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex md:w-auto md:order-1">
            <ul className="flex flex-row p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 md:mt-0 md:border-0">
              {token ? renderNavLinks() : ""}
            </ul>
          </div>
        </div>
      </nav>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to log out?"
        confirmText="Yes, I'm sure"
      />
      <Generator isOpen={isGeneratorModalOpen} setIsGeneratorModalOpen={setIsGeneratorModalOpen} />
    </>
  );
};

export default Navbar;