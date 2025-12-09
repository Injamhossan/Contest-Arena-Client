import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export const Loader1 = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative"
                >
                    <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <Trophy className="text-[#4a37d8]" size={32} />
                        </div>
                    </div>
                </motion.div>
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-600 font-medium"
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
};

export const Loader2 = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 rounded-full bg-linear-to-r from-[#4a37d8] to-[#6928d9]"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export const Loader3 = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                className="w-16 h-16 border-4 border-gray-200 border-t-[#4a37d8] border-r-[#6928d9] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export const Loader4 = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-20 h-20">
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#4a37d8] to-[#6928d9]"
                        style={{
                            top: '50%',
                            left: '50%',
                            x: '-50%',
                            y: '-50%'
                        }}
                        animate={{
                            x: [
                                'calc(-50% + 0px)',
                                `calc(-50% + ${Math.cos(i * Math.PI / 2) * 30}px)`,
                                'calc(-50% + 0px)'
                            ],
                            y: [
                                'calc(-50% + 0px)',
                                `calc(-50% + ${Math.sin(i * Math.PI / 2) * 30}px)`,
                                'calc(-50% + 0px)'
                            ],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.15
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export const Loader5 = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-12 bg-gradient-to-t from-[#4a37d8] to-[#6928d9] rounded-full"
                        animate={{
                            height: [12, 32, 12],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Main Loader Component (Default)
const Loader = () => {
    return <Loader1 />;
};

export default Loader;
