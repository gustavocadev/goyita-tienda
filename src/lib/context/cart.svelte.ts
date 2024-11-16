import { getContext, onMount, setContext } from 'svelte';

type ProductCart = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  img?: string | undefined;
};

const cartStore = () => {
  let isOpenCartSheet = $state(false);
  let cartItems = $state<ProductCart[]>([]);
  let isCartItemsLoading = $state(true);
  let isUserLoggedIn = $state(false);

  let totalAmount = $derived(
    cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.price * cartItem.quantity;
    }, 0)
  );

  onMount(() => {
    if (!isUserLoggedIn) {
      const cartProductItems = localStorage.getItem('cartItems');
      if (cartProductItems) {
        setCartItems(JSON.parse(cartProductItems));
        isCartItemsLoading = false;
        return;
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      isCartItemsLoading = false;
    }
  });

  $effect(() => {
    if (!isUserLoggedIn) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  });

  $effect(() => {
    if (isUserLoggedIn) {
      localStorage.clear();
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
      if (item.productId !== id) return item;

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });
  };

  const decrementQuantity = (id: string) => {
    cartItems = cartItems.map((item) => {
      if (item.productId !== id) return item;

      return {
        ...item,
        quantity: item.quantity - 1,
      };
    });
  };

  const removeCartItem = (id: string) => {
    cartItems = cartItems.filter((item) => item.productId !== id);
  };

  const addCartItem = (item: ProductCart) => {
    cartItems = [...cartItems, item];
  };

  const setCartItems = (items: ProductCart[]) => {
    cartItems = items;
  };

  const setIsUserLoggedIn = (value: boolean) => {
    isUserLoggedIn = value;
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
    setIsUserLoggedIn,
    totalAmount() {
      return totalAmount;
    },
    isUserLoggedIn() {
      return isUserLoggedIn;
    },
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
