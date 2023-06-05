import React, { useEffect, useState } from "react";
import "./CardsStyle.css";
import axios from "axios";

import { AiOutlineHeart } from "react-icons/ai";
import Cart from "./cart";

const Cards = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setData(response.data);
    });
  }, []);

  const openCart = () => {
    if (cart.length) {
      setOpen(!open);
    }
  };

  const addToCart = (cardId) => {
    const selectedCard = data.products.find((card) => card.id === cardId);
    const existingCard = cart.find((item) => item.id === cardId);

    if (existingCard) {
      alert("Card already in cart");
    } else {
      setCart([...cart, { ...selectedCard, quantity: 1 }]);
    }
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cart.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < 5) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          alert("You can't add more than 5");
          return item;
        }
      } else {
        return item;
      }
    });

    setCart(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cart.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          alert("You can't go less than 1");
          return item;
        }
      } else {
        return item;
      }
    });

    setCart(updatedCartItems);
  };

  return (
    <>
      {open ? (
        <Cart
          cart={cart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      ) : null}
      <div className="wrapper w-[100%] bg-gray-100">
        <div className="container lg:w-[80%] md:w-[90%] w-[100%] mx-auto">
          <div
            className=" cart-btn lg:w-12 lg:h-12 sm:w-11 sm:h-11 w-10 h-10 cursor-pointer border-2 p-5  border-[#ff9f00]  rounded-lg  absolute lg:right-10 lg:top-5 sm:right-5 sm:top-3 right-2 top-4 z-10 flex justify-center items-center transition-all duration-500"
            onClick={openCart}
          >
            <i className="fa fa-shopping-cart text-[1.9rem]"></i>
            <div className="px-[3px] py-[1px] absolute lg:-right-2 lg:-top-3 sm:-right-2 sm:-top-3 -right-1 -top-4 flex justify-center items-center bg-[#ff9f00] rounded-full">
              <h1 className="text-sm text-white">{cart.length}</h1>
            </div>
          </div>
          <div className="heading flex justify-center items-center p-2 border-b-2">
            <h1 className="text-black font-[500]  font-serif lg:text-[3rem] md:text-[2.7rem] text-[1.8rem]">
              Accessories
            </h1>
          </div>

          <div className="card-container grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-2 p-4">
            {data.products?.map((item) => {
              const dis_price = (item.price * item.discountPercentage) / 100;
              const total = item.price - dis_price;
              const decepoint = total.toFixed(2);
              return (
                <div
                  key={item.id}
                  className="bg-white cursor-pointer border-2 p-1 rounded-lg flex flex-col group justify-between"
                >
                  <div className="w-full h-[20rem] p-1 relative">
                    <img
                      src={item.thumbnail}
                      className="w-full h-full object-fill object-center rounded-lg group-hover:scale-105 transition-all duration-500"
                      alt={item.description}
                    />
                  </div>
                  <div className="content p-3">
                    <div>
                      <label className="text-[1rem] font-serif text-slate-800">
                        {item.description}
                      </label>
                    </div>
                    <div>
                      <label className="text-[1.4rem] font-serif text-slate-950 font-medium">
                        {item.brand}
                      </label>
                    </div>
                    <div>
                      <label className="text-[1.4rem] font-serif items-baseline">
                        <span>₹</span>
                        <span>{decepoint}</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex gap-2 text-[1.4rem] font-serif items-center">
                        <del>₹{item.price}</del>
                        <span className="text-sm font-sans bg-red-400 px-[3px] text-white rounded-3xl">
                          {item.rating}%
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="lg:flex justify-between items-center ">
                    <div className="lg:flex items-center gap-1 cursor-pointer bg-[#c4c9c8] text-[#000] p-[0.5rem] rounded-sm text-center uppercase font-[500]">
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      <label className="cursor-pointer">Buy Now</label>
                    </div>
                    <div
                      className="flex bg-[#9a9aa1] text-[#000] cursor-pointer p-[0.5rem] gap-1 justify-center items-center rounded-sm my-3 uppercase font-[500]"
                      onClick={() => addToCart(item.id)}
                    >
                      <i className="fa fa-cart-plus" aria-hidden="true"></i>
                      <label className="cursor-pointer">Add To Cart</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
