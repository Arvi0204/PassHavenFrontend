import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import passwordContext from "../context/passwordContext";
import Generator from "./Generator";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  let { setPasswordArray } = useContext(passwordContext);
  let navigate = useNavigate();

  // State to manage modal visibility
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");

  const confirmLogout = async () => {
    await setPasswordArray([]);
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!!!");
    setIsLogoutModalOpen(false);
  };

  const renderAuthLinks = (token) => {
    return token ? (
      <>
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
            onClick={() => {
              setIsLogoutModalOpen(true);
            }}
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            Logout
          </button>
        </div>
      </>
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
    <li className="flex flex-col md:flex-row gap-6">
      <Link className="flex gap-2 items-center hover:font-bold" to="/">
        <lord-icon
          src="https://cdn.lordicon.com/fkaukecx.json"
          trigger="hover"
          style={{ width: "25px", height: "25px", filter: "invert(1)" }}
        />
        Passwords
      </Link>
      <div
        className="flex gap-2 items-center hover:font-bold cursor-pointer"
        onClick={() => setIsGeneratorModalOpen(true)}
      >
        <lord-icon
          src="https://cdn.lordicon.com/qnpnzlkk.json"
          trigger="hover"
          style={{ width: "25px", height: "25px", filter: "invert(1)" }}
        />
        Generator
      </div>
      <Link to="/user" className="flex items-center gap-2">
        <lord-icon
          src="https://cdn.lordicon.com/hrjifpbq.json"
          trigger="hover"
          style={{ width: "25px", height: "25px", filter: "invert(1)" }}
        />
        <span className="hover:font-bold">Account</span>
      </Link>
    </li>
  );

  return (
    <>
      <nav className="bg-slate-800 text-white w-full sticky z-20 top-0 start-0 min-h-12 px-5">
        
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2">
          <Link to="/home" className="logo font-bold text-2xl">
            <span className="text-blue-500">&lt;</span>
            Pass
            <span className="text-blue-500">Haven/&gt;</span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {renderAuthLinks(token)}
            {token && 
            <button
              data-collapse-toggle="navbar-sticky"
              onClick={() => { setIsDropdownOpen(!isDropdownOpen) }
              }
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
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
            </button>}
          </div>

          <div
            className={`items-center ${isDropdownOpen ? 'flex' : 'hidden'} flex-col w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="p-4 md:p-0 mt-4 font-medium rounded-lg md:mt-0">
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

      {/* Generator Modal */}
      {isGeneratorModalOpen && (
        <div
          id="generatorModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-6 w-full max-w-2xl h-fit mx-auto">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full h-full p-8">
              <button
                type="button"
                className="text-gray-400 absolute top-3 right-3 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
                onClick={() => setIsGeneratorModalOpen(false)} // Close modal
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
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
              <Generator setIsGeneratorModalOpen={setIsGeneratorModalOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
