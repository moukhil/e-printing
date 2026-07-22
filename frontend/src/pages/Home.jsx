import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Printer,
  Truck,
  ShieldCheck,
  FileText,
  Palette,
  Clock,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white py-24 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Print Your Files
              <span className="block text-yellow-300">
                Anytime, Anywhere
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Upload documents, customize printing options,
              and get premium quality prints delivered to your doorstep.
            </p>


            <button
              onClick={() => navigate("/login")}
              className="mt-8 bg-white text-indigo-700 px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition"
            >
              Start Printing →
            </button>

            <div className="flex gap-6 mt-8 text-sm">
              <div>
                <h3 className="font-bold text-xl">500+</h3>
                <p>Orders Completed</p>
              </div>

              <div>
                <h3 className="font-bold text-xl">99%</h3>
                <p>Quality Rating</p>
              </div>

              <div>
                <h3 className="font-bold text-xl">24/7</h3>
                <p>Support</p>
              </div>
            </div>

          </div>


          {/* Hero Card */}

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">

            <div className="bg-white rounded-2xl p-8 text-gray-800">

              <Printer size={60} className="text-indigo-600 mb-5" />

              <h2 className="text-2xl font-bold">
                Professional Printing Service
              </h2>

              <p className="mt-3 text-gray-600">
                PDF, Images, Word documents and more.
                Customize your print and receive it fast.
              </p>


              <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-600" />
                  Secure Upload
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" />
                  Fast Delivery
                </div>

              </div>

            </div>

          </div>


        </div>

      </section>



      {/* Features */}

      <section className="py-20 px-6 max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          Why Choose E-Printing?
        </h2>

        <p className="text-center text-gray-600 mt-3">
          Everything you need for hassle-free printing.
        </p>


        <div className="grid md:grid-cols-3 gap-8 mt-12">


          <Feature
            icon={<Upload />}
            title="Easy Upload"
            text="Upload PDF, DOC, PPT and image files instantly."
          />


          <Feature
            icon={<Palette />}
            title="Custom Printing"
            text="Choose paper size, color, copies and finishing."
          />


          <Feature
            icon={<Truck />}
            title="Fast Delivery"
            text="Receive printed documents safely at your location."
          />


        </div>

      </section>




      {/* How it works */}

      <section className="bg-white py-20 px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>


        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mt-12">


          <Step
            icon={<FileText />}
            title="Upload File"
            text="Select your documents from your device."
          />


          <Step
            icon={<Printer />}
            title="Customize"
            text="Choose printing preferences."
          />


          <Step
            icon={<Truck />}
            title="Delivery"
            text="Get your prints delivered quickly."
          />


        </div>


      </section>




      {/* CTA */}

      <section className="py-20 bg-indigo-600 text-white text-center">

        <h2 className="text-4xl font-bold">
          Ready to Print?
        </h2>

        <p className="mt-3 text-lg">
          Upload your files and experience smart printing.
        </p>


        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-white text-indigo-700 px-10 py-4 rounded-full font-bold hover:scale-105 transition"
        >
          Start Printing Now
        </button>

      </section>


    </div>
  );
}




function Feature({ icon, title, text }) {

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition hover:-translate-y-2">

      <div className="bg-indigo-100 w-fit p-4 rounded-xl text-indigo-600">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-5">
        {title}
      </h3>

      <p className="text-gray-600 mt-3">
        {text}
      </p>

    </div>
  )

}





function Step({ number, icon, title, text }) {

  return (

    <div className="text-center">

      <div className="mx-auto bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center">

        {icon}

      </div>


      <p className="text-indigo-600 font-bold mt-4">
        {number}
      </p>


      <h3 className="text-xl font-bold">
        {title}
      </h3>


      <p className="text-gray-600 mt-2">
        {text}
      </p>


    </div>

  )

}