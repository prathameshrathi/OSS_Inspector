import React from "react";
import Homepage from "./components/homepage";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import ScoresPage from "./components/ScoresPage";
// import { TextField } from "@material-ui/core";

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/analysis" element={<ScoresPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
