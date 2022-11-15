import { useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_votreCléPublique");

const Payment = () => {
  return (
    <div className="App">
      {/* Elements va devoir englober toute la logique de paiement. Je lui donne une props stripe qui contient ma stripePromise, pour montrer à Elements que je suis bien connecté à stripe */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
