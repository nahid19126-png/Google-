import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f2f2f2] text-[#70757a] text-sm w-full mt-auto">
      <div className="border-b border-[#dadce0] px-8 py-3">
        <span>United States</span>
      </div>
      <div className="flex flex-col md:flex-row justify-between px-8 py-3">
        <div className="flex space-x-6 mb-2 md:mb-0 justify-center md:justify-start">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Advertising</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">How Search works</a>
        </div>
        <div className="flex space-x-6 justify-center md:justify-end">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Settings</a>
        </div>
      </div>
    </footer>
  );
};
