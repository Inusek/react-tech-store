import React, { Component } from "react";
import styled from "styled-components";
import { FaDolly, FaRedo, FaDollarSign } from "react-icons/fa";

export default class Services extends Component {
    state = {
        services: [
            {
                id: 1,
                icon: <FaDolly />,
                title: "free shiping",
                text:
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, velit?"
            },
            {
                id: 2,
                icon: <FaRedo />,
                title: "30 days return policy",
                text:
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, velit?"
            },
            {
                id: 3,
                icon: <FaDollarSign />,
                title: "Secured payment",
                text:
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, velit?"
            }
        ]
    };
    render() {
        return (
            <ServiesWrapper className="py-5">
                <div className="container">
                    <div className="row">
                        {this.state.services.map(item => {
                            return (
                                <div
                                    className="col-10 mx-auto col-sm-6 col-md-4 text-center my-3"
                                    key={item.id}
                                >
                                    <div className="service-icon">
                                        {item.icon}
                                    </div>
                                    <div className="mt-3 text-capitalize">
                                        {item.title}
                                    </div>
                                    <div className="mt-3">{item.text}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ServiesWrapper>
        );
    }
}

const ServiesWrapper = styled.section`
    background: rgba(92, 183, 234, 0.5);
    .service-icon {
        font-size: 2.5rem;
        color: var(--primaryColor);
    }
    p {
        color: var(--darkGrey);
    }
`;
