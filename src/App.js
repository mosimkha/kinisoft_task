import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import AllNews from "./component/AllNews";
import { About } from "./component/About";
import NavBar from "./component/NavBar";
import { Footer } from "./component/Footer";
import Countrywise from "./component/Countrywise";

function App() {
  const API_KEY = "ae52decd4e898de2bfaf073aaca8930a";

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get(`http://api.mediastack.com/v1/news?access_key=${API_KEY}`).then(
      (posRes) => {
        const { data } = posRes.data;
        // console.log("data1");
        setUserData(data);
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllNews userData={userData} />} />
          <Route path="/about" element={<About />} />
          <Route path=":name" element={<Countrywise />} />
          <Route path="*" element={<h1>ERROR 404</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
