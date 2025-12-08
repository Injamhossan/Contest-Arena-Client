import React from 'react';
import Banner from '../../components/Hero/Banner';
import ReadyToStart from '../../components/ReadyToStart/ReadyToStart';

import CategorySection from '../../components/Home/CategorySection';

const Home = () => {
    return (
       <div>
        <Banner />
        <CategorySection />
        <ReadyToStart/>
       </div>
    );
};

export default Home;