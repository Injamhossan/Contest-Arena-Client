import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Users, Hash } from 'lucide-react';

const Card = ({ item }) => {
    
    const { 
        name = "Untitled Contest",
        image, 
        contestType = "General", 
        description = "No description available.",
        price = 0,
        prizeMoney = 0,
        participantsCount = 0, 
        participationLimit = 0,
        deadline,
        _id 
    } = item || {};

    const targetParticipants = participationLimit > 0 ? participationLimit : 100; // Fallback to 100 if 0 (unlimited) or undefined, or maybe handle unlimited differently
    const progressPercentage = participationLimit > 0 
        ? Math.min((participantsCount / targetParticipants) * 100, 100) 
        : 0; // Or some other logic for unlimited

    // Countdown Timer Logic
    const calculateTimeLeft = () => {
        const difference = +new Date(deadline) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };


    return (
        <div className="card bg-white dark:bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
            {/* Image Header with Badges */}
            <div className="relative h-48 w-full overflow-hidden group">
                <img
                    src={image} // Ensure this is a valid URL
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Badge - Top Left */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-full shadow-sm uppercase tracking-wider">
                        {contestType}
                    </span>
                </div>

                {/* Prize Badge - Bottom Left */}
                <div className="absolute bottom-4 left-4">
                     <span className="flex items-center gap-1 px-3 py-1.5 bg-[#FFC107] text-gray-900 text-sm font-bold rounded-full shadow-md">
                        <Trophy size={14} className="text-gray-900" />
                        ${prizeMoney}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col grow">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {name}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description?.substring(0, 100)}...
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                        <Hash size={10} /> {contestType.toLowerCase()}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                         Entry: ${price}
                    </span>
                </div>

                {/* Details Row */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                     <div className="flex items-center gap-2">
                         <span className='text-xl text-gray-400'>$</span> <span className="text-base text-gray-500">Entry: ${price}</span>
                     </div>
                     <div className="flex items-center gap-1 text-gray-500">
                        <Users size={16} />
                        <span>{participantsCount}/{targetParticipants}</span>
                     </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div 
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="text-xs text-start text-gray-400 mb-6 font-medium">
                    {Math.round(progressPercentage)}% filled
                </div>

                {/* Divider/Spacer to push footer down */}
                <div className="mt-auto"></div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                    <Clock size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Time Remaining</span>
                </div>
                
                <div className="flex gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 leading-none">{formatTime(timeLeft.days)}</span>
                        <span className="text-[10px] uppercase text-gray-400 font-bold mt-1">Days</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                     <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 leading-none">{formatTime(timeLeft.hours)}</span>
                        <span className="text-[10px] uppercase text-gray-400 font-bold mt-1">Hrs</span>
                    </div>
                     <div className="h-8 w-px bg-gray-200"></div>
                     <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 leading-none">{formatTime(timeLeft.minutes)}</span>
                        <span className="text-[10px] uppercase text-gray-400 font-bold mt-1">Mins</span>
                    </div>
                     <div className="h-8 w-px bg-gray-200"></div>
                     <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 leading-none">{formatTime(timeLeft.seconds)}</span>
                        <span className="text-[10px] uppercase text-gray-400 font-bold mt-1">Secs</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link 
                    to={`/contest-details/${_id}`} 
                    className="w-full btn bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] hover:bg-blue-700 border-none text-white font-bold rounded-xl h-12 normal-case text-base shadow-md hover:shadow-lg transition-all"
                >
                    View Contest
                </Link>
            </div>
        </div>
    );
};

export default Card;