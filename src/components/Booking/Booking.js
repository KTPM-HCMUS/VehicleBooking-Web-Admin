import React, { useState } from "react";
import "./Booking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import bikeImage from "../../images/bike.png";
import carImage from "../../images/car.png";
import Autocomplete from "react-google-autocomplete";
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
  const [directionResponse, setDirectionResponse] = useState(null);

  const handleOnBlur = (event) => {
    const updateBooking = { ...booking };
    if(event.target.name === "phone"){
        const phone = event.target.value;
        console.log(phone);
    }
    if (event.target.name === "pickup") {
      const pickup = event.target.value;
      console.log(pickup);
    } 
    else if (event.target.name === "dropoff") {
        const dropoff = event.target.value;
        console.log(dropoff);
    }
    setBooking(updateBooking);
  };

  async function bookingrequest(){
    var objectdata = {
      typeOfVehicle: 1,
      longitudeDepart: 106.6823,
      latitudeDepart: 10.7627,
      longitudeDestination: 106.6633127,
      latitudeDestination: 10.755126307591706,
      addressDepart: "227 Nguyễn Văn Cừ, Quận 5, TP Hồ Chí Minh",
      addressDestination: "217 Hồng Bàng, Quận 5, TP Hồ Chí Minh",
      price: 9.3,
      userId: "123585",
      name: "Ngoc Le 123",
    };
      const response = await fetch("/api/v1/location/admin",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        typeOfVehicle: objectdata.typeOfVehicle,
        longitudeDepart: objectdata.longitudeDepart,
        latitudeDepart: objectdata.latitudeDepart,
        longitudeDestination: objectdata.longitudeDestination,
        latitudeDestination: objectdata.latitudeDestination,
        addressDepart: objectdata.addressDepart,
        addressDestination: objectdata.addressDestination,
        price: objectdata.price,
        userId: objectdata.userId, 
        name: objectdata.name
        })
      })
    
    const json = await response.json();
    if (json)
    {
      if(json.userId){
        showMessage("The driver with name " + json.name + " with vehicle plate number " + json.vehiclePlate + ", phone: " + json.userId + "has received the booking!");
      }
      else{
        showMessage('No driver available!');
      }
    }
    else {
      showMessage('No driver available!');
    }
  }
  
  const handleSubmit = (event) => {
    bookingrequest();
    event.preventDefault();
  };

  const showMessage = (error) => {
    const errorMessage = error.message;
    setError(errorMessage);
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="row gx-5 pb-5">
        <div className="col-md-4 search-form">
          {!transportation && (
            <form onSubmit={handleSubmit} className="search-form-content">
              <label htmlFor="phone" className="mt-3 mb-2"> Phone </label>
              <input
                type="tel"
                name="phone"
                onBlur={handleOnBlur}
                className="location mb-2"/>

              <label htmlFor="name" className="mb-2"> Name </label>
              <input
                type="text"
                name="name"
                onBlur={handleOnBlur}
                className="location mb-2"/>

              <label htmlFor="pickup" className="mb-2"> Pick Up </label>
              <Autocomplete
                name="pickup"
                className="location mb-2"
                apiKey="AIzaSyCyOWzvbd05Y2YN3fEMwQ1Rxm5VSSlDZHA"
                onBlur={handleOnBlur}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
              />
              
              <label htmlFor="dropoff" className="mb-2"> Drop Off </label>
              <Autocomplete
                name="dropoff"
                className="location mb-2"
                apiKey="AIzaSyCyOWzvbd05Y2YN3fEMwQ1Rxm5VSSlDZHA"
                onBlur={handleOnBlur}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
              />
              
              <input
                type="submit"
                value="Book"
                className="search-btn mt-2 mb-3"
              />
              {!emptyLocation && (
                <p style={{ color: "red" }}>Location must not be empty.</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
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
