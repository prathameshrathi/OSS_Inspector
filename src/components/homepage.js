import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import ScoresPage from "./ScoresPage";
import getRepositoryScore from "../github-score";
import axios from "axios";
import Alert from "@mui/material/Alert";
import "../index.css"

function Homepage() {
  const [value, setvalue] = useState("");
  const [flag, setflag] = useState(false);
  const [forks, setForks] = useState(0);
  const [stars, setStars] = useState(0);
  const [closedissue, setClosedissue] = useState(0);
  const [contributors, setContributors] = useState(0);
  const [cmf, setCmf] = useState(0);
  const [created_at, setCreationDate] = useState(0);
  const [updated_at, setUpdationDate] = useState(0);
  const [releases, setReleases] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setstatus] = useState(200);
  const myref = useRef(null);

    var additionalParams = {
    forks: forks,
    stars: stars,
    closedIssues: closedissue,
    pullRequestContributors: contributors,
    commitCount4W: cmf,
    created_at: created_at,
    updated_at: updated_at,
    releases: releases,
    score: score,
  };

  const FetchData = async () => {
    var url;
    console.log(myref.current);

    if (value.substring(0, 8) === "https://") {
      url = "https://api.github.com/repos/" + value.substring(19);
    } else {
      url = "https://api.github.com/repos/" + value.substring(11);
    }
    
    const res = await axios.get(url).catch(({ response }) => {
      setstatus(response.status);
      setflag(false);
    });
    setstatus(res.status);
    console.log(status);
    setForks(res.data["forks_count"]);
    console.log(forks);
    setStars(res.data["stargazers_count"]);

    var date1 = moment.utc(res.data["created_at"]).format("YYYY/MM/DD");
    var date2 = moment.utc(res.data["updated_at"]).format("YYYY/MM/DD");

    var today = new Date();
    today = moment(today).format("YYYY/MM/DD");
  
    date1 = new Date(today) - new Date(date1);
    date2 = new Date(today) - new Date(date2);
    date1 = Math.ceil(date1 / (1000 * 60 * 60 * 24));
    date2 = Math.ceil(date2 / (1000 * 60 * 60 * 24));
    
    setCreationDate(date1);
    setUpdationDate(date2);
    setflag(true);
    fetchParams(url);
  };

  const fetchParams = async (url) => {

    const commit_url = url + "/commits";
    const contri_url = url + "/contributors";
    const closedissues_url = url + "/issues?state=closed";
    const releases_url = url + "/releases";

    var res = await axios.get(commit_url);
    setCmf(res.data.length);

    var res1 = await axios.get(contri_url);
    setContributors(res1.data.length);
    
    var res2 = await axios.get(closedissues_url);
    setClosedissue(res2.data.length);
    
    var res3 = await axios.get(releases_url);
    setReleases(res3.data.length);
  };

  useEffect(() => {
    const temp = getRepositoryScore(additionalParams);
    console.log(temp);
    setScore(temp);
    myref.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [additionalParams]);

  return (
    <div>
      <div>
        {flag === false && (
          <Typography
            variant="h1"
            component="h2"
            style={{ textAlign: "center", color: "black",fontFamily: 'Anton'}}
          >
            OSS Inspector
          </Typography>
        )}
        {flag === true && (
          <Typography
            variant="h3"
            component="h2"
            style={{
              textAlign: "center",
              color: "black",
              bottomMargin: "-30px",
            }}
          >
            OSS Inspector
          </Typography>
        )}

        <div style={{ textAlign: "center", margin: "10vh" }}>
          <TextField
            style={{ width: "50%", textAlign: "center", outlineColor: "red" }}
            id="outlined-basic"
            label="Github  Repository URL"
            variant="outlined"
            value={value}
            onChange={(val) => {
              setvalue(val.target.value);
            }}
          />
          <Button
            onClick={() => {
              FetchData();
            }}
            variant="contained"
            color="primary"
            style={{
              marginLeft: "40px",
              marginTop: "2px",
              height: "52px",
              width: "13%",
            }}
          >
            Show Analysis
          </Button>
          {status !== 200 && (
            <Alert
              severity="error"
              style={{
                alignItems: "center",
                width: "20%",
                marginLeft: "30%",
                marginTop: "20px",
              }}
            >
              <div>Invalid Repository URL. Try Again!</div>
            </Alert>
          )}
        </div>
      </div>
      <div ref={myref}>
        {flag === true && (
          <ScoresPage params={additionalParams} score={score} />
        )}
      </div>
    </div>
  );
}

export default Homepage;
