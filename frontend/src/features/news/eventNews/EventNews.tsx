import React from 'react';
import NewsList from '../components/NewsList';
import NewsBanner from '../components/NewsBanner';


const EventNews = () => {
  return (
    <div className="w-rp  justify-between items-center mb-[120px] ">
      <NewsBanner />
      <NewsList />
    </div>
  );
};

export default EventNews