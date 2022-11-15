import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ urlBase, token }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState(0);
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");

  // const [data, setData] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("picture", file);

      const response = await axios.post(`${urlBase}/offer/publish`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      //   setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
    }
  };
  return token ? (
    <div className="publish-container">
      <form onSubmit={handleSubmit}>
        <h1> Vends ton article</h1>
        <div className="publish-general-container">
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>
        <div className="publish-general-container">
          <div className="publish-item-container">
            {" "}
            <p> Titre</p>
            <input
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              placeholder="Ex : Jupe soirée chic"
            />
          </div>

          <div className="publish-item-container">
            <p>Décris ton article</p>
            <input
              type="textarea"
              cols="30"
              rows="5"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              placeholder="Ex : Jamais porté suite perte de poids ! Excellent état général. Idéal pour soirées semi-habillées"
            />
          </div>
        </div>

        <div className="publish-general-container">
          <div className="publish-item-container">
            <p>Marque</p>
            <input
              type="text"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              placeholder="Ex : Nike"
            />
          </div>

          <div className="publish-item-container">
            <p>Taille</p>
            <input
              type="text"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
              placeholder="Ex : 38 / 40"
            />
          </div>

          <div className="publish-item-container">
            <p>Couleur</p>
            <input
              type="text"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
              placeholder="Ex : Blanc, rouge, vert..."
            />
          </div>

          <div className="publish-item-container">
            <p>Etat</p>
            <input
              type="text"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
              placeholder="Ex : Neuf, bon état"
            />
          </div>

          <div className="publish-item-container">
            <p>Emplacement</p>
            <input
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
              placeholder="Ex : Paris, Londres, Carcassonne"
            />
          </div>
        </div>
        <div className="publish-general-container">
          <div className="publish-item-container">
            <p>Prix</p>
            <input
              type="text"
              value={price ? price : ""}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              placeholder="Ex : 25 €"
            />
          </div>
          <div className="publish-item-last-container">
            <input type="checkbox" />{" "}
            <p>Je suis intéressé(e) par les échanges</p>
          </div>
        </div>
        <div className="publish-button-container">
          <input type="submit" value="ajouter" />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
