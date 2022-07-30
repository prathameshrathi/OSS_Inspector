import React, { useState } from 'react'
import { Typography,Card,Grid,Box,CardContent} from "@material-ui/core";
import ReactScoreIndicator from "react-score-indicator"

function ScoresPage({params}) {
    
    console.log(params);
    const[score,setScore] = useState(1);
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
      <ReactScoreIndicator value={score} maxValue={10} lineWidth={10} />
      {score <= 5 && (
        <Typography style={{ color: "red", textAlign: "center" }}>
          Repository scan score is too low.<br/> It might contain malicious code !.
        </Typography>
      )}
      {score > 5 && score<=7 && (
        <Typography variant="h5" style={{ color: "yellow", textAlign: "center" }}>
          Average Repository
        </Typography>
      )}
      {score>7 && (
        <Typography variant="h5" style={{ color: "Green", textAlign: "center" }}>
          Very Safe repository
        </Typography>
      )}
      {/* <div textAlign='center'> */}
      <Box position={'center'} sx={{ flexGrow: 1 }} style={{ margin: "90px" }}>
        <Grid container spacing={2}>
          <Grid xs={3} item spacing={1}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Stars
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.stars}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Forks
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.forks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Contributors
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.pullRequestContributors}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Created Since
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.created_at} days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Closed Issues
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.closedIssues}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Last Updated
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.updated_at} days ago
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={3} item spacing={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Total Commits
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {params.commitCount4W}
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