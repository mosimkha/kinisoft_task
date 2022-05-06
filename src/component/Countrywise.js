//4kenisoft

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import fallback from "./fallback.png";

const Countrywise = () => {
  const API_KEY = "ae52decd4e898de2bfaf073aaca8930a";

  const params = useParams();
  const { name } = params;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=${name}`
      )
      .then(
        (posRes) => {
          // console.log(posRes);
          const { data } = posRes.data;
          // console.log("data2");
          setUserData(data);
        },
        (errRes) => {
          console.log(errRes);
        }
      );
  }, [name]);

  return (
    <div>
      <>
        <div className="container">
          <div className="row">
            {userData.map((user, index) => {
              const myimage = user.image === null ? fallback : user.image;
              return (
                <div className="   col-lg-4 col-md-6 col-12" key={index}>
                  <div className="card m-4 p-3">
                    <div className="position-absolute top-0 start-3 text-black-50">
                      {user.id}
                    </div>

                    <div className="card-body">
                      <img
                        src={myimage}
                        className="card-img-top "
                        alt="Image Not Found"

                      />
                      <h5 className="card-text">
                        {user.title}

                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {user.country}

                        </span>
                      </h5>
                      <p className="card-text">{user.description}</p>

                      <p className="card-text">
                        <small className="text-muted">
                          By {!user.author ? "Unknown" : user.author} on {""}
                          {new Date(user.published_at).toGMTString()}
                        </small>
                      </p>

                      <a
                        rel="noreferrer"
                        href={user.url}
                        target="_blank"
                        className="btn btn-sm btn-warning"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    </div>
  );
};

export default Countrywise;
