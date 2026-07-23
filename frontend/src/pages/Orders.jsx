import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeOrder = async (id) => {
    try {

      const token = localStorage.getItem("token");

      await API.delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders((prev) =>
        prev.filter((order) => order._id !== id)
      );

    } catch (err) {
      console.error(err);
      showMessage("Failed to remove order.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-indigo-600 animate-pulse">
          Loading Orders...
        </h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
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
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg">

          <div className="text-7xl mb-5">📦</div>

          <h2 className="text-3xl font-bold text-gray-700">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-4">
            Your orders will appear here after checkout.
          </p>

          <button
            onClick={() => window.location.href = "/shop"}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Start Printing
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            📦 My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track all your printing orders.
          </p>
        </div>

        <div className="space-y-8">

          {orders.map((order, index) => (

            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >

              {/* Header */}

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 flex justify-between items-center flex-wrap gap-4">

                <div>
                  <h2 className="text-2xl font-bold">
                    Order #{index + 1}
                  </h2>

                  <p className="text-indigo-100 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="bg-green-500 px-5 py-2 rounded-full font-semibold">
                  Completed
                </span>

              </div>

              {/* Items */}

              <div className="p-8 space-y-5">

                {order.items.map((item, i) => (

                  <div
                    key={i}
                    className="border rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center"
                  >

                    <div className="flex gap-4">

                      <div className="w-16 h-16 bg-indigo-100 rounded-xl flex justify-center items-center text-3xl">
                        📄
                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.filename}
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-2">

                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                            {item.paperType}
                          </span>

                          <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                            {item.color}
                          </span>

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {item.copies} Copies
                          </span>

                        </div>

                      </div>

                    </div>

                    <h2 className="text-2xl font-bold text-indigo-700 mt-5 md:mt-0">
                      ₹{item.price}
                    </h2>

                  </div>

                ))}

                <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">

                  <h2 className="text-3xl font-bold">
                    Total: ₹{order.totalPrice}
                  </h2>

                  <button
                    onClick={() => removeOrder(order._id)}
                    className="mt-5 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    Remove Order
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}