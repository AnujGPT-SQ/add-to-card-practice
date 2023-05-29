import React, { useEffect, useState } from "react";
import "./CardsStyle.css";
import axios from "axios";

const Cards = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <>
      <div className="wrapper w-[100%] bg-gray-100">
        <div className="container lg:w-[80%] md:w-[90%] w-[100%] mx-auto ">
          <div className=" cart-btn lg:w-12 lg:h-12 sm:w-11 sm:h-11 w-10 h-10 cursor-pointer border-2 p-5  border-[#ff9f00]  rounded-lg  fixed lg:right-10 lg:top-5 sm:right-5 sm:top-3 right-2 top-4 flex justify-center items-center transition-all duration-500">
            <i class="fa fa-shopping-cart text-[1.9rem]"></i>
            <div className="px-[3px] py-[1px] absolute lg:-right-2 lg:-top-3 sm:-right-2 sm:-top-3 -right-1 -top-4 flex justify-center items-center bg-[#ff9f00] rounded-full">
              <h1 className="text-sm text-white">10</h1>
            </div>
          </div>
          <div className="heading flex justify-center items-center p-2 border-b-2">
            <h1 className="text-black font-[500]  font-serif lg:text-[3rem] md:text-[2.7rem] text-[1.8rem]">
              Accessories
            </h1>
          </div>

          <div className="card-container grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-2 p-4">
            {data.products?.map((items) => {
              const dis_price = (items.price * items.discountPercentage) / 100;
              const total = items.price - dis_price;
              const decepoint = total.toFixed(2);
              return (
                <>
                  <div className="bg-white cursor-pointer border-2 p-1 rounded-lg flex flex-col group justify-between">
                    <div className="w-full h-[20rem] p-1">
                      <img
                        src={items.thumbnail}
                        className=" w-full h-full object-fill object-center rounded-lg group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="content p-3">
                      <div>
                        <label className="text-[1rem] font-serif text-slate-800">
                          {items.description}
                        </label>
                      </div>
                      <div>
                        <label className="text-[1.4rem] font-serif text-slate-950 font-medium">
                          {items.brand}
                        </label>
                      </div>
                      <div>
                        <label className="text-[1.4rem] font-serif items-baseline ">
                          <span className="">₹</span>
                          <span className="">{decepoint}</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex gap-2 text-[1.4rem] font-serif items-center">
                          <del>₹{items.price}</del>
                          <span className="text-sm font-sans bg-red-400 px-[3px] text-white rounded-3xl">
                            {items.rating}%
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="lg:flex justify-between items-center ">
                      <div className="lg:flex items-center gap-1 cursor-pointer bg-[#ff9f00] text-[#fff] p-[0.5rem] rounded-sm text-center uppercase font-[500]">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <label>Buy Now</label>
                      </div>
                      <div className="flex bg-[#fb641b] text-[#fff] cursor-pointer p-[0.5rem] gap-1 justify-center items-center rounded-sm my-3 uppercase font-[500]">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        <label>Add To Cart</label>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
