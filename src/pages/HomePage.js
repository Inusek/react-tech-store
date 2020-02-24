import React from "react";
// import { ProductConsumer } from "../context/context";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Services from "../components/HomePage/Services";
import Featured from "../components/HomePage/Featured";
export default function HomePage() {
    return (
        <>
            <Hero title="Awesome gadgets" max="true">
                <Link
                    to="/products"
                    className="main-link"
                    style={{ margin: "2rem" }}
                >
                    Our products
                </Link>
            </Hero>
            <Services />
            <Featured />
        </>
    );
}
