const updateCartQuantity = (productId, variantId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.variant.id === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };