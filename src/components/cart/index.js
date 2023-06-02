import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FcShipped } from "react-icons/fc";

const Cart = (props) => {
  console.log(props.cart);
  const [quantity, setQuantity] = useState(1);
  const [itemID, setItemID] = useState(0);
  return (
    <>
      <div className="flex relative">
        {/*   */}
        <div className="flex absolute justify-between gap-1 flex-col select-none lg:w-[20rem] bg-[#ffffffbe] md:w-[20rem] bg- sm:w-[17rem] w-[20rem] backdrop-blur-3xl p-1 right-0 z-10 top-20">
          {props.cart.map((item) => (
            <div
              key={item.id}
              className="h-12 wrapper flex justify-between gap-1 items-center bg-white"
            >
              {console.log(`My Item Id = ${item.id}`)}
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
                <h1>{quantity}</h1>
                <div className="btn-sec flex flex-col justify-end items-end">
                  <AiOutlineCaretUp
                    onClick={() => {
                      item.id.map((myMatchedId) => {
                        if (myMatchedId === item.id) {
                          if (quantity > 1) {
                            setQuantity(quantity + 1);
                          } else {
                            setQuantity(quantity);
                            alert("You can't go less than 1");
                          }
                        }
                      });
                    }}
                  />
                  <AiOutlineCaretDown
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      } else {
                        setQuantity(quantity);
                        alert("You can't go less than 1");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="remove-btn text-sm font-sans">
                <button className="bg-[#ff3f6c] text-white rounded-sm w-full p-1">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1 mt-10">
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Subtotal:</h1>
              <h1>Rs.1200.00</h1>
            </div>
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Sales Tax:</h1>
              <h1>Rs.12.0</h1>
            </div>
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Coupon:</h1>
              <h1>Add Coupon</h1>
            </div>
            <div className="flex justify-between items-center border-b-[1px] pb-2 pt-2 text-sm">
              <h1>Grand Total:</h1>
              <h1>Rs.1212.00</h1>
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
