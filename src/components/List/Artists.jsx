import React from 'react';
import { Error } from '../LoadersAndError';

const Artists = ({ children, isFetching, error }) => {
  if (isFetching) return <div className="h-6 rounded-md w-full max-w-[240px] bg-white/5 animation-loading"></div>;
  if (error) return <Error title="Artists are not available with the current API." />;

  return (
    <div id="artists" className="mb-8">
      <h3 className="text-white/80 font-bold text-xl mb-6">{children}</h3>
      <Error title="Artists are not available with the current API." />
    </div>
  );
};

export default Artists;