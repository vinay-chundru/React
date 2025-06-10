import React ,{ useState } from "react";



const DisplayName = () => {

 const [firstName,setFirstName] = useState("");
 const [lastName,setLastName] = useState("");
 const [submittedName,setSubmittedName] = useState("");

 const handleSubmit = (e) => {
   e.preventDefault();

   if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Please fill in both First Name and Last Name.");
      return;
    }

    setSubmittedName(`${firstName} ${lastName}`);
}
  return (
    <>
    <h1>Full Name Display</h1>
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="first-name" style={{ marginRight: "10px", width: "100px" }}>
          First Name:
        </label>
        <input 
        id="first-name"
        value={firstName} 
        type="text"
        placeholder="First Name"
        onChange={e => {
            setFirstName(e.target.value);
        }}
         />
    </div>
    <div>
        <label htmlFor="last-name" style={{ marginRight: "10px", width: "100px" }}>
          Last Name:
        </label>
        <input 
        id="last-name" 
        value={lastName} 
        type="text" 
        placeholder="Last name"
        onChange={e => {
           setLastName(e.target.value);
        }}
       />
    </div>

    <div>
        <button type="submit">Submit</button>
    </div>
    </form>

    {submittedName && (
        <div style={{  marginTop: "20px" }}>
          Full Name: {submittedName}
        </div>
      )}
    </>
    
    

  );
}

export default DisplayName;