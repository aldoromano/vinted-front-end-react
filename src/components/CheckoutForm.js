import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  // Permet de créer un paiement
  const stripe = useStripe();
  // Permet de récupérer les code banquaires dans l'input de carte banquaire
  const elements = useElements();
  const TAX_PROTECTION = 0.4;
  const TAX_SHIPPING = 0.8;

  const location = useLocation();
  const { price, title, id } = location.state;

  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //console.log("id -> ", id);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Je récupère le contenu de mon input de carte banquaire
      const cardElement = elements.getElement(CardElement);
      //   J'envoie ces informations à stripe pour qu'il me fournisse un token, on envoie les données banquaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: id,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log("token reçu depuis stripe : ", stripeToken);

      //   J'envoie le token reçu depuis stripe à mon backend
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          title: title,
          amount: price,
        }
      );
      if (response.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      } else {
        alert("Une erreur est survenue");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit}>
        <h2>Résumé de la commande : {title}</h2>
        <div className="payment-elements-container">
          <div className="payment-element-container">
            <p>Commande</p>
            <p>{price} €</p>
          </div>

          <div className="payment-element-container">
            <p>Frais de protection acheteurs</p>
            <p>{TAX_PROTECTION} €</p>
          </div>
          <div className="payment-element-container">
            <p>Frais de port</p>
            <p>{TAX_SHIPPING} €</p>
          </div>
          <hr></hr>
        </div>
        <CardElement />
        {isLoading ? (
          <p>Loading...</p>
        ) : completed ? (
          <p>Paiement effectué</p>
        ) : (
          <input type="submit" />
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
