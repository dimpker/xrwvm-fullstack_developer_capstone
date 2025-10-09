import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    
    // Debug logging to help identify the issue
    console.log("Validation check:");
    console.log("model:", model);
    console.log("review:", review);
    console.log("date:", date);
    console.log("year:", year);
    
    if(!model || model === "" || review === "" || date === "" || year === "") {
      let missingFields = [];
      if(!model || model === "") missingFields.push("Car Make & Model");
      if(review === "") missingFields.push("Review");
      if(date === "") missingFields.push("Purchase Date");
      if(year === "") missingFields.push("Car Year");
      
      alert("Please fill in all required fields: " + missingFields.join(", "));
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  console.log("Review submission response:", json);
  
  if (json.status === 200) {
      alert("Review submitted successfully! Redirecting to dealer page...");
      // Use a slight delay to ensure the review is processed before redirecting
      setTimeout(() => {
          window.location.href = window.location.origin+"/dealer/"+id;
      }, 1000);
  } else {
      alert("Error submitting review: " + (json.message || "Unknown error"));
  }

  }
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      // retobj.dealer is a single object, not an array
      setDealer(retobj.dealer)
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <div>
      <Header/>
      <div style={{margin:"20px auto", maxWidth:"600px", padding:"20px"}}>
        <div style={{backgroundColor:"#e0f7ff", padding:"15px", borderRadius:"8px", marginBottom:"20px", border:"1px solid #00bcd4"}}>
          <h2 style={{color:"#0277bd", margin:"0 0 10px 0", fontSize:"18px"}}>
            Write a Review for {dealer.full_name || 'Loading...'}
          </h2>
          {dealer.city ? (
            <p style={{fontSize:"14px", color:"#555", margin:"0"}}>
              {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
            </p>
          ) : (
            <p style={{fontSize:"14px", color:"#555", margin:"0"}}>Loading dealer information...</p>
          )}
        </div>
        
        <div style={{marginBottom:"15px"}}>
          <label style={{display:"block", fontWeight:"bold", marginBottom:"8px", color:"#0277bd", fontSize:"14px"}}>Your Review:</label>
          <textarea 
            id='review' 
            rows='6' 
            placeholder='Share your experience with this dealership...' 
            style={{
              width:"100%", 
              padding:"10px", 
              borderRadius:"4px", 
              border:"1px solid #ccc", 
              fontSize:"14px",
              fontFamily:"Arial, sans-serif",
              resize:"vertical",
              boxSizing:"border-box"
            }} 
            onChange={(e) => setReview(e.target.value)}>
          </textarea>
        </div>
        <div style={{marginBottom:"15px"}}>
          <label style={{display:"block", fontWeight:"bold", marginBottom:"8px", color:"#0277bd", fontSize:"14px"}}>Purchase Date:</label>
          <input 
            type="date" 
            onChange={(e) => setDate(e.target.value)} 
            style={{
              padding:"8px", 
              borderRadius:"4px", 
              border:"1px solid #ccc", 
              width:"100%",
              maxWidth:"200px",
              fontSize:"14px",
              boxSizing:"border-box"
            }}
          />
        </div>
        
        <div style={{marginBottom:"15px"}}>
          <label style={{display:"block", fontWeight:"bold", marginBottom:"8px", color:"#0277bd", fontSize:"14px"}}>Car Make & Model:</label>
          <select 
            name="cars" 
            id="cars" 
            onChange={(e) => setModel(e.target.value)} 
            style={{
              padding:"8px", 
              borderRadius:"4px", 
              border:"1px solid #ccc", 
              width:"100%",
              maxWidth:"300px",
              fontSize:"14px",
              boxSizing:"border-box"
            }}
          >
            <option value="" disabled hidden>Choose Car Make and Model</option>
            {carmodels.map(carmodel => (
                <option key={`${carmodel.CarMake}-${carmodel.CarModel}`} value={carmodel.CarMake+" "+carmodel.CarModel}>
                  {carmodel.CarMake} {carmodel.CarModel}
                </option>
            ))}
          </select>        
        </div>

        <div style={{marginBottom:"20px"}}>
          <label style={{display:"block", fontWeight:"bold", marginBottom:"8px", color:"#0277bd", fontSize:"14px"}}>Car Year:</label>
          <input 
            type="number" 
            onChange={(e) => setYear(e.target.value)} 
            max={2023} 
            min={2015} 
            placeholder="e.g. 2020" 
            style={{
              padding:"8px", 
              borderRadius:"4px", 
              border:"1px solid #ccc", 
              width:"100%",
              maxWidth:"120px",
              fontSize:"14px",
              boxSizing:"border-box"
            }}
          />
        </div>

        <div style={{textAlign:"center", marginTop:"30px"}}>
          <button 
            className='postreview' 
            onClick={postreview} 
            style={{
              backgroundColor:"#00bcd4", 
              color:"white", 
              padding:"10px 20px", 
              border:"none", 
              borderRadius:"4px", 
              fontSize:"14px", 
              fontWeight:"bold", 
              cursor:"pointer",
              minWidth:"120px"
            }}
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  )
}
export default PostReview
