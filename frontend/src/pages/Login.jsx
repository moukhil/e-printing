import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {

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
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                form
            );



            localStorage.setItem("token", res.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    _id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                })
            );

            window.location.href = "/";
            showMessage("Login Successful");
            navigate("/Shop");


        }


        catch (error) {

            showMessage(
                error.response?.data?.message ||
                "Invalid Login"
            )

        }


    }





    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
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


                <h1 className="text-3xl font-bold text-center text-indigo-600">
                    Welcome Back
                </h1>


                <p className="text-center text-gray-500 mt-2">
                    Login to continue printing
                </p>



                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >


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
                        hover:bg-indigo-700"

                    >

                        Login

                    </button>



                </form>




                <p className="text-center mt-5">

                    Don't have account?

                    <Link
                        to="/Register"
                        className="text-indigo-600 font-bold ml-2"
                    >

                        Register

                    </Link>


                </p>



            </div>


        </div>


    )


}


export default Login;