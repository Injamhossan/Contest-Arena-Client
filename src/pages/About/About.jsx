import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, Target, Heart, Zap, Shield, Globe } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: Trophy,
            title: 'Competitive Excellence',
            description: 'Join thousands of creators competing in exciting challenges',
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        },
        {
            icon: Users,
            title: 'Global Community',
            description: 'Connect with creators from around the world',
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            icon: Award,
            title: 'Fair Judging',
            description: 'Transparent and fair evaluation process',
            color: 'text-green-500',
            bg: 'bg-green-50'
        },
        {
            icon: Target,
            title: 'Skill Development',
            description: 'Improve your skills through regular competitions',
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        },
        {
            icon: Heart,
            title: 'Passion Driven',
            description: 'Built by creators, for creators',
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            icon: Zap,
            title: 'Quick Results',
            description: 'Fast turnaround times for contest results',
            color: 'text-yellow-500',
            bg: 'bg-yellow-50'
        }
    ];

    const stats = [
        { label: 'Active Contests', value: '500+', icon: Trophy },
        { label: 'Participants', value: '10K+', icon: Users },
        { label: 'Countries', value: '50+', icon: Globe },
        { label: 'Prizes Awarded', value: '$1M+', icon: Award }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-black dark:via-gray-900 dark:to-slate-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 font-urbanist"
                        >
                            <span className="text-gray-900 dark:text-white">About </span>
                            <span className="bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] bg-clip-text text-transparent">
                                Contest Arena
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            We are the ultimate platform for creative competitions. Join thousands of creators 
                            in design, photography, writing, and more. Build your portfolio and win amazing prizes.
                        </motion.p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-center hover:shadow-md transition-all"
                            >
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-xl bg-linear-to-br from-[#4a37d8] to-[#6928d9] text-white">
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 right-[-10%] w-[400px] h-[400px] bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 left-[-10%] w-[400px] h-[400px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[100px]" />
                </div>
                
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-urbanist">
                            <span className="text-gray-900 dark:text-white">Our </span>
                            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                                Mission
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                            To create a platform where creativity meets competition, where talent is recognized, 
                            and where creators can showcase their skills to the world. We believe everyone has 
                            a story to tell and a masterpiece to create.
                        </p>
                    </motion.div>

                    {/* Mission Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="w-16 h-16 bg-linear-to-r from-[#4a37d8] to-[#6928d9] rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Empower Creators</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                Provide a platform where every creator can showcase their unique talents and gain recognition
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-8 rounded-2xl border border-purple-100 dark:border-purple-900/30 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="w-16 h-16 bg-linear-to-r from-[#6928d9] to-[#1f3092] rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Fair Competition</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                Ensure transparent judging and fair evaluation for all participants
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-8 rounded-2xl border border-amber-100 dark:border-amber-900/30 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="w-16 h-16 bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Build Community</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                Foster a supportive community where creators can learn, grow, and inspire each other
                            </p>
                        </motion.div>
                    </div>

                    {/* Vision Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] rounded-2xl p-10 text-white shadow-xl"
                    >
                        <div className="text-center">
                            <h3 className="text-3xl font-bold mb-4 font-urbanist">Our Vision</h3>
                            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                                To become the world's leading platform for creative competitions, where millions of creators 
                                come together to showcase their talents, win amazing prizes, and build lasting careers in their 
                                chosen fields. We envision a future where creativity knows no bounds and every artist has a 
                                platform to shine.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-urbanist">
                            <span className="text-gray-900 dark:text-white">Why Choose </span>
                            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">
                                Us?
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] rounded-3xl p-12 text-center text-white shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-urbanist">
                            Ready to Join Us?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Start your creative journey today and compete with the best
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-[#4a37d8] px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 cursor-pointer">
                                Get Started
                            </button>
                            <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
