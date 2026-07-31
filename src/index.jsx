import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Hero from "./Component/Hero";
import {ProductLayout } from "./Component/ProductLayout";



const AppLayout=()=>{
    return(
        <>
        <Header/>
        <Hero/>
        <ProductLayout/>
        <Footer/>
        </>
    )
}

    const reactRoot=ReactDOM.createRoot(document.getElementById("root"))
    reactRoot.render(<AppLayout/>)
    
