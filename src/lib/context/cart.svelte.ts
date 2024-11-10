import { getContext, onMount, setContext } from 'svelte';

type ProductCart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const cartStore = () => {
  let isOpenCartSheet = $state(false);
  let cartItems = $state<ProductCart[]>([]);
  let total = $state(0);
  let isCartItemsLoading = $state(true);

  onMount(() => {
    const cartProductItems = localStorage.getItem('cartItems');
    if (cartProductItems) {
      setCartItems(JSON.parse(cartProductItems));
      isCartItemsLoading = false;
    }
  });

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

  const setCartItems = (items: ProductCart[]) => {
    cartItems = items;
  };

  return {
    isOpenCartSheet() {
      return isOpenCartSheet;
    },
    cartItems() {
      return cartItems;
    },
    isCartItemsLoading() {
      return isCartItemsLoading;
    },
    addCartItem,
    toggleCartSheet,
    incrementQuantity,
    decrementQuantity,
    setOpenCartSheet,
    removeCartItem,
    setCartItems,
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
