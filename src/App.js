import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import About from "./pages/AboutPage";
import Products from "./pages/ProductsPage";
import Contact from "./pages/ContactPage";
import Home from "./pages/HomePage";
import Cart from "./pages/CartPage";
import SingleProduct from "./pages/SingleProductPage";
import Default from "./pages/Default";
import ScrollToTop from "./ScrollToTop";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SideCart from "./components/SideCart";
import Footer from "./components/Footer";
export default class App extends Component {
    render() {
        return (
            <>
                {/* navbar,sidebar,cart */}
                <NavBar />
                <Sidebar />
                <SideCart />
                <ScrollToTop>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/products" exact component={Products} />
                        <Route
                            path="/products/:id"
                            exact
                            component={SingleProduct}
                        />
                        <Route path="/cart" exact component={Cart} />
                        <Route component={Default} />
                    </Switch>
                </ScrollToTop>
                <Footer />
            </>
        );
    }
}
