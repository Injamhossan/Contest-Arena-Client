import React from 'react';
import { Trophy, ArrowRight, Rocket, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ReadyToStart = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 via-white to-blue-50 pt-20 pb-16">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
        {/* Faint Trophy Outline - Abstract representation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none">
            <Trophy size={800} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight font-urbanist"
          >
            <span className="text-gray-900">Ready to Start Your </span>
            <span className="bg-linear-to-r from-[#4a37d8] to-[#6928d9] bg-clip-text text-transparent">Journey?</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of creators and competitors. Host your own contests or participate in exciting challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button className="flex items-center gap-2 bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 cursor-pointer">
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 transition-all hover:border-gray-300 cursor-pointer">
              Learn More
            </button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Card 1 */}
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto">
                    <Rocket size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Setup</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Create an account and start participating in contests within minutes</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6 mx-auto">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Secure Payments</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Safe and secure payment processing for entry fees and prizes</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-6 mx-auto">
                    <Trophy size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Win Prizes</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Compete for amazing prizes and get recognized for your talent</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ReadyToStart;
