import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { Axios } from "axios";

function Homepage() {
  const [value, setvalue] = useState("");
  return (
    <div style={{backgroundImage: `url("https://www.theindianwire.com/wp-content/uploads/2020/04/Flipkart.png")`,backgroundSize:"cover",height:"100vh"}}>
    <div>
      <Typography variant="h1" component="h2" style={{ textAlign: "center" }}>
        OSS Inspector
      </Typography>
      <div style={{textAlign:"center",margin:"30px"}}>
      <TextField
        style = {{width: '600px', textAlign:'center'}}
        id="outlined-basic"
        label="URL"
        variant="outlined"
        value={value}
        onChange={(val) => {
          setvalue(val.target.value);
          // console.log(val.target.value);
        }}
      />
      <Button variant="contained" color="primary" style={{marginLeft:"40px",marginTop:"8px"}}>Contained</Button>
      </div>
    </div>
    </div>
  );
}

export default Homepage;
