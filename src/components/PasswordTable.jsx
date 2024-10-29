import React, { useEffect, useContext, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import PasswordContext from "../context/passwordContext";
import toast from "react-hot-toast";
import formContext from "../context/formContext";
import { useNavigate } from "react-router-dom";

const PasswordTable = () => {
  const { passwordArray, getPasswords, deletePass } =
    useContext(PasswordContext);
  const { setForm } = useContext(formContext);

  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [visibleAccordion, setVisibleAccordion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getPasswords();
    }
  }, []);

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${type} to clipboard`);
  };

  const deletePassword = (id) => {
    deletePass(id);
    toast.success("Password deleted successfully");
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item._id === id);
    if (passwordToEdit) {
      setForm(passwordToEdit);
      deletePass(id);
      toast.loading("Editing password", { duration: 1500 });
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const toggleAccordionVisibility = (id) => {
    setVisibleAccordion((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // Function to clip the URL for display purposes, removing both http and https
  const getDisplayURL = (url) => {
    // Remove http:// or https://
    const strippedUrl = url.replace(/^(https?:\/\/)/, "");
    // Match up to the main domain (e.g., example.com)
    const match = strippedUrl.match(
      /^[^\/]+(\.com|\.in|\.org|\.net|\.edu|\.gov)/
    );
    return match ? match[0] : strippedUrl;
  };
  const renderPassword = (item, isPasswordVisible) => {
    return (
      <div className="flex justify-between items-center">
        <span className="flex-grow text-center">
          {isPasswordVisible ? item.password : "*".repeat(item.password.length)}
        </span>
        <div className="flex gap-2 items-center cursor-pointer mx-5">
          <img
            src="icons/copy.gif"
            alt="Copy password"
            width={32}
            onClick={() => copyText(item.password, "password")}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility(item._id)}
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="h-5 w-5 text-black" />
            ) : (
              <EyeIcon className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
      </div>
    );
  };
  const renderActionButton = () => {
    return (
      <div className="flex justify-center items-center gap-3">
        <button className="flex items-center gap-2 focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-1 transition ease-in-out duration-2000">
          Edit
          <img
            className="cursor-pointer"
            src="icons/edit.gif"
            alt="Edit password"
            width={28}
          />
        </button>
        <button
          className="flex items-center gap-2 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
          onClick={() => deletePassword(item._id)}
        >
          Delete
          <img
            className="cursor-pointer"
            src="icons/trash-bin.gif"
            alt="Delete password"
            width={28}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="md:container md:mx-auto md:px-40 px-20">
      <h1 className="text-blue-600 font-bold text-3xl underline text-center py-5">
        Your Passwords
      </h1>
      {passwordArray.length === 0 ? (
        <div className="flex justify-center text-xl font-bold my-10">
          Please add your first password
        </div>
      ) : (
        <>
          <table className="table-auto w-full overflow-hidden rounded-lg mx-auto hidden xl:table">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-2 px-4 border-2 border-black text-center">
                  URL
                </th>
                <th className="py-2 px-4 border-2 border-black text-center">
                  Username
                </th>
                <th className="py-2 px-4 border-2 border-black text-center">
                  Password
                </th>
                <th className="py-2 px-4 border-2 border-black text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-100">
              {passwordArray.map((item) => {
                const url =
                  item.url.startsWith("http://") ||
                  item.url.startsWith("https://")
                    ? item.url
                    : `https://${item.url}`;
                const isPasswordVisible = visiblePasswords[item._id];

                return (
                  <tr key={item._id}>
                    <td className="py-2 border-2 border-black text-center">
                      <div className="flex justify-center items-center">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {getDisplayURL(item.url)}
                        </a>
                      </div>
                    </td>
                    <td className="py-2 border-2 border-black text-center">
                      <div className="flex justify-between items-center">
                        <span className="flex-grow text-center">
                          {item.username}
                        </span>
                        <span
                          className="mx-5 cursor-pointer"
                          onClick={() => copyText(item.username, "username")}
                        >
                          <img
                            src="icons/copy.gif"
                            alt="Copy username"
                            width={32}
                          />
                        </span>
                      </div>
                    </td>
                    <td className="py-2 border-2 border-black text-center">
                      {renderPassword(item, isPasswordVisible)}
                    </td>
                    <td className="py-2 border-2 border-black text-center">
                      {renderActionButton()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mb-10" id="accordion">
            {passwordArray.map((item) => {
              const url =
                item.url.startsWith("http://") ||
                item.url.startsWith("https://")
                  ? item.url
                  : `https://${item.url}`;
              const isPasswordVisible = visiblePasswords[item._id];
              const isAccordionOpen = visibleAccordion[item._id];

              return (
                <div key={item._id} className="block xl:hidden overflow-hidden">
                  <h2 id={`accordion-collapse-heading-${item._id}`}>
                    <button
                      type="button"
                      onClick={() => toggleAccordionVisibility(item._id)}
                      className="flex items-center justify-between w-full p-5 font-semibold bg-blue-800 text-white underline hover:bg-blue-600 gap-3 transition duration-300 rounded-t-lg"
                      aria-expanded={isAccordionOpen}
                      aria-controls={`accordion-collapse-body-${item._id}`}
                    >
                      <span>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {getDisplayURL(item.url)}
                        </a>
                      </span>
                      <svg
                        className={`w-3 h-3 text-white transition-transform duration-300 ${
                          !isAccordionOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>

                  <div
                    id={`accordion-collapse-body-${item._id}`}
                    className={`transition-max-h duration-500 ease-in-out overflow-hidden ${
                      isAccordionOpen
                        ? "max-h-96 p-4 bg-blue-100 rounded-b-lg"
                        : "max-h-0"
                    }`}
                    aria-labelledby={`accordion-collapse-heading-${item._id}`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-blue-900 font-medium text-sm">
                        <span className="text-black tracking-wide truncate overflow-hidden whitespace-nowrap">
                          {item.username}
                        </span>
                        <img
                          className="cursor-pointer mx-4"
                          src="icons/copy.gif"
                          alt="Copy username"
                          width={28}
                          onClick={() => copyText(item.username, "username")}
                        />
                      </div>
                      {renderPassword(item,isPasswordVisible)}
                      {renderActionButton()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordTable;
