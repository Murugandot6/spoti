import React from 'react';
import { Error } from '../LoadersAndError';

const Albums = ({ children, isFetching, error }) => {
  if (isFetching) return <div className="h-6 rounded-md w-full max-w-[240px] loading-animation bg-white/5"></div>;
  if (error) return <Error title="Albums are not available with the current API." />;
  
  return (
    <div id="albums" className="mb-8">
      <h3 className="text-white font-bold text-xl">{children}</h3>
      <Error title="Albums are not available with the current API." />
    </div>
  );
};

export default Albums;