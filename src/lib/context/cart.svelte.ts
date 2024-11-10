import { getContext, setContext } from 'svelte';

type ProductCart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const cartStore = () => {
  let isOpenCartSheet = $state(false);
  let cartItems = $state<ProductCart[]>([
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      quantity: 1,
      img: 'https://placehold.co/64x64',
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      quantity: 1,
      img: 'https://placehold.co/64x64',
    },
    {
      id: '3',
      name: 'Product 3',
      price: 300,
      quantity: 1,
      img: 'https://placehold.co/64x64',
    },
  ]);
  let total = $state(0);

  const toggleCartSheet = () => {
    isOpenCartSheet = !isOpenCartSheet;
  };

  const setOpenCartSheet = (value: boolean) => {
    isOpenCartSheet = value;
  };

  const incrementQuantity = (id: string) => {
    cartItems = cartItems.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });
  };

  const decrementQuantity = (id: string) => {
    cartItems = cartItems.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity: item.quantity - 1,
      };
    });
  };

  const removeCartItem = (id: string) => {
    cartItems = cartItems.filter((item) => item.id !== id);
  };

  const addCartItem = (item: ProductCart) => {
    cartItems = [...cartItems, item];
  };

  return {
    isOpenCartSheet() {
      return isOpenCartSheet;
    },
    cartItems() {
      return cartItems;
    },
    addCartItem,
    toggleCartSheet,
    incrementQuantity,
    decrementQuantity,
    setOpenCartSheet,
    removeCartItem,
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
