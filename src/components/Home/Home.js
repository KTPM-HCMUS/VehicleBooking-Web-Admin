import React from "react";
import "./Home.css";
import bikeImage from "../../images/bike.png";
import carImage from "../../images/car.png";
import RideCard from "../RideCard/RideCard";

const Home = () => {
  const rides = [
    { id: 1, title: "BIKE", image: bikeImage },
    { id: 2, title: "CAR", image: carImage },
  ];

  return (
    <div className="container home">
      <div className="row gx-5 pb-5 mb-5">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride}></RideCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
