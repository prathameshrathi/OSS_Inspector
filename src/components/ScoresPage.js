import React, { useState } from 'react'
import { Typography,Card,Grid,Box,CardContent} from "@material-ui/core";
import ReactScoreIndicator from "react-score-indicator"

function ScoresPage(props) {
    
    // console.log(props.params.score);
  return (
    <div>
      <Typography
        variant="h2"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        Repository Analysis
      </Typography>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        Repository Score
      </Typography>
      <ReactScoreIndicator
        value={props.params.score}
        maxValue={10}
        lineWidth={10}
      />
      {props.params.score < 4 && (
        <Typography style={{ color: "red", textAlign: "center" }}>
          Repository scan score is too low.
          <br /> It might contain malicious code !!
        </Typography>
      )}
      {props.params.score >= 4 && props.params.score <= 7 && (
        <Typography
          variant="h5"
          style={{ color: "orange", textAlign: "center" }}
        >
          Average Repository Score! <br/>Less chances of malicious code.
        </Typography>
      )}
      {props.params.score > 7 && (
        <Typography
          variant="h5"
          style={{ color: "Green", textAlign: "center" }}
        >
          Repository score is high.<br/> It's Good to Go!!
        </Typography>
      )}
      {/* <div textAlign='center'> */}
      <Box position={"center"} sx={{ flexGrow: 1 }} style={{ margin: "90px" }}>
        <Grid container spacing={2}>
          <Grid md={3} xs={6} item spacing={1}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Stars
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.stars}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Forks
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.forks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Contributors
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.pullRequestContributors}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Created Since
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.created_at} days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Closed Issues
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.closedIssues}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Last Updated
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.updated_at} days ago
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Total Commits
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.commitCount4W}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={6} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Releases
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {props.params.releases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
    // </div>
  );
}

export default ScoresPage