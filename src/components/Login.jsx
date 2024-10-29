import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://pass-haven-backend.vercel.app/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();

            if (json.success) {
                sessionStorage.setItem('token', json.authToken);
                navigate("/");
                toast.success("Logged in successfully");
            } else {
                json.errors.forEach(error => {
                    toast.error(error.msg)
                });
            }
        } catch (error) {
            toast.error("An error occurred, please try again.");
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-124px)]">
            <div className="bg-white rounded-lg shadow-md mx-10 p-8 w-full max-w-lg ">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                    Login to your account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700 mb-2 sm:text-sm">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter Email address"
                            value={credentials.email}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700 mb-2 sm:text-sm">
                            Master Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter Master Password"
                                value={credentials.password}
                                onChange={onChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className='mt-3 flex'>
                    <Link
                        to="/signup"
                        className="mt-5 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 text-center"
                    >
                        Don't have an account? <span className='block underline font-bold'>Sign Up now</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
