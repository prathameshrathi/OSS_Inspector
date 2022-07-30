
import { useNavigate } from "react-router-dom";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import ScoresPage from "./ScoresPage";

function Homepage() {
  const [value, setvalue] = useState("");
  const [flag,setflag] = useState(false);
  const [forks, setForks] = useState(0);
  const [stars, setStars] = useState(0);
  const [closedissue, setClosedissue] = useState(0);
  const [contributors, setContributors] = useState(0);
  const [cmf, setCmf] = useState(0);
  const [created_at,setCreationDate] = useState(0);
  const [updated_at,setUpdationDate] = useState(0);
  const [releases,setReleases] = useState(0);
  const [score,setScore] = useState(0);

  var additionalParams = {
    "forks":forks,
    "stars":stars,
    "closedIssues":closedissue,
    "pullRequestContributors":contributors,
    "commitCount4W":cmf,
    "created_at":created_at,
    "updated_at":updated_at,
    "releases":releases
  }
  const FetchData = () => {
    var url;
    if(value.substring(0,8)==="https://"){
        url = "https://api." + value.substring(8); 
    }
    else{
      url = "https://api." + value;
    }
    fetch(url).then((response) => {
      return response.json();
    })
    .then((data) => {
    setForks(data["forks_count"]);
    setStars(data["stargazers_count"]);

    var date1 = moment.utc(data["created_at"]).format("YYYY/MM/DD");
    var date2 = moment.utc(data["updated_at"]).format("YYYY/MM/DD");
    // console.log(date1);
    var today = new Date();
    today = moment(today).format("YYYY/MM/DD");
    // console.log(today)
    date1 = (new Date(today) - new Date(date1));
    date2 = (new Date(today) - new Date(date2));
    date1 = Math.ceil(date1 / (1000 * 60 * 60 * 24));
    date2 = Math.ceil(date2 / (1000 * 60 * 60 * 24));
    // console.log(date1);
    // console.log(date2);
    setCreationDate(date1);
    setUpdationDate(date2);
    setflag(true);
    fetchParams();
    });
   
  };

  const fetchParams = () => {
    console.log("Forks: " + forks);
    console.log("Stars: " + stars);
    const commit_url = value + "/commits";
    const contri_url = value + "/contributors";
    const closedissues_url = value + "/issues?state=closed";
    const releases_url = value + "/releases";
    // https://api.github.com/repos/ossf/criticality_score/issues?state=open
    fetch(commit_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCmf(data.length);
        // console.log(cmf);
      });
    fetch(contri_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContributors(data.length);
        // console.log(contributors);
      });
    fetch(closedissues_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setClosedissue(data.length);
        // console.log(closedissue);
      });
    fetch(releases_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReleases(data.length);
        // console.log(closedissue);
      });
      // console.log(created_at);
      // console.log(updated_at);
      
  };

  return (
    <div>
      <div style={{}}>
        <Typography
          variant="h1"
          component="h2"
          style={{ textAlign: "center", color: "black" }}
        >
          OSS Inspector
        </Typography>
        <div style={{ textAlign: "center", margin: "10vh" }}>
          <TextField
            style={{ width: "600px", textAlign: "center", outlineColor: "red" }}
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
          <Button
            onClick={() => {
              FetchData();
            }}
            variant="contained"
            color="primary"
            style={{ marginLeft: "40px", marginTop: "2px", height: "52px" }}
          >
            Show Analysis
          </Button>{" "}
        </div>
      </div>
      {flag===true &&  <ScoresPage params={additionalParams}/>}
    </div>
  );
}

export default Homepage;
