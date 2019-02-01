import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchased: false
  };

  //only purchaseable if total ingredients is greater than 0
  //turning ingredients object into array of keys,
  //mapping to get array of values
  //reducing into sum of total ingredients
  updatePurchase(ingredients) {
    const ingTotal = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);

    this.setState({ purchaseable: ingTotal > 0 });
  }

  addIngredientHandler = type => {
    const origCount = this.state.ingredients[type];
    const updatedCount = origCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const origPrice = this.state.totalPrice;
    const newPrice = origPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const origCount = this.state.ingredients[type];
    const updatedCount = origCount - 1;
    //condition for negative ingredients
    if (origCount <= 0) {
      return;
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const origPrice = this.state.totalPrice;
    const newPrice = origPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchase(updatedIngredients);
  };

  //puchase handler actions
  purchaseHandler = () => {
    this.setState({ purchased: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchased: false });
  };

  continuePurchaseHandler = () => {
    alert("Continue!!");
  };

  render() {
    //disabling the less button if ingredients are 0
    const disabledIng = {
      ...this.state.ingredients
    };
    //setting values to true or false when ing are at 0
    for (let key in disabledIng) {
      disabledIng[key] = disabledIng[key] <= 0;
    }
    // EX. => {salad: true, meat: false, etc...}

    return (
      <Aux>
        <Modal
          show={this.state.purchased}
          modalClosed={this.cancelPurchaseHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.cancelPurchaseHandler}
            purchaseContinue={this.continuePurchaseHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          disabled={disabledIng}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
