import React from 'react';
import Banner from '../../components/Hero/Banner';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';

import CategorySection from '../../components/Home/CategorySection';
import PopularContests from '../../components/Home/PopularContests';
import RecentWinners from '../../components/Home/RecentWinners';

const Home = () => {
    return (
       <div>
        <Banner />
        <PopularContests />
        <CategorySection />
        <RecentWinners />
        <ReadyToStart/>
       </div>
    );
};

export default Home;