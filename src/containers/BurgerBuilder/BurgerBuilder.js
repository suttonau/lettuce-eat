import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },

    totalPrice: 4
  };

  addIngredientHandler = type => {
    const origCount = this.state.ingredients[type];
    const updatedCount = origCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const origPrice = this.state.totalPrice;
    const newPrice = origPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
  };

  removeIngredientHandler = type => {
    const origCount = this.state.ingredients[type];
    //condition for negative ingredients, if negative return nothing
    if (origCount <= 0) {
      return;
    }
    const updatedCount = origCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const origPrice = this.state.totalPrice;
    const newPrice = origPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
  };
  render() {
    //disabling the less button if ingredients are 0
    const disabledIng = {
      ...this.state.ingredients
    };
    //setting values to true or false if ingredients are at 0
    for (let key in disabledIng) {
      disabledIng[key] = disabledIng[key] <= 0;
    }
    // {salad: true, meat: false, etc...}

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledIng}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
