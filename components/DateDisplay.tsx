import React, { useState, useEffect } from 'react';

interface DateDisplayProps {
    dayCount: number;
    startDate: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ dayCount, startDate }) => {
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = dayCount;
        if (start === end) {
            setDisplayCount(end);
            return;
        };

        const duration = 1000; // 1 second for the animation
        const incrementTime = 10; // update every 10ms
        const totalFrames = duration / incrementTime;
        const increment = Math.max(Math.floor(end / totalFrames), 1);

        let currentFrame = 0;
        const timer = setInterval(() => {
            currentFrame += increment;
            if (currentFrame >= end) {
                setDisplayCount(end);
                clearInterval(timer);
            } else {
                setDisplayCount(currentFrame);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [dayCount]);

    const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <section className="text-center bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
            <p className="font-dancing-script text-3xl text-rose-500 mb-2">We've been together for</p>
            <h1 className="text-8xl md:text-9xl font-bold text-rose-900 tracking-tighter my-4" style={{textShadow: '2px 2px 4px rgba(225, 29, 72, 0.1)'}}>
                {displayCount}
            </h1>
            <p className="text-xl text-rose-500 font-semibold">days</p>
            <div className="mt-6 border-t border-rose-200 pt-4">
                <p className="text-md text-gray-500">Since {formattedDate}</p>
            </div>
        </section>
    );
};

export default DateDisplay;