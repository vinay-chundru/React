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
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="first-name" style={{ marginRight: "10px", width: "100px" }}>
          First Name:
        </label>
        <input value={firstName} onChange={e => {
            setFirstName(e.target.value);
        }}
        type="text"
        placeholder="First Name" />
    </div>
    <div>
        <label htmlFor="last-name" style={{ marginRight: "10px", width: "100px" }}>
          Last Name:
        </label>
        <input value={lastName} onChange={e => {
           setLastName(e.target.value);
        }}
        type="text" 
        placeholder="Last name"/>
    </div>

    <div>
        <button type="submit">submit</button>
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