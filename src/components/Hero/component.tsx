import React from "react";
import "./style.css";
import banner from "../../assets/banner.svg";

const Hero = () => {
    return (
        <section className="hero__section">
            <div className="container">
                <div className="hero__section__wrapper">
                    <h1 className="hero__section__title">
                        Everything about <span>Crypto</span> world
                    </h1>
                    <img
                        src={banner}
                        alt="hero-banner"
                        className="hero__section__banner"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
