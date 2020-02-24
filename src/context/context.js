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
        loading: false
    };
    componentDidMount() {
        //From contentful items
        this.setProducts(items);
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
        this.setState({
            storeProducts,
            filteredProducts: storeProducts,
            featuredProducts,
            cart: this.getStoreageCart(),
            singleProducts: this.getStorageProduct,
            loading: false
        });
    };
    //set single product
    setSingleProduct = id => {
        console.log(`set single product ${id}`);
    };
    //add to cart
    addToCart = id => {
        return console.log(`add to cart ${id}`);
    };
    //sync storage
    syncStorage = () => {
        return;
    };
    // add Totals
    addTotals = () => {
        return;
    };
    //Get totals
    getTotals = () => {
        return;
    };
    //get storage product
    getStorageProduct = () => {
        return {};
    };
    //Get storage Cart
    getStoreageCart = () => {
        return [];
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
                        setSingleProduct: this.setSingleProduct
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
