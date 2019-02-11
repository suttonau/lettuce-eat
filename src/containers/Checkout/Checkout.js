import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']... turning into object below
      //the '+' before param[1] makes it a number
      newIngredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: newIngredients });
    console.log(newIngredients);
    console.log(this.state);
  }

  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckoutContinued={this.onCheckoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
