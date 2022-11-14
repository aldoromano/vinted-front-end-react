import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import banner from "../assets/images/banner.jpg";

import Pagination from "../components/Pagination";

const Home = ({
  urlBase,
  pageNumber,
  setPageNumber,
  limit,
  setLimit,
  searchText,
  priceMin,
  priceMax,
  orderBy,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let urlFilter = "?";
      urlFilter += "page=" + (pageNumber ? pageNumber : 1);
      urlFilter += "&limit=" + (limit ? limit : 8);

      // Le texte de recherche
      urlFilter += searchText ? "&title=" + searchText : "";

      // Les prix min/max
      urlFilter += priceMin ? "&priceMin=" + priceMin : "";
      urlFilter += priceMax ? "&priceMax=" + priceMax : "";

      // Le tri
      urlFilter += orderBy ? "&sort=" + orderBy : "";
      console.log("Home UrlFilter générée -> ", urlFilter);

      // Requête axios vers backend REACTEUR
      const response = await axios.get(`${urlBase}/offers${urlFilter}`);
      // On élimine les offres qui n'ont pas d'owner
      // const data = response.data.offers.filter((elem) => elem.owner !== null);
      // data.count = response.data.count - ( response.data.countdata.length;
      console.log(response.data);
      // setData(data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [urlBase, pageNumber, limit, searchText, priceMax, priceMin, orderBy]);

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
                        style={{ height: 30, width: 30, borderRadius: 30 }}
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

        <Pagination
          data={data}
          setPageNumber={setPageNumber}
          setLimit={setLimit}
          limit={limit}
        ></Pagination>
      </div>
    </main>
  );
};

export default Home;
