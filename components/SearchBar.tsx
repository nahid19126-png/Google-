import React, { useState, useEffect } from 'react';
import { Search, X, Mic, Camera } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  className?: string;
  variant?: 'home' | 'header';
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  initialQuery = '', 
  onSearch, 
  className = '',
  variant = 'home'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const containerClasses = variant === 'home'
    ? `w-full max-w-xl mx-auto border rounded-full flex items-center px-4 py-3 transition-shadow duration-200 ${isFocused ? 'shadow-md border-transparent ring-1 ring-gray-200' : 'shadow-sm border-gray-200 hover:shadow-md'}`
    : `w-full max-w-2xl border border-transparent bg-white rounded-full flex items-center px-4 py-2 shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_0_rgba(32,33,36,0.28)]`;

  return (
    <form onSubmit={handleSubmit} className={`${className} relative`}>
      <div className={containerClasses}>
        <div className="text-gray-400 mr-3">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-grow outline-none text-gray-800 text-base bg-transparent"
          placeholder={variant === 'home' ? "Search the web with Gemini" : ""}
        />

        <div className="flex items-center space-x-3 ml-2">
          {query && (
            <button 
              type="button" 
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          )}
          
          {variant === 'home' && <div className="border-l border-gray-300 h-6 mx-1"></div>}
          
          <button type="button" className="text-blue-500 hover:text-blue-600 tooltip" title="Voice Search (Mock)">
            <Mic size={20} />
          </button>
          
          <button type="button" className="text-blue-500 hover:text-blue-600 tooltip" title="Image Search (Mock)">
            <Camera size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};
