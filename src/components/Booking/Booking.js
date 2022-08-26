import React, { useState } from "react";
import "./Booking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import bikeImage from "../../images/bike.png";
import carImage from "../../images/car.png";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
const API_KEY = "AIzaSyCyOWzvbd05Y2YN3fEMwQ1Rxm5VSSlDZHA";
const containerStyle = {
  width: "100%",
  height: "715px",
};
const position = {
  lat: 10.763088554635953,
  lng: 106.68251458365107
};
const onLoad = (marker) => {
  console.log("marker: ", marker);
};

const Booking = () => {
  const { transportationMedium } = useParams();
  const rides = [
    { id: 1, title: "BIKE", image: bikeImage, fare: 3000 },
    { id: 2, title: "CAR", image: carImage, fare: 5000 },
  ];
  const transport = rides.find((ride) => transportationMedium === ride.title);
  const { id, image, title, fare } = transport;
  const [error, setError] = useState("");
  const [transportation, setTransportation] = useState(false);
  const [booking, setBooking] = useState({
    phone: "",
    typeOfVehicle: transport.id,
    longitudeDepart: 0.0 ,
    latitudeDepart: 0.0,
    longitudeDestination: 0.0,
    latitudeDestination: 0.0,
    addressDepart: "",
    addressDestination: "",
    price: ""
  });
  const [emptyLocation, setEmptyLocation] = useState(true);

  const handleOnBlur = (event) => {
    const updateBooking = { ...booking };
    if(event.target.name === "phone"){
        const phone = event.target.value;
        console.log(phone);
    }
    setBooking(updateBooking);
    console.log(updateBooking.typeOfVehicle);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const [directionResponse, setDirectionResponse] = useState(null);

  const showError = (error) => {
    const errorMessage = error.message;
    setError(errorMessage);
  };

  function getCoordinates(address){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key='+ API_KEY)
      .then(response => response.json())
      .then(data => {
        var locationCoordinates; 
        locationCoordinates.latitude = data.results.geometry.location.lat;
        locationCoordinates.longitude = data.results.geometry.location.lng;
        return locationCoordinates;
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="container mt-5 pb-5">
      <div className="row gx-5 pb-5">
        <div className="col-md-4 search-form">
          {!transportation && (
            <form onSubmit={handleSearch} className="search-form-content">
              
              <label htmlFor="phone" className="mt-3 mb-2"> Phone </label>
              <input
                type="tel"
                name="phone"
                onBlur={handleOnBlur}
                className="location mb-2"/>

              <label htmlFor="pickup" className="mb-2"> Pick Up </label>
              <input
                type="text"
                name="pickup"
                onBlur={handleOnBlur}
                className="location mb-2"/>
              
              <label htmlFor="dropoff" className="mb-2"> Drop Off </label>
              <input
                type="text"
                name="dropoff"
                onBlur={handleOnBlur}
                className="location mb-2"/>
              
              <input
                type="submit"
                value="Search"
                className="search-btn mt-2 mb-3"
              />
              {!emptyLocation && (
                <p style={{ color: "red" }}>Location must not be empty.</p>
              )}
            </form>
          )}
          {transportation && (
            <div>
              <div
                className="mt-4 d-flex"
                style={{
                  backgroundColor: "darkorange",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon className="map-icon" icon={faRoad} />
                </div>
                <div className="pt-3 px-3">
                  <h4>{booking.addressDepart} to</h4>
                  <h4>{booking.addressDestination}</h4>
                </div>
              </div>
              <div className="row gx-2 transport">
                <div className="col-3">
                  <img style={{ width: "80%" }} src={image} alt="" />
                </div>
                <div className="col-3">
                  <p>{title}</p>
                </div>
                <div className="col-3">
                  <p>{fare}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-8">
          {!transportation && (
            <LoadScript googleMapsApiKey="AIzaSyCyOWzvbd05Y2YN3fEMwQ1Rxm5VSSlDZHA">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
              >
                <Marker onLoad={onLoad} position={position} />
              </GoogleMap>
            </LoadScript>
          )}
          {transportation && (
            <LoadScript googleMapsApiKey="AIzaSyCyOWzvbd05Y2YN3fEMwQ1Rxm5VSSlDZHA">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
              >
                <DirectionsService
                  options={{
                    destination: booking.addressDestination,
                    origin: booking.addressDepart,
                    travelMode: "TRANSIT",
                  }}
                  callback={(response) => {
                    if (response !== null) {
                      if (response.status === "OK") {
                        setDirectionResponse(response);
                      }
                    }
                  }}
                />
                {directionResponse && (
                  <DirectionsRenderer
                    options={{
                      directions: directionResponse,
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
