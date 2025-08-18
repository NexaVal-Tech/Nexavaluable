// Global CSS imports (must be first)
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import "@/styles/styles.css";

import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import Head from "next/head";

// Import Scroll Progress Bar


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <>
      <Head>
        <title>NEXA VAL TECH</title>
        {/* linking the extenal fonts from goggle  */}
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"></link>
      </Head>

      {/* Scroll Progress Bar */}
   

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
