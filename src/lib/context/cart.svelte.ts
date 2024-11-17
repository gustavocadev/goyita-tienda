import { getContext, onMount, setContext } from 'svelte';

type ProductCart = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  img: string[];
};

const cartStore = () => {
  let isOpenCartSheet = $state({ value: false });
  let cartItems = $state<{ value: ProductCart[] }>({ value: [] });
  let isCartItemsLoading = $state({ value: true });
  let isUserLoggedIn = $state({ value: false });

  const getTotalAmount = () => {
    const totalAmount = cartItems.value.reduce((acc, cartItem) => {
      return acc + cartItem.price * cartItem.quantity;
    }, 0);
    return totalAmount;
  };

  onMount(() => {
    if (!isUserLoggedIn.value) {
      const cartProductItems = localStorage.getItem('cartItems');
      if (cartProductItems) {
        setCartItems(JSON.parse(cartProductItems));
        isCartItemsLoading.value = false;
        return;
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    }
    isCartItemsLoading.value = false;
  });

  $effect(() => {
    if (!isUserLoggedIn.value) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    }
  });

  $effect(() => {
    if (isUserLoggedIn.value) {
      localStorage.clear();
    }
  });

  const toggleCartSheet = () => {
    isOpenCartSheet.value = !isOpenCartSheet.value;
  };

  const setOpenCartSheet = (value: boolean) => {
    isOpenCartSheet.value = value;
  };

  const incrementQuantity = (id: string) => {
    cartItems.value = cartItems.value.map((item) => {
      if (item.productId !== id) return item;

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });
  };

  const decrementQuantity = (id: string) => {
    cartItems.value = cartItems.value.map((item) => {
      if (item.productId !== id) return item;

      return {
        ...item,
        quantity: item.quantity - 1,
      };
    });
  };

  const removeCartItem = (id: string) => {
    cartItems.value = cartItems.value.filter((item) => item.productId !== id);
  };

  const addCartItem = (item: ProductCart) => {
    cartItems.value = [...cartItems.value, item];
  };

  const setCartItems = (items: ProductCart[]) => {
    cartItems.value = items;
  };

  const setIsUserLoggedIn = (value: boolean) => {
    isUserLoggedIn.value = value;
  };

  return {
    isOpenCartSheet,
    cartItems,
    isCartItemsLoading,
    addCartItem,
    toggleCartSheet,
    incrementQuantity,
    decrementQuantity,
    setOpenCartSheet,
    removeCartItem,
    setCartItems,
    setIsUserLoggedIn,
    getTotalAmount,
    isUserLoggedIn,
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
