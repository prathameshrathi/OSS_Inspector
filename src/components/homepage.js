import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button } from "@material-ui/core";

function Homepage() {
  const [value, setvalue] = useState("");

  const [users,setUsers] = useState();

  const [forks,setForks] = useState();
  const [stars,setStars] = useState();
  const [closedissue,setClosedissue] = useState();
  const [contributors,setContributors] = useState();
  const [cmf,setCmf] = useState();
  let navigate = useNavigate();

  const FetchData = () => {
    fetch(value)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setForks(data["forks_count"]);
        setStars(data["stargazers_count"]);
      });
      console.log(forks)
      navigate("/analysis", { state: { forks: forks } });
  }

  return (
    <div style={{backgroundSize:"cover",height:"100vh"}}>
    <div>
      <Typography variant="h1" component="h2" style={{ textAlign: "center",color:"black"}}>
        OSS Inspector
      </Typography>
      <div style={{textAlign:"center",margin:"27vh"}}>
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
      <Button onClick={()=>{FetchData()}} variant="contained" color="primary" style={{marginLeft:"40px",marginTop:"2px",height:"52px"}}>Show Analysis</Button>
      </div>
      <p>{forks}</p>
    </div>
    </div>
  );
}

export default Homepage;
