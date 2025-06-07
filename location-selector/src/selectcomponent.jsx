import React ,{useEffect, useState } from "react";


const SelectComponent = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  useEffect(() => {
     fetch("https://crio-location-selector.onrender.com/countries")
     .then((res) => res.json())
     .then((data) => setCountries(data))
     .catch((error) => console.error("Error fetching countries",error));
  },[])

  useEffect(() => {
   if(selectedCountry) {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
    .then((res) => res.json())
    .then((data) => setStates(data))
    .catch((error) => console.error("Error fetching states",error));
   }
 },[selectedCountry])
 
 useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState]);

    return ( <>
      <h2 style={{
        textAlign:"center"
      }}>Select Location</h2>

        <div style={{
               display: 'flex',
               justifyContent: 'center',
               gap: '10px', // spacing between dropdowns
               flexWrap: 'wrap', // optional: for responsiveness
               marginBottom: '20px',
        }}>
          

          {/* Country  selection */}
        <select value={selectedCountry} onChange={e => {
          setSelectedCountry(e.target.value);
          setSelectedState('');
          setSelectedCity('');
        }}>
          <option value ="">Select Country</option>
          {
            countries.map((item) => (
              <option key = {item} value={item}>{item}</option>
            ))
          }
        </select>



         {/* state selection */}
        <select value={selectedState} onChange={e => {
          setSelectedState(e.target.value);
          setSelectedCity('');
        }}
        disabled={!selectedCountry}>
          <option value="">Select State</option> 
          {
            states.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
          }
        </select>


        {/* City selection */}
        <select value={selectedCity} onChange={e => {
          setSelectedCity(e.target.value);
        }} disabled={!selectedState}>
        <option value="">Select City</option> 
        {
          cities.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
        </select>
      </div>

        {selectedCountry && selectedState && selectedCity && (
        <div style={{textAlign:"center"}}>
          You selected <b>{selectedCity}</b>, <span>{selectedState}, {selectedCountry}</span>
        </div>
      )}
      </>
    );
}

export default SelectComponent;