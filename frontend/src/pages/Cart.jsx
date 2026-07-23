import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Cart() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const showMessage = (text, type) => {
    setMsg(text);
    setMsgType(type);

    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 3000);
  };
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCart = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data);

    } catch (err) {
      console.error(err);
      showMessage("Failed to load cart.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      setCartItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);
      showMessage("Failed to remove item.");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleCheckout = async () => {
    try {

      const token = localStorage.getItem("token");

      await API.post("/orders", {
        items: cartItems,
        totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      showMessage("Order placed successfully!");

      await Promise.all(
        cartItems.map((item) =>
          API.delete(`/cart/${item._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        )
      );

      setCartItems([]);
      navigate("/orders");

    } catch (err) {
      console.error(err);
      showMessage("Failed to place order.");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-indigo-600 animate-pulse">
          Loading Cart...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10">
      {msg && (
        <div
          className={`p-4 rounded-xl font-medium text-center transition-all ${msgType === "success"
            ? "bg-green-100 border border-green-300 text-green-700"
            : "bg-red-100 border border-red-300 text-red-700"
            }`}
        >
          {msg}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            🛒 My Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your printing orders before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty"
              className="w-40 mx-auto mb-6"
            />

            <h2 className="text-3xl font-bold text-gray-700">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Upload documents from the shop and start printing.
            </p>

            <button
              onClick={() => window.location.href = "/shop"}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Go to Shop
            </button>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >

                  <div className="flex flex-col md:flex-row justify-between">

                    <div className="flex gap-5">

                      <div className="w-20 h-20 bg-indigo-100 rounded-xl flex items-center justify-center text-4xl">
                        📄
                      </div>

                      <div>

                        <h2 className="text-xl font-bold">
                          {item.filename}
                        </h2>

                        <div className="mt-3 flex flex-wrap gap-2">

                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                            {item.paperType}
                          </span>

                          <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                            {item.color}
                          </span>

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {item.copies} Copies
                          </span>

                          {item.binding && (
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                              {item.binding}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    <div className="text-right mt-6 md:mt-0">

                      <h2 className="text-3xl font-bold text-indigo-700">
                        ₹{item.price}
                      </h2>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Summary */}

            <div>

              <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span>
                      Total Items
                    </span>

                    <span>
                      {cartItems.length}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>
                      Delivery
                    </span>

                    <span className="text-green-600">
                      FREE
                    </span>

                  </div>

                  <div className="border-t pt-5 flex justify-between text-2xl font-bold">

                    <span>Total</span>

                    <span className="text-indigo-700">
                      ₹{totalPrice}
                    </span>

                  </div>

                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  Proceed to Checkout
                </button>

                <p className="text-gray-500 text-sm text-center mt-5">
                  Secure Checkout • Fast Printing • Home Delivery
                </p>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}