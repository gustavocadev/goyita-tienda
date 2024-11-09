import { getContext, setContext } from 'svelte';

const cartStore = () => {
  let isOpenCartSheet = $state(false);
  let quantityCartSheet = $state(0);
  let cartItems = $state([]);
  let total = $state(0);

  const toggleCartSheet = () => {
    isOpenCartSheet = !isOpenCartSheet;
  };

  const setOpenCartSheet = (value: boolean) => {
    isOpenCartSheet = value;
  };

  const incrementQuantity = () => {
    quantityCartSheet += 1;
  };

  const decrementQuantity = () => {
    quantityCartSheet -= Math.min(quantityCartSheet, 1);
  };

  return {
    isOpenCartSheet() {
      return isOpenCartSheet;
    },
    quantityCartSheet() {
      return quantityCartSheet;
    },
    toggleCartSheet,
    incrementQuantity,
    decrementQuantity,
    setOpenCartSheet,
  };
};

const CART_CTX_ID = 'cartcontext';

export const setCartContextProvider = () => {
  // const store = new CartStore();
  const store = cartStore();
  return setContext(CART_CTX_ID, store);
};

export const getCartContext = () => {
  return getContext<ReturnType<typeof cartStore>>(CART_CTX_ID);
};
