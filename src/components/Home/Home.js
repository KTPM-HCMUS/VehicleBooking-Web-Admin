import React from "react";
import "./Home.css";
import bikeImage from "../../images/bike.png";
import carImage from "../../images/car.png";
import VehicleCard from "../VehicleCard/VehicleCard";

const Home = () => {
  const vehicles = [
    { id: 1, title: "BIKE", image: bikeImage },
    { id: 2, title: "CAR", image: carImage },
  ];

  return (
    <div className="container home">
      <div className="row gx-5 pb-5 mb-5">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle}></VehicleCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
