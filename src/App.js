import React from "react"
// import ReactDOM from "react-dom"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "./styles.css"

toast.configure()

//const STRIPE_BACKEND = process.env.STRIPE_BACKEND
const STRIPE_BACKEND = "https://simple-stripe-server.herokuapp.com"

function App() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car"
  })

  async function handleToken(token, addresses) {
    console.log("Backend", STRIPE_BACKEND)
    const response = await axios.post(STRIPE_BACKEND + "/checkout", {
      token,
      product
    })
    const { status } = response.data
    console.log("Response:", response.data)
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" })
    } else {
      toast("Something went wrong", { type: "error" })
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_BKBoCLMOI0snhHQ7UUrglIbC00r6AUe8da"
        token={handleToken}
        amount={product.price * 100}
        name={product.name}
        billingAddress
        shippingAddress
      />
    </div>
  )
}

export default App
