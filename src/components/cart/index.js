import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FcShipped } from "react-icons/fc";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState(props.cart);

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
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

    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
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

    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateSalesTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.1; // Assuming sales tax is 10% of the subtotal
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const salesTax = calculateSalesTax();
    return subtotal + salesTax;
  };

  return (
    <>
      <div className="flex relative">
        <div className="flex absolute justify-between gap-1 flex-col select-none lg:w-[20rem] bg-[#ffffffbe] md:w-[20rem] bg- sm:w-[17rem] w-[20rem] backdrop-blur-3xl p-1 right-0 z-10 top-20">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="h-12 wrapper flex justify-between gap-1 items-center bg-white"
            >
              <div className="image-section w-14 h-14 rounded-full">
                <img
                  src={item.thumbnail}
                  alt="loading..."
                  className="w-full h-full object-cover rounded-full p-1"
                />
              </div>
              <div className="product-name text-sm font-sans">{item.name}</div>
              <div className="product-price text-sm font-sans">
                Rs.{item.price}
              </div>
              <div className="product-inc-btn items-center text-sm font-sans flex gap-1">
                <h1>{item.quantity}</h1>
                <div className="btn-sec flex flex-col justify-end items-end">
                  <AiOutlineCaretUp onClick={() => handleIncrement(item.id)} />
                  <AiOutlineCaretDown
                    onClick={() => handleDecrement(item.id)}
                  />
                </div>
              </div>
              <div className="remove-btn text-sm font-sans">
                <button
                  className="bg-[#ff3f6c] text-white rounded-sm w-full p-1"
                  onClick={() => {
                    const updatedCartItems = cartItems.filter(
                      (cartItem) => cartItem.id !== item.id
                    );
                    setCartItems(updatedCartItems);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1 mt-10">
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Subtotal:</h1>
              <h1>Rs.{calculateSubtotal().toFixed(2)}</h1>
            </div>
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Sales Tax:</h1>
              <h1>Rs.{calculateSalesTax().toFixed(2)}</h1>
            </div>
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Coupon:</h1>
              <h1>Add Coupon</h1>
            </div>
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Grand Total:</h1>
              <h1>Rs.{calculateGrandTotal().toFixed(2)}</h1>
            </div>
            <div className="flex justify-end">
              <div className="w-[50%] flex justify-between items-center mt-10">
                <h1 className="text-[12px]">
                  Congrats you're eligible for Free Shipping
                </h1>
                <h1>
                  <FcShipped />
                </h1>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-[50%] flex justify-between items-center mt-3 mb-2">
                <button className="bg-[#ff3f6c] text-white rounded-md w-full p-2">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
