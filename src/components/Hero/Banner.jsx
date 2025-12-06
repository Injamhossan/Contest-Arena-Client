import React from 'react';
import { Search, Trophy, Users, Gift, Sparkles, ArrowRight, Palette, Camera, PenTool, Video, Monitor, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20 pb-16">
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
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-8 shadow-lg shadow-blue-600/20"
          >
            <Sparkles size={16} />
            <span>Join 10,000+ creators and competitors</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight font-urbanist"
          >
            <span className="text-gray-900">Compete. </span>
            <span className="text-purple-600">Create.</span>
            <br />
            <span className="text-amber-500">Celebrate.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Discover exciting contests, showcase your talents, win amazing prizes, and join a community of passionate creators.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/50 max-w-2xl mx-auto flex items-center gap-2 mb-6 border border-gray-100"
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search contests by name or tag..." 
                className="w-full py-3 outline-none text-gray-700 bg-transparent placeholder:text-gray-400"
              />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors cursor-pointer">
              Search
            </button>
          </motion.div>

          {/* Popular Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12 text-sm text-gray-600"
          >
            <span className="text-gray-400">Popular:</span>
            {[
              { label: 'Design', icon: Palette },
              { label: 'Photography', icon: Camera },
              { label: 'Writing', icon: PenTool },
              { label: 'Video', icon: Video },
              { label: 'Art', icon: Monitor },
              { label: 'Technology', icon: Cpu }
            ].map((tag, index) => (
              <button 
                key={index}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 cursor-pointer">
              Explore Contests
              <ArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 transition-all hover:border-gray-300 cursor-pointer">
              Start Creating
              <Trophy size={18} className="text-amber-500" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 border-t border-gray-100 pt-8"
          >
            {[
              { label: 'Contests', value: '500+', icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Participants', value: '10K+', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Prizes', value: '$1M+', icon: Gift, color: 'text-green-500', bg: 'bg-green-50' },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;