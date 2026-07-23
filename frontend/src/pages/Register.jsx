import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {

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

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                form
            );


            showMessage("Registration Successful");

            navigate("/Login");


        }
        catch (error) {

            showMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    }



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

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
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">


                <h1 className="text-3xl font-bold text-center text-indigo-600">
                    Create Account
                </h1>


                <p className="text-center text-gray-500 mt-2">
                    Join E-Printing today
                </p>



                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >



                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />



                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />



                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />



                    <button
                        className="
                w-full
                bg-indigo-600
                text-white
                py-3
                rounded-lg
                font-bold
                hover:bg-indigo-700
                "
                    >

                        Register

                    </button>



                </form>



                <p className="text-center mt-5">

                    Already have account?

                    <Link
                        to="/Login"
                        className="text-indigo-600 font-bold ml-2"
                    >
                        Login
                    </Link>

                </p>



            </div>


        </div>

    )
}


export default Register;