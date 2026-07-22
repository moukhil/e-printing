import { useState, useEffect } from "react";

function Footer() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setShow(window.scrollY <= lastScrollY);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50
      bg-slate-900 text-white border-t border-slate-700
      transition-transform duration-300
      ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">

        {/* Company Name */}
        <div>
          <h2 className="text-xl font-bold text-indigo-400">
            E-Printing
          </h2>
          <p className="text-sm text-gray-400">
            Print Smart. Print Fast.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 mt-3 md:mt-0">
          © {new Date().getFullYear()} E-Printing. All Rights Reserved.
        </p>

        {/* Contact */}
        <div className="text-sm text-gray-400 mt-3 md:mt-0">
          support@eprinting.com
        </div>

      </div>
    </footer>
  );
}

export default Footer;