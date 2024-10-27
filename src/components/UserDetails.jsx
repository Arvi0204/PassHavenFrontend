import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

export default function UserDetails() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        createdAt: "",
        lastLogin: ""
    });
    const host = "https://pass-haven-backend.vercel.app"
    const [updatedPassword, setUpdatedPassword] = useState({ newPassword: "", confirmNewPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [modalState, setModalState] = useState({ isOpen: false, message: "", action: null });
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchUserDetails();
        }
    }, [token]);
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            toast.error("Failed to fetch user details");
        }
    };
    const onChange = (e) => {
        setUpdatedPassword({ ...updatedPassword, [e.target.name]: e.target.value })
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (updatedPassword.newPassword !== updatedPassword.confirmNewPassword) {
            setPasswordError("Passwords don't match");
            return;
        } else {
            setPasswordError('');
        }
        try {
            const response = await fetch(`${host}/api/auth/changepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ newPassword: updatedPassword.newPassword })
            });

            const json = await response.json();
            if (json.success) {
                toast.success(json.message);
                setUpdatedPassword({ newPassword: "", confirmNewPassword: "" });
                localStorage.removeItem('token');
                navigate("/login")
            } else {
                json.errors.forEach(error => {
                    toast.error(error.msg);
                });
            }
        } catch (error) {
            toast.error("An error occurred, please try again later.");
        }
    };


    const openConfirmModal = (actionType) => {
        if (actionType === 'passwords') {
            setModalState({
                isOpen: true,
                message: (
                    <>
                        Are you sure you want to delete all your passwords? <br /> They can NOT be recovered
                    </>
                ),
                action: deleteAllPasswords
            });
        } else if (actionType === 'account') {
            setModalState({
                isOpen: true,
                message: (
                    <>
                        Are you sure you want to delete your account? <br /> It can NOT be recovered
                    </>
                ),
                action: deleteAccount
            });
        }
    };

    const deleteAllPasswords = async () => {
        try {
            const response = await fetch(`${host}/api/passwords/deleteallpass`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json()

            if (json.success) {
                toast.success(json.message);
                setModalState({ ...modalState, isOpen: false });
                navigate("/")
            }
        } catch (error) {
            setModalState({ ...modalState, isOpen: false });
            toast.error("An error occurred, please try again later.");
        }
    };

    const deleteAccount = async () => {
        try {
            const response = await fetch(`${host}/api/auth/deleteuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json()

            if (json.success) {
                toast.success(json.message);
                localStorage.removeItem('token');
                setModalState({ ...modalState, isOpen: false });
                navigate("/home")
            }
        } catch (error) {
            setModalState({ ...modalState, isOpen: false });
            toast.error("An error occurred, please try again later.");
        }
    };


    return (
        <>
            <h2 className='text-center text-3xl font-bold mt-20'>Welcome, {user.username}</h2>
            <div className="flex items-center justify-center p-4 m-10 space-x-20">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl"> {/* User Info Card */}
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">User Info</h2>
                    <div className="space-y-4 mb-6">
                        <div>
                            <span className="mb-3 block text-sm font-medium text-gray-700">Username</span>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {user.username}
                            </p>
                        </div>
                        <div>
                            <span className="mb-3 block text-sm font-medium text-gray-700">Email</span>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {user.email}
                            </p>
                        </div>
                        <div>
                            <span className="mb-3 block text-sm font-medium text-gray-700">Account Created</span>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="mb-3 block text-sm font-medium text-gray-700">Last Login</span>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {new Date(user.lastLogin).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <h4 className='m-10 text-center font-bold text-xl'>Do you want to update Master Password?</h4>
                            <div className="mt-1 relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder='Enter New Master Password'
                                    required
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={updatedPassword.newPassword}
                                    onChange={onChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            <div className="mt-5 relative">
                                <input
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder='Confirm New Master Password'
                                    required
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={updatedPassword.confirmNewPassword}
                                    onChange={onChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>
                        {passwordError && <p className="font-bold text-red-500 text-sm">{passwordError}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Update Master Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Danger Zone Section */}
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg"> {/* Danger Zone Card */}
                    <h2 className="text-center text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
                    <p className="text-center text-gray-600 mb-6">Please proceed with caution. These actions are <strong>irreversible</strong>.</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => openConfirmModal('passwords')}
                            className="font-bold w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Delete All Passwords
                        </button>
                        <button
                            onClick={() => openConfirmModal('account')}
                            className="font-bold w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onConfirm={modalState.action}
                message={modalState.message}
                confirmText="Yes, I'm sure"
            />
        </>
    );

}