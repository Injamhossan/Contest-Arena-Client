import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Briefcase, UserCircle } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import NavLogo from "../../assets/logo.svg";
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp, signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if connected
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        // Store role in sessionStorage for AuthContext to pick up
        sessionStorage.setItem('signup_role', data.role);
        
        try {
            await signUp(data.email, data.password, data.name, data.photoURL);
            toast.success('Account created successfully!');
            // Navigation handled by useEffect when user state updates
        } catch (error) {
            console.error('Registration error:', error);
            sessionStorage.removeItem('signup_role');
            toast.error(error.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        // Default Google Sign in to 'user' role or let them update it later in profile if needed
        // Attempting to set 'user' explicitily, or prompt via modal could be kept for Google only?
        // For now, let's default Google users to 'user' to keep it simple as requested for the form flow
        sessionStorage.setItem('signup_role', 'user'); 
        
        try {
            await signInWithGoogle();
            toast.success('Account created with Google successfully!');
        } catch (error) {
            console.error('Google sign in error:', error);
            sessionStorage.removeItem('signup_role');
            toast.error(error.message || 'Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] dark:bg-black py-12 px-4 sm:px-6 lg:px-8 font-urbanist transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl dark:border dark:border-gray-800">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-2">
                         <img src={NavLogo} alt="" className='h-[50px]'/>
                        <span className="text-3xl font-bold bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                            ContestArena
                        </span>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join the arena and start competing
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Full Name Input */}
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "Full Name is required" })}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-800 outline-none transition-all focus:bg-white dark:focus:bg-gray-900"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Image URL Input */}
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Image URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="photoURL"
                                    type="url"
                                    {...register("photoURL", { required: "Image URL is required" })}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-800 outline-none transition-all focus:bg-white dark:focus:bg-gray-900"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                            {errors.photoURL && <p className="mt-1 text-xs text-red-500">{errors.photoURL.message}</p>}
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                I want to join as
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        value="user"
                                        {...register("role", { required: "Please select a role" })}
                                        className="peer sr-only"
                                        defaultChecked
                                    />
                                    <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-[#4a37d8] peer-checked:ring-2 peer-checked:ring-[#4a37d8] peer-checked:ring-offset-2 transition-all text-center">
                                        <div className="mx-auto mb-2 w-8 h-8 text-gray-400 peer-checked:text-[#4a37d8]">
                                            <UserCircle size={32} />
                                        </div>
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">Participant</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        value="creator"
                                        {...register("role", { required: "Please select a role" })}
                                        className="peer sr-only"
                                    />
                                    <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 peer-checked:border-[#4a37d8] peer-checked:ring-2 peer-checked:ring-[#4a37d8] peer-checked:ring-offset-2 transition-all text-center">
                                         <div className="mx-auto mb-2 w-8 h-8 text-gray-400 peer-checked:text-[#4a37d8]">
                                            <Briefcase size={32} />
                                        </div>
                                        <span className="block text-sm font-medium text-gray-900 dark:text-white">Contest Creator</span>
                                    </div>
                                </label>
                            </div>
                             {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-800 outline-none transition-all focus:bg-white dark:focus:bg-gray-900"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { 
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-800 outline-none transition-all focus:bg-white dark:focus:bg-gray-900"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-linear-to-r from-[#4a37d8] to-[#6928d9] hover:from-[#3b2db0] hover:to-[#5722b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                     {/* Google Button */}
                     <div>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FcGoogle className="h-5 w-5" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[#4a37d8] hover:text-[#3b2db0] transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;