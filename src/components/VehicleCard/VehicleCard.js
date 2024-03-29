import React from "react";
import "./VehicleCard.css";
import { Link } from "react-router-dom";

const VehicleCard = (props) => {
  const { title, image } = props.vehicle;

  return (
    <div className="col-xl-3 col-md-6 mb-5 pb-5">
      <div className="card align-items-center">
        <img src={image} className="card-img-top" alt="" />
        <div className="card-body">
          <Link to={`/booking/${title}`} style={{ textDecoration: "none" }}>
            <h3 className="card-title">{title}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
