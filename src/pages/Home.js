import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import banner from "../assets/images/banner.jpg";

const Home = ({ urlBase, urlFilter }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log("Home urlFilter -> ", urlFilter);

  useEffect(() => {
    const fetchData = async () => {
      //const response = await axios.get("http://localhost:3200/");
      const response = await axios.get(`${urlBase}/offers${urlFilter}`);
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [urlBase, urlFilter]);

  return isLoading ? (
    <p> En cours de chargement </p>
  ) : (
    <main>
      <div className="main-container">
        <div className="banner-container">
          <img src={banner} alt="banner"></img>
        </div>

        <div className="images-container">
          {data.offers.map((elem) => {
            // console.log(elem);
            return (
              elem.owner && (
                <Link
                  to={`/offer/${elem._id}`}
                  key={elem._id}
                  className="offer-card-container"
                >
                  <div className="header-image-container">
                    {elem.owner && (
                      <img
                        src={elem.owner.account.avatar?.secure_url}
                        alt="owner"
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                    )}
                    {elem.owner && <span>{elem.owner.account.username}</span>}
                  </div>
                  <div className="image-container">
                    <img
                      src={elem.product_image.secure_url}
                      alt="product-rep"
                    ></img>
                  </div>

                  <div>
                    <p>{elem.product_price} €</p>
                    {elem.product_details.map((detail, index) => {
                      if (detail.TAILLE) {
                        return <p key={index}>{detail.TAILLE}</p>;
                      } else {
                        return null;
                      }
                    })}
                    {elem.product_details.map((detail, index) => {
                      if (detail.MARQUE) {
                        return <p key={index}>{detail.MARQUE}</p>;
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
