import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import NavLogo from "../../assets/logo.svg";
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

import RoleSelectionModal from '../../components/Modal/RoleSelectionModal';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const { signIn, signInWithGoogle, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // already logged in থাকলে সরাসরি dashboard
    useEffect(() => {
        if (!authLoading && user) {
            console.log('User logged in, navigating to dashboard');
            navigate('/dashboard');
        }
    }, [user, authLoading, navigate]);

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            console.log('Attempting to sign in with email:', data.email);
            const firebaseUser = await signIn(data.email, data.password);
            console.log('Firebase sign in successful:', firebaseUser);

            toast.success('Signed in successfully!');
            // navigate('/dashboard'); // ✅ REMOVED: Let useEffect handle it to ensure state is ready
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleBtnClick = () => {
        setShowRoleModal(true);
    };

    const handleGoogleSignInWithRole = async (selectedRole) => {
        setSubmitting(true);
        // Set desire role in session storage (handled by AuthContext for new users)
        sessionStorage.setItem('signup_role', selectedRole);
        
        try {
            const firebaseUser = await signInWithGoogle();
            toast.success('Signed in with Google successfully!');
        } catch (error) {
            console.error('Google sign in error:', error);
            sessionStorage.removeItem('signup_role');
            
            if (error.code === 'auth/popup-closed-by-user') {
                return;
            } else if (error.code === 'auth/popup-blocked') {
                toast.error('Popup was blocked. Please allow popups for this site.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                return;
            } else {
                toast.error(error.message || 'Failed to sign in with Google.');
            }
        } finally {
            setSubmitting(false);
        }
    };
    
    // Original handleGoogleSignIn removed/replaced logic above in handleGoogleSignInWithRole

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
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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
                                    {...register("password", { required: "Password is required" })}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-800 outline-none transition-all focus:bg-white dark:focus:bg-gray-900"
                                    placeholder="Password"
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
                            disabled={submitting || authLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-linear-to-r from-[#4a37d8] to-[#6928d9] hover:from-[#3b2db0] hover:to-[#5722b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {(submitting || authLoading) ? 'Signing in...' : 'Sign In'}
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
                            onClick={handleGoogleBtnClick}
                            disabled={submitting || authLoading}
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
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-[#4a37d8] hover:text-[#3b2db0] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Role Selection Modal */}
            <RoleSelectionModal 
                isOpen={showRoleModal} 
                onClose={() => setShowRoleModal(false)}
                onRoleSelect={handleGoogleSignInWithRole}
            />
        </div>
    );
};

export default Login;
