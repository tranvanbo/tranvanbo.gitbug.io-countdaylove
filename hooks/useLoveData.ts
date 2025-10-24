
import { useState, useEffect } from 'react';
import type { LoveData } from '../types';

const LOVE_DATA_KEY = 'loveDayCounterData';

const useLoveData = () => {
    const [loveData, setLoveData] = useState<LoveData>(() => {
        try {
            const item = window.localStorage.getItem(LOVE_DATA_KEY);
            if (item) {
                return JSON.parse(item);
            }
        } catch (error) {
            console.error('Error reading from localStorage', error);
        }
        return {
            startDate: null,
            name1: 'You',
            name2: 'Me',
            image1: null,
            image2: null,
        };
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(LOVE_DATA_KEY, JSON.stringify(loveData));
        } catch (error) {
            console.error('Error writing to localStorage', error);
        }
    }, [loveData]);

    return { loveData, setLoveData };
};

export default useLoveData;
