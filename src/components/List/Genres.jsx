import React from 'react';
import { Error } from '../LoadersAndError';

const Genres = ({ children, isFetching, error }) => {
  if (isFetching) return <div className="h-6 rounded-md w-full max-w-[240px] loading-animation bg-white/5"></div>;
  if (error) return <Error title="Genres are not available with the current API." />;

  return (
    <>
      <h2 className="text-white font-bold text-2xl mb-4">{children}</h2>
      <Error title="Genres are not available with the current API." />
    </>
  );
};

export default Genres;