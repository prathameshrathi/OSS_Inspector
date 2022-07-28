import React, { useState, useEffect } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import moment from "moment";

function Homepage() {
  const [value, setvalue] = useState("");
  const [users, setUsers] = useState();
  const [forks, setForks] = useState();
  const [stars, setStars] = useState();
  const [closedissue, setClosedissue] = useState();
  const [contributors, setContributors] = useState();
  const [cmf, setCmf] = useState(0);
  const [created_at,setCreationDate] = useState();
  const [updated_at,setUpdationDate] = useState();
  const [releases,setReleases] = useState();
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
  const fetchData = () => {
    var data;
    fetch(value).then((response) => {
      return response.json();
    })
    .then((data) => {
    setForks(data["forks_count"]);
    setStars(data["stargazers_count"]);
    var date1 = moment.utc(data["created_at"]).format("MM/DD/YYYY");
    var date2 = moment.utc(data["updated_at"]).format("MM/DD/YYYY");
    console.log(date1);
    var today = new Date();
    var yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    var formattedToday = `${mm} + / + ${dd} + / + ${yyyy}`;
    formattedToday = moment.
    date1 = Math.abs(formattedToday - date1);
    date2 = Math.abs(formattedToday - date2);
    date1 = Math.ceil(date1 / (1000 * 60 * 60 * 24));
    date2 = Math.ceil(date2 / (1000 * 60 * 60 * 24));
    console.log(date1);
    setCreationDate(date1);
    setUpdationDate(date2);
    fetchParams();
    });
    // .then(()=>{
    //   setForks(data["forks_count"]);
    //   setStars(data["stargazers_count"]);
    //   setForks(data["forks_count"]);
    //   setForks(data["forks_count"]);
    //   console.log(forks);
    //   fetchCommit();
    // })
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
    <div
      style={{
        backgroundImage: `url("https://www.theindianwire.com/wp-content/uploads/2020/04/Flipkart.png")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Typography
          variant="h1"
          component="h2"
          style={{ textAlign: "center", color: "yellow" }}
        >
          OSS Inspector
        </Typography>
        <div style={{ textAlign: "center", margin: "30px" }}>
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
              fetchData();
            }}
            variant="contained"
            color="primary"
            style={{ marginLeft: "40px", marginTop: "8px" }}
          >
            Contained
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
