import React from 'react';
import { Link } from 'react-router-dom';

const ArtistDetails = () => {
  return (
    <div className="p-4 flex-1 flex flex-col items-center justify-center gap-4 min-h-[80vh]">
      <h3 className="text-gray-400 font-bold text-xl">Artist details are not available with the current API.</h3>
      <Link to="/" className="px-4 sm:px-6 h-8 md:h-10 flex items-center justify-center rounded-full border border-white/5 hover:bg-gray-400 text-xs md:text-sm font-bold bg-gray-200 text-black">Go Home</Link>
    </div>
  );
};

export default ArtistDetails;