import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';
import { Footer } from '../components/Footer';
import { Grip, Beaker } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLucky = () => {
    const funQueries = [
      "Why is the sky blue?",
      "History of the internet",
      "Cute cat pictures",
      "How to code in React",
      "Best pizza near me"
    ];
    const randomQuery = funQueries[Math.floor(Math.random() * funQueries.length)];
    navigate(`/search?q=${encodeURIComponent(randomQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="flex justify-end items-center p-4 space-x-4 text-sm">
        <a href="#" className="hover:underline text-gray-700">Gmail</a>
        <a href="#" className="hover:underline text-gray-700">Images</a>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
           <Beaker size={20} className="text-gray-600" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
           <Grip size={20} className="text-gray-600" />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors">
          Sign in
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center -mt-20 px-4">
        <Logo className="mb-8" />
        
        <SearchBar onSearch={handleSearch} className="w-full mb-8" />

        <div className="flex space-x-3">
          <button 
            onClick={() => {}} 
            className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm text-gray-800 text-sm py-2 px-4 rounded"
          >
            Google Search
          </button>
          <button 
            onClick={handleLucky}
            className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm text-gray-800 text-sm py-2 px-4 rounded"
          >
            I'm Feeling Lucky
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-600">
           Google offered in: <a href="#" className="text-blue-700 hover:underline pl-1">Español</a> <a href="#" className="text-blue-700 hover:underline pl-1">Français</a>
        </div>
      </main>

      <Footer />
    </div>
  );
};
