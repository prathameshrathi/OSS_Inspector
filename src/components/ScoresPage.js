import React from 'react'
import {useLocation} from 'react-router-dom'
import { Typography } from "@material-ui/core";
import ReactScoreIndicator from "react-score-indicator"

function ScoresPage() {
    const {state} = useLocation()
    console.log(state);
  return (
    <div>
        <Typography variant='h2' style={{textAlign:"center"}}>Github Repository Analysis</Typography>
        <ReactScoreIndicator value={5} maxValue={10} lineWidth={10}/>
    </div>
  )
}

export default ScoresPage