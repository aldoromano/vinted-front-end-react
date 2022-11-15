import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";

const Offer = ({ urlBase, token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      //const response = await axios.get("http://localhost:3200/");
      const response = await axios.get(`${urlBase}/offer/${id}`);
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [urlBase, id]);

  return isLoading ? (
    <p>En cours de chargement </p>
  ) : (
    <div className="offer-container">
      <div className="offer-image">
        <img src={data.product_image.url} alt="product_image" />
      </div>
      <div className="offer-data">
        <div className="offer-price">{data.product_price} €</div>
        <div className="offer-detail">
          {/* Je parcours product_details, à chaque tour je récupère le nom de la clef de l'objet du tour */}
          {data.product_details.map((detail, index) => {
            const objectKey = Object.keys(detail)[0];
            //   console.log(objectKey);
            return (
              <div key={index}>
                {/* J'affiche la clef de l'objet */}
                <span>{objectKey} : </span>
                {/* J'affiche le contenu de la clef */}
                <span>{detail[objectKey]}</span>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="product-name-container">{data.product_description}</div>
        <div className="product-desc-container">{data.product_name}</div>
        {data.owner && (
          <div className="product-owner">{data.owner.account.username}</div>
        )}
        <Link
          to="/payment"
          token={token}
          state={{ title: data.product_name, price: "12" }}
        >
          <button>Acheter Maintenant</button>
        </Link>
      </div>
    </div>
  );
};

export default Offer;
