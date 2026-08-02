import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (product) => {

    if (wishlist.some((item) => item._id === product._id)) {
      toast.info("Already in Wishlist ❤️");
      return;
    }

    setWishlist((prevWishlist) => [
      ...prevWishlist,
      product
    ]);

    toast.success(`${product.name} added to Wishlist ❤️`);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;