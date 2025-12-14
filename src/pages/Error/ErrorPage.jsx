import React from 'react';
import { Link, useRouteError, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, RefreshCcw, AlertOctagon } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 font-urbanist transition-colors duration-300">
            <div className="max-w-2xl w-full text-center">
                
                {/* 404 Visual / Animation */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative mb-8 flex justify-center"
                >
                    <div className="relative text-9xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#4a37d8] to-[#6928d9] dark:from-[#6b5ae0] dark:to-[#8b5cf6] select-none">
                        404
                        <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white dark:text-black mix-blend-overlay text-lg font-bold tracking-[1em]"
                        >
                            ERROR
                        </motion.div>
                    </div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4 mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {error?.statusText || error?.message || "Oops! Page Not Found"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                         The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    {error?.data && (
                         <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-lg inline-block">
                            {error.data}
                         </div>
                    )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="btn bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <Link
                        to="/"
                        className="btn bg-linear-to-r from-[#4a37d8] to-[#6928d9] hover:from-[#3b2db8] hover:to-[#5821b5] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#4a37d8]/30 flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>

                     <button
                        onClick={() => window.location.reload()}
                        className="btn bg-transparent dark:text-gray-400 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 px-4 py-3 rounded-xl font-medium flex items-center gap-2 transition-all sm:hidden"
                    >
                        <RefreshCcw size={18} />
                        Refresh Page
                    </button>
                </motion.div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                     <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4a37d8]/10 dark:bg-[#4a37d8]/20 rounded-full blur-3xl"></div>
                     <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6928d9]/10 dark:bg-[#6928d9]/20 rounded-full blur-3xl"></div>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;