import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { performSearch } from '../services/geminiService';
import { SearchResponse, GroundingChunk } from '../types';
import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';
import { Search, Image, BookOpen, Video, MoreVertical, Settings, Grip, Sparkles } from 'lucide-react';

export const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await performSearch(query);
        setData(result);
      } catch (err) {
        setError("An error occurred while fetching results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  // Deduplicate sources based on URI
  const uniqueSources = useMemo(() => {
    if (!data?.groundingMetadata?.groundingChunks) return [];
    
    const seen = new Set();
    const sources: GroundingChunk[] = [];
    
    data.groundingMetadata.groundingChunks.forEach(chunk => {
      if (chunk.web && chunk.web.uri && !seen.has(chunk.web.uri)) {
        seen.add(chunk.web.uri);
        sources.push(chunk);
      }
    });
    
    return sources;
  }, [data]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 border-b border-gray-200">
        <div className="flex items-center p-4 pb-2 md:pl-8">
          <div onClick={() => navigate('/')} className="cursor-pointer mr-4 md:mr-8 pt-1">
             <Logo size="small" />
          </div>
          <SearchBar 
            initialQuery={query} 
            onSearch={handleSearch} 
            variant="header"
            className="flex-grow max-w-2xl"
          />
          <div className="flex-grow"></div>
          <div className="hidden md:flex items-center space-x-4 pr-4">
             <Settings size={20} className="text-gray-600 cursor-pointer" />
             <Grip size={20} className="text-gray-600 cursor-pointer" />
             <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                A
             </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-6 px-4 md:pl-[150px] text-sm text-gray-500 overflow-x-auto">
          <div className="flex items-center space-x-1 py-3 border-b-2 border-blue-500 text-blue-600 cursor-pointer whitespace-nowrap">
            <Search size={16} /> <span>All</span>
          </div>
          <div className="flex items-center space-x-1 py-3 hover:text-gray-800 cursor-pointer whitespace-nowrap">
            <Image size={16} /> <span>Images</span>
          </div>
          <div className="flex items-center space-x-1 py-3 hover:text-gray-800 cursor-pointer whitespace-nowrap">
            <BookOpen size={16} /> <span>News</span>
          </div>
          <div className="flex items-center space-x-1 py-3 hover:text-gray-800 cursor-pointer whitespace-nowrap">
            <Video size={16} /> <span>Videos</span>
          </div>
          <div className="flex items-center space-x-1 py-3 hover:text-gray-800 cursor-pointer whitespace-nowrap">
            <MoreVertical size={16} /> <span>More</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:pl-[150px] pt-6 max-w-4xl pb-12 flex-grow">
        {loading && (
          <div className="space-y-6 animate-pulse">
             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
             <div className="h-40 bg-gray-100 rounded-xl mt-4"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <div className="space-y-8">
            {/* AI Overview Section */}
            <div className="bg-[#f0f6ff] p-6 rounded-2xl border border-[#dce6f9]">
              <div className="flex items-center space-x-2 mb-3 text-sm font-medium text-[#1a0dab]">
                <Sparkles size={16} className="text-blue-600" />
                <span>AI Overview</span>
              </div>
              <div className="prose prose-sm max-w-none text-gray-900 leading-relaxed">
                <ReactMarkdown>{data.text}</ReactMarkdown>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Generative AI is experimental.
              </div>
            </div>

            {/* Search Results / Sources */}
            <div>
              <h2 className="text-xl text-gray-800 mb-4">Search Results</h2>
              
              {uniqueSources.length === 0 && (
                <div className="text-gray-500">No web sources returned for this query.</div>
              )}

              {uniqueSources.map((item, index) => {
                 if (!item.web) return null;
                 const { title, uri } = item.web;
                 
                 // Extract domain for display
                 let domain = '';
                 try {
                   domain = new URL(uri).hostname;
                 } catch (e) {
                   domain = uri;
                 }

                 return (
                  <div key={index} className="mb-8">
                    <div className="group cursor-pointer">
                      <a href={uri} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-gray-800 mb-1">
                        <div className="bg-gray-100 rounded-full p-1">
                           <img 
                             src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`} 
                             alt="" 
                             className="w-4 h-4"
                             onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                           />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{domain}</span>
                            <span className="text-gray-500 text-xs truncate max-w-[300px]">{uri}</span>
                        </div>
                      </a>
                      <a href={uri} target="_blank" rel="noopener noreferrer">
                        <h3 className="text-xl text-[#1a0dab] hover:underline visited:text-[#609] font-normal truncate">
                          {title}
                        </h3>
                      </a>
                    </div>
                    {/* Snippet placeholder - The API doesn't always give a snippet in the web object easily, 
                        so we rely on the title/url or the AI overview for context. 
                        We can show a truncated description if we had one. 
                    */}
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                       {/* Since snippets aren't guaranteed in chunks, we leave this blank or minimal */}
                       Click to read more about {title} on {domain}.
                    </p>
                  </div>
                 );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
