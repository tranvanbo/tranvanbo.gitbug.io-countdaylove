import React, { useState, ChangeEvent } from 'react';
import type { LoveData } from '../types';

interface SettingsPanelProps {
    currentData: LoveData;
    onSave: (data: LoveData) => void;
    onClose: () => void;
    isInitialSetup: boolean;
}

const ImageUpload: React.FC<{ label: string; image: string | null; onImageChange: (base64: string) => void }> = ({ label, image, onImageChange }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                    onImageChange(event.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 flex items-center">
                <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 border">
                    {image ? (
                        <img src={image} alt="Avatar Preview" className="h-full w-full object-cover" />
                    ) : (
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </span>
                <label
                    htmlFor={`file-upload-${label}`}
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 cursor-pointer"
                >
                    <span>Upload</span>
                    <input id={`file-upload-${label}`} name={`file-upload-${label}`} type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                </label>
            </div>
        </div>
    );
};


const SettingsPanel: React.FC<SettingsPanelProps> = ({ currentData, onSave, onClose, isInitialSetup }) => {
    const [data, setData] = useState<LoveData>(currentData);

    const handleSave = () => {
        if (!data.startDate) {
            alert("Please select your special date!");
            return;
        }
        onSave(data);
    };
    
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl transform transition-all animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 font-dancing-script">{isInitialSetup ? "Tell Us Your Love Story" : "Settings"}</h2>
                {!isInitialSetup && (
                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            
            {isInitialSetup && <p className="text-center text-gray-500">Let's personalize this celebration for you and your love.</p>}

            <div className="grid grid-cols-2 gap-6 pt-4">
                <ImageUpload label={data.name1} image={data.image1} onImageChange={(img) => setData(d => ({ ...d, image1: img }))} />
                <ImageUpload label={data.name2} image={data.image2} onImageChange={(img) => setData(d => ({ ...d, image2: img }))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="name1" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" id="name1" value={data.name1} onChange={(e) => setData({ ...data, name1: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="name2" className="block text-sm font-medium text-gray-700">Partner's Name</label>
                    <input type="text" id="name2" value={data.name2} onChange={(e) => setData({ ...data, name2: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm" />
                </div>
            </div>

            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Our Special Date</label>
                <input type="date" id="startDate" value={data.startDate || ''} max={today} onChange={(e) => setData({ ...data, startDate: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm" />
            </div>

            <button onClick={handleSave} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-300 transform hover:scale-105 active:scale-100">
                {isInitialSetup ? "Begin Our Story" : "Save Changes"}
            </button>
        </div>
    );
};

export default SettingsPanel;