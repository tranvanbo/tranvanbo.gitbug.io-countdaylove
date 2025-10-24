import React from 'react';

interface HeaderProps {
    name1: string;
    name2: string;
    image1: string | null;
    image2: string | null;
}

const Avatar: React.FC<{ image: string | null; name: string }> = ({ image, name }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className="w-24 h-24 rounded-full bg-white/80 shadow-lg flex items-center justify-center overflow-hidden border-4 border-white/50">
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
                <span className="text-4xl text-rose-300">?</span>
            )}
        </div>
        <p className="font-bold text-lg text-rose-800">{name}</p>
    </div>
);

const HeartIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ name1, name2, image1, image2 }) => {
    return (
        <header className="flex justify-around items-center pt-8">
            <Avatar image={image1} name={name1} />
            <div className="self-start pt-6">
                <HeartIcon />
            </div>
            <Avatar image={image2} name={name2} />
        </header>
    );
};

export default Header;