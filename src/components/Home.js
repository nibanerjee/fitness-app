import React from 'react';
import HomeOption from './HomeOption'
import './home.scss';

const Home = () => {
  return (
    <div className="container home-card-wrapper">
    	<div className="row">
    		<HomeOption name="BMI Calculator" link="/bmicalc" description="Calulate your BMI and explore training that is suitable for you." />
    		<HomeOption name="Post Challenge" link="/training" description="Post your photo or video of training and challenge someone." />
    		<HomeOption name="Events" link="/events" description="Find out the events happening around you and join the events." />
    		<HomeOption name="Discussion" link="/events" description="See what people are discussion about keeping themselves fit and healthy. Take part in the discussion." />
    	</div>
    </div>
  );
}

export default Home;