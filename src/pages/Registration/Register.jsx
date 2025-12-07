import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import NavLogo from "../../assets/logo.svg";
import { useAuth } from '../../contexts/AuthContext';
import RoleSelectionModal from '../../components/Modal/RoleSelectionModal';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const { signUp, signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in and has a role
    useEffect(() => {
        const justSignedUp = sessionStorage.getItem('justSignedUp');
        if (user && user.role && !justSignedUp) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    // Show role modal if user just signed up and doesn't have a role
    useEffect(() => {
        const justSignedUp = sessionStorage.getItem('justSignedUp');
        if (user && justSignedUp === 'true' && (!user.role || user.role === 'user') && !showRoleModal) {
            // Wait a bit for JWT to be created
            const timer = setTimeout(() => {
                setShowRoleModal(true);
                sessionStorage.removeItem('justSignedUp');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [user, showRoleModal]);

    const onSubmit = async (data) => {
        setLoading(true);
        // Set flag BEFORE calling signUp to prevent premature redirect from useEffect
        sessionStorage.setItem('justSignedUp', 'true');
        try {
            await signUp(data.email, data.password, data.name, data.photoURL);
            toast.success('Account created successfully!');
            
            // Wait a bit for auth state to update
            setTimeout(() => {
                setShowRoleModal(true);
            }, 500);
        } catch (error) {
            console.error('Registration error:', error);
            sessionStorage.removeItem('justSignedUp'); // Clear flag on error
            toast.error(error.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        // Set flag BEFORE calling signIn to prevent premature redirect from useEffect
        sessionStorage.setItem('justSignedUp', 'true');
        try {
            await signInWithGoogle();
            toast.success('Account created with Google successfully!');
            
            // Wait for auth state to update and check role
            setTimeout(() => {
                // The auth context will handle the role check
                // If no role, modal will show via useEffect
            }, 1000);
        } catch (error) {
            console.error('Google sign in error:', error);
            sessionStorage.removeItem('justSignedUp'); // Clear flag on error
            toast.error(error.message || 'Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleSelected = () => {
        setShowRoleModal(false);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8 font-urbanist">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-2">
                         <img src={NavLogo} alt="" className='h-[50px]'/>
                        <span className="text-3xl font-bold bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                            ContestArena
                        </span>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join the arena and start competing
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Full Name Input */}
                        {/* Full Name Input */}
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 text-black rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 outline-none transition-all focus:bg-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Image URL Input */}
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 text-black rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 outline-none transition-all focus:bg-white"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                            {errors.photoURL && <p className="mt-1 text-xs text-red-500">{errors.photoURL.message}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 text-black rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 outline-none transition-all focus:bg-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 text-black rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 outline-none transition-all focus:bg-white"
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
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#4a37d8] to-[#6928d9] hover:from-[#3b2db0] hover:to-[#5722b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Button */}
                     <div>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FcGoogle className="h-5 w-5" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[#4a37d8] hover:text-[#3b2db0] transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Role Selection Modal */}
            <RoleSelectionModal isOpen={showRoleModal} onClose={handleRoleSelected} />
        </div>
    );
};

export default Register;