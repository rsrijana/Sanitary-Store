import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdManager from "./adManager";

const Navbar = () => (
    <nav className="bg-blue-900 p-4 text-white text-center">
        <a href="#home" className="mx-4">Home</a>
        <a href="#products" className="mx-4">Products</a>
        <a href="#about" className="mx-4">About Us</a>
        <a href="#services" className="mx-4">Services</a>
        <a href="#contact" className="mx-4">Contact</a>
        {/*<a href="/ad-manager" className="mx-4" >Ad Manager</a>*/}
            <span className="mx-4 cursor-not-allowed">Ad Manager</span>
            </nav>
            );

            const Section = ({ title, children, id }) => (
            <section id={id} className="py-10 px-5 text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
    </section>
);

const Advertisement = ({ section }) => {
    const [image, setImage] = useState("");

    useEffect(() => {
        const key = section === "top" ? "Top Advertisement" : "Bottom Advertisement";
        const storedData = localStorage.getItem(key);

        try {
            if (storedData) {
                const adData = JSON.parse(storedData);
                // console.log(Advertisement data for ${key}:, adData);

                if (Array.isArray(adData)) {
                    const adWithImage = adData.find(item => item.image);
                    if (adWithImage) {
                        setImage(adWithImage.image);
                        return;
                    }
                } else if (adData.image) {
                    setImage(adData.image);
                    return;
                }
            }
            // console.warn(No valid image found for ${key});
            setImage("");
        } catch (error) {
            setImage("");
        }
    }, [section]);

    if (!image) return null;

    return (
        <div className="bg-yellow-400 p-4 text-center my-5">
            <img
                src={image}
                alt="Advertisement"
                className="mx-auto max-h-60 object-contain"
            />
        </div>
    );
};

const Card = ({ text, image }) => (
    <div className="border p-4 text-center w-1/3">
        <img src={image} alt={text} className="w-full h-40 object-cover mb-2" />
        <p>{text}</p>
    </div>
);

function App() {
    return (
        <Router>
            <div>
                <header className="bg-blue-700 text-white text-center p-6 text-3xl">
                    Welcome to PS SANITARY STORE
                </header>
                <Navbar />
                <main className="max-w-5xl mx-auto">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Section title="Home" id="home">
                                    <p>Your one-stop shop for high-quality sanitary hardware products.</p>
                                </Section>
                                <Advertisement section="top" />
                                <Section title="Our Products" id="products">
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Card text="Faucets" image="https://images.pexels.com/photos/67184/pexels-photo-67184.jpeg" />
                                        <Card text="Pipes & Fittings" image="https://images.pexels.com/photos/5309161/pexels-photo-5309161.jpeg" />
                                        <Card text="Bathroom Accessories" image="https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg" />
                                        <Card text="Showers" image="https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg" />
                                        <Card text="Kitchen Sinks" image="https://images.pexels.com/photos/617763/pexels-photo-617763.jpeg" />
                                        <Card text="Water Heaters" image="https://images.pexels.com/photos/163354/switch-heater-boiler-temperature-163354.jpeg" />
                                    </div>
                                </Section>
                                <Advertisement section="bottom" />
                                <Section title="About Us" id="about">
                                    <p>We provide sanitary products and services.</p>
                                </Section>
                                <Section title="Our Services" id="services">
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Card text="Installation"
                                              image="https://images.pexels.com/photos/5841952/pexels-photo-5841952.jpeg" />
                                        <Card text="Maintenance"
                                              image="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg" />
                                        <Card text="Consultation"
                                              image="https://images.pexels.com/photos/6690311/pexels-photo-6690311.jpeg" />
                                    </div>
                                </Section>
                                <Section title="Contact Us" id="contact">
                                    <p>Email: info@sanitaryshop.com</p>
                                </Section>
                            </>
                        } />
                        <Route path="/ad-manager" element={<AdManager />} />
                    </Routes>
                </main>
                <footer className="bg-blue-900 text-white text-center p-4 mt-10">
                    &copy; 2025 Sanitary Hardware Shop. All Rights Reserved.
                </footer>
            </div>
        </Router>
    );
}

export default App;