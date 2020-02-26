import React, { Component } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
import { items } from "./productData";

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 0,
        links: linkData,
        socialIcons: socialData,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProducts: {},
        loading: true,
        search: "",
        price: 0,
        min: 0,
        max: 0,
        company: "all",
        shipping: false
    };
    componentDidMount() {
        //From contentful items
        this.setProducts(items);
        window.scrollTo(0, 0);
    }
    //set products

    setProducts = products => {
        let storeProducts = products.map(item => {
            const { id } = item.sys;
            const image = item.fields.image.fields.file.url;
            const product = { id, ...item.fields, image };
            return product;
        });
        //featured products
        let featuredProducts = storeProducts.filter(
            item => item.featured === true
        );
        //get max price
        let maxPrice = Math.max(...storeProducts.map(item => item.price));

        this.setState(
            {
                storeProducts,
                filteredProducts: storeProducts,
                featuredProducts,
                cart: this.getStoreageCart(),
                singleProducts: this.getStorageProduct(),
                loading: false,
                price: maxPrice,
                max: maxPrice
            },
            () => {
                this.addTotals();
            }
        );
    };
    //set single product
    setSingleProduct = id => {
        console.log(id);
        let product = this.state.storeProducts.find(item => item.id === id);
        localStorage.setItem("singleProduct", JSON.stringify(product));
        this.setState({
            singleProducts: { ...product },
            loading: false
        });
    };
    //add to cart
    addToCart = id => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if (!tempItem) {
            tempItem = tempProducts.find(item => item.id === id);
            let total = tempItem.price;
            let cartItem = { ...tempItem, count: 1, total };
            tempCart = [...tempCart, cartItem];
        } else {
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState(
            () => {
                return { cart: tempCart };
            },
            () => {
                this.addTotals();
                this.syncStorage();
                this.openCart();
            }
        );
    };
    //sync storage
    syncStorage = () => {
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
        return;
    };
    // add Totals
    addTotals = () => {
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        });
        return;
    };
    //Get totals
    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total;
            cartItems += item.count;
        });
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.2;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        return {
            cartItems,
            subTotal,
            tax,
            total
        };
    };
    //get storage product update from localStorage
    getStorageProduct = () => {
        return localStorage.getItem("singleProduct")
            ? JSON.parse(localStorage.getItem("singleProduct"))
            : {};
    };
    //Get storage Cart
    getStoreageCart = () => {
        let cart;
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        } else {
            cart = [];
        }
        return cart;
    };

    //Handle Side Bar
    handleSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    };
    //Handle Cart
    handleCart = () => {
        this.setState({ cartOpen: !this.state.cartOpen });
    };
    //close cart
    closeCart = () => {
        this.setState({ cartOpen: false });
    };
    openCart = () => {
        this.setState({ cartOpen: true });
    };

    //card functionaly
    //Increment
    increment = id => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count++;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(
            () => {
                return {
                    cart: [...tempCart]
                };
            },
            () => {
                this.addTotals();
                this.syncStorage();
            }
        );
    };
    //Decrement
    Decrement = id => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count--;
        if (cartItem.count === 0) {
            this.removeItem(id);
        } else {
            cartItem.total = cartItem.count * cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));
            this.setState(
                () => {
                    return {
                        cart: [...tempCart]
                    };
                },
                () => {
                    this.addTotals();
                    this.syncStorage();
                }
            );
        }
    };
    //remove item
    removeItem = id => {
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState(
            {
                cart: [...tempCart]
            },
            () => {
                this.addTotals();
                this.syncStorage();
            }
        );
    };
    //clearcart
    clearCart = () => {
        this.setState(
            {
                cart: []
            },
            () => {
                this.addTotals();
                this.syncStorage();
            }
        );
    };
    //handle filtering
    handleChange = event => {
        console.log(event);
    };
    //SortData
    sortData = () => {};
    render() {
        return (
            <>
                <ProductContext.Provider
                    value={{
                        ...this.state,
                        handleSidebar: this.handleSidebar,
                        handleCart: this.handleCart,
                        closeCart: this.closeCart,
                        openCart: this.openCart,
                        addToCart: this.addToCart,
                        setSingleProduct: this.setSingleProduct,
                        increment: this.increment,
                        decrement: this.Decrement,
                        removeItem: this.removeItem,
                        clearCart: this.clearCart,
                        handleChange: this.handleChange
                    }}
                >
                    {this.props.children}
                </ProductContext.Provider>
            </>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
