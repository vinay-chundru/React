import React, { useEffect, useState } from "react";
import './CountrySearch.css';

const API_URL =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function CountryCard({ name, flag }) {
  return (
    <div className="countryCard cardStyle">
      <img src={flag} alt={`Flag of ${name}`} className="imgStyle" />
      <h3>{name}</h3>
    </div>
  );
}

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    (country.common || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="inputStyle"
      />
      <div className="gridStyle">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              key={country.common}
              name={country.common}
              flag={country.png}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};



export default Countries;
