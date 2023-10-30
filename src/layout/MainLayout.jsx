import React, { useEffect } from "react";
import Topbar from "./Topbar";
import Header from "./Header";
import Footer from "./Footer";
import AuthModal from "./AuthModal";
import Breadcrumb from "../components/common/Breadcrumb";
import { useRouter } from "next/router";
import Topbar2 from "./Topbar2";
import Header2 from "./Header2";
import Head from "next/head";
import Footer2 from "./Footer2";

const MainLayout = ({ children }) => {
  const route = useRouter();

  useEffect(() => {
    // Add the class to the <body> tag based on the current route
    const body = document.body;
    if (route.pathname === "/index2") {
      body.classList.add("style-2");
    } else {
      body.classList.remove("style-2");
    }

    // Clean up the class when the component unmounts
    return () => {
      body.classList.remove("style-2");
    };
  }, [route.pathname]);


  
  return (
    <>
      <Head>
        <title>{`Zidkart`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
      </Head>
      {route.pathname === "/index2" ? <Topbar2 /> : <Topbar />}
      <AuthModal />
      {route.pathname === "/index2" ? <Header2 /> : <Header />}
      {route.pathname === "/" || route.pathname === "/index2" ? (
        <></>
      ) : (
        <Breadcrumb />
      )}
      {children}
      {route.pathname === "/index2" ? <Footer2 /> : <Footer />}
    </>
  );
};

export default MainLayout;
