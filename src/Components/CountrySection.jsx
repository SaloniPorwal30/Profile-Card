import React, { useState, useEffect } from "react";
import axios from "axios";
import Clock from "../Components/Clock";
import "../Pages/Profile/Profile.css";
import { useNavigate } from "react-router-dom";

const CountrySection = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedPlaceTime, setSelectedPlaceTime] = useState({
    datetime: new Date().toISOString(),
    timezone: "Asia/Kolkata",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchList = async () => {
      try {
        const { data } = await axios.get(
          "http://worldtimeapi.org/api/timezone"
        );
        setPlaces(data);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };
    fetchList();
  }, []);

  const handlePlaceSelect = async (e) => {
    let {
      target: { value },
    } = e;
    try {
      // Change this line in handlePlaceSelect function
      const { data } = await axios.get(
        `http://worldtimeapi.org/api/timezone/${e.target.value}`
      );
      setSelectedPlaceTime(data);
      setSelectedPlace(value);
    } catch (err) {
      console.error("Error fetching selected place:", err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="profileHeader">
          <button onClick={() => navigate("/")}>Back</button>
          <select onChange={(e) => handlePlaceSelect(e)} value={selectedPlace}>
            <option disabled value="">
              Select Country
            </option>
            {places?.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
          <Clock selectedPlaceTime={selectedPlaceTime} />
        </div>
      </div>
    </>
  );
};

export default CountrySection;
