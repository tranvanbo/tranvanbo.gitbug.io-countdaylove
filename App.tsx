import React, { useState, useMemo } from 'react';
import useLoveData from './hooks/useLoveData';
import Header from './components/Header';
import DateDisplay from './components/DateDisplay';
import MilestoneTracker from './components/MilestoneTracker';
import SettingsPanel from './components/SettingsPanel';
import type { LoveData } from './types';

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);


export default function App() {
    const { loveData, setLoveData } = useLoveData();
    const [isSettingsOpen, setIsSettingsOpen] = useState(!loveData.startDate);

    const handleSaveSettings = (data: LoveData) => {
        setLoveData(data);
        setIsSettingsOpen(false);
    };
    
    const dayCount = useMemo(() => {
        if (!loveData.startDate) return 0;
        const start = new Date(loveData.startDate);
        const today = new Date();
        start.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diffTime = Math.abs(today.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    }, [loveData.startDate]);

    if (!loveData.startDate || isSettingsOpen) {
        return (
            <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
                <SettingsPanel 
                    currentData={loveData} 
                    onSave={handleSaveSettings} 
                    onClose={() => loveData.startDate && setIsSettingsOpen(false)}
                    isInitialSetup={!loveData.startDate}
                />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-rose-100 to-pink-200 text-gray-700">
             <div className="absolute top-0 -left-4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative z-10 animate-fade-in">
                <main className="max-w-md mx-auto p-4 md:p-6 space-y-8">
                    <Header 
                        name1={loveData.name1} 
                        name2={loveData.name2} 
                        image1={loveData.image1} 
                        image2={loveData.image2} 
                    />
                    <DateDisplay dayCount={dayCount} startDate={loveData.startDate!} />
                    <MilestoneTracker startDate={loveData.startDate!} />
                </main>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="fixed bottom-6 right-6 bg-white/70 backdrop-blur-sm text-rose-500 p-3 rounded-full shadow-lg hover:bg-rose-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50"
                    aria-label="Open Settings"
                >
                    <EditIcon />
                </button>
                <footer className="text-center py-6 text-rose-400 text-sm">
                    Made with <HeartIcon /> for my love
                </footer>
            </div>
        </div>
    );
}