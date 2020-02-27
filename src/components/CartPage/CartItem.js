import React from "react";
import {
    FaTrash,
    FaChevronCircleUp,
    FaChevronCircleDown
} from "react-icons/fa";

export default function CartItem({
    cartItem,
    increment,
    decrement,
    removeItem
}) {
    const { id, title, price, count, total, image } = cartItem;
    return (
        <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">
            {/* image */}
            <div className="con-10 mx-auto col-lg-2 pb-2">
                <img
                    src={image}
                    width="60"
                    className="img-fluid"
                    alt="product"
                />
            </div>
            {/* end of image */}
            {/* title */}
            <div className="con-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>
            {/* end of title */}
            {/* price */}
            <div className="con-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">price : </span>
                {price}$
            </div>
            {/* end of price */}
            {/* count controls */}
            <div className="con-10 mx-auto col-lg-2 my-2 mt-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <FaChevronCircleDown
                            className="text-primary cart-icon"
                            onClick={() => decrement(id)}
                        />
                        <span className="text-title text-muted mx-3">
                            {count}
                        </span>
                        <FaChevronCircleUp
                            className="text-primary cart-icon"
                            onClick={() => increment(id)}
                        />
                    </div>
                </div>
            </div>
            {/* end of count controls */}
            {/* remove item */}
            <div className="con-10 mx-auto col-lg-2">
                <FaTrash
                    className="text-danger cart-icon"
                    onClick={() => removeItem(id)}
                />
            </div>
            {/* end of remove item */}
            {/* addTotal */}
            <div className="col-10 mx-auto col-lg-2">
                <strong className="text-muted">item total : ${total}</strong>
            </div>
            {/* end addTotal */}
        </div>
    );
}
