export const initialState = {
  basket: [],
};

// Selector
//for subtotal in total amount
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  // console.log(action); //to see the state value on console

  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      //it will remove all the same product on checkout page but we want to remove only the product on which we press the reomve button.
      // return {
      //   ...state,
      //   basket: state.basket.filter((item) => item.id !== action.id),
      // };

      // so the  best way to remove the item from the basket by using item index inside basket array
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      //copy the state.basket i.e whatever item we add to cart that array will get copy to newBasket variable.
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1); //splice the  array here with index value
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
