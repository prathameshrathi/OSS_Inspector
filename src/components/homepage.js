import React, { useState,useEffect } from "react";
import { TextField, Typography, Button } from "@material-ui/core";

function Homepage() {
  const [value, setvalue] = useState("");

  const [users,setUsers] = useState();

  const [forks,setForks] = useState();
  const [stars,setStars] = useState();
  const [closedissue,setClosedissue] = useState();
  const [contributors,setContributors] = useState();
  const [cmf,setCmf] = useState();

  const fetchData = () => {
    fetch(value)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setForks(data["forks_count"]);
        setStars(data["stargazers_count"]);
        setForks(data["forks_count"]);
        setForks(data["forks_count"]);
        setForks(data["forks_count"]);
        console.log(forks);
      })
  }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <div style={{backgroundImage: `url("https://www.theindianwire.com/wp-content/uploads/2020/04/Flipkart.png")`,backgroundSize:"cover",height:"100vh"}}>
    <div>
      <Typography variant="h1" component="h2" style={{ textAlign: "center",color:"yellow" }}>
        OSS Inspector
      </Typography>
      <div style={{textAlign:"center",margin:"30px"}}>
      <TextField
        style = {{width: '600px', textAlign:'center', outlineColor:"red"}}
        id="outlined-basic"
        label="URL"
        variant="outlined"
        value={value}
        onChange={(val) => {
          setvalue(val.target.value);
          // fetchData();
          // console.log(val.target.value);
        }}
      />
      <Button onClick={()=>{fetchData()}} variant="contained" color="primary" style={{marginLeft:"40px",marginTop:"8px"}}>Contained</Button>
      </div>
    </div>
    </div>
  );
}

export default Homepage;
