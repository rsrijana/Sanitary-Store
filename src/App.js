import './App.css';
// import { app } from './firebase';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { db, collection, getDocs } from './firebase';
import AdManager from "./adManager";
import { gapi } from "gapi-script";
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

const Section = ({title, children, id}) => (
    <section id={id} className="py-10 px-5 text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
    </section>
);

const Advertisement = ({ ads }) => (
    <div className="bg-yellow-400 p-4 text-center my-5">
        {ads.length > 0 ? (
            ads.map(ad => (
                <div key={ad.id} className="mb-4">
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover" />
                    <p className="text-lg font-bold">{ad.title}</p>
                    <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Visit</a>
                </div>
            ))
        ) : (
            <p>[Advertisement Space]</p>
        )}
    </div>
);

const Card = ({ text, image }) => (
    <div className="border p-4 text-center w-1/3">
      <img src={image} alt={text} className="w-full h-40 object-cover mb-2" />
      <p>{text}</p>
    </div>
);
function App() {
    const [adsTop, setAdsTop] = useState([]);
    const [adsBottom, setAdsBottom] = useState([]);
    const SCOPES = "https://www.googleapis.com/auth/drive.file";
    const fetchAds = async () => {
        const querySnapshot = await getDocs(collection(db, "ads"));
        const adsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setAdsTop(adsData.filter(ad => ad.section === "top"));
        setAdsBottom(adsData.filter(ad => ad.section === "bottom"));
    };

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: SCOPES,
            });
        };
        gapi.load("client:auth2", initClient);
    }, []);


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
                                <Advertisement ads={adsTop} />
                                <Section title="Our Products" id="products">
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Card text="Faucets" image="https://images.pexels.com/photos/67184/pexels-photo-67184.jpeg"/>
                                        <Card text="Pipes & Fittings" image="https://images.pexels.com/photos/5309161/pexels-photo-5309161.jpeg"/>
                                        <Card text="Bathroom Accessories" image="https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg"/>
                                        <Card text="Showers" image="https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg"/>
                                        <Card text="Kitchen Sinks" image="https://images.pexels.com/photos/617763/pexels-photo-617763.jpeg"/>
                                        <Card text="Water Heaters" image="https://images.pexels.com/photos/163354/switch-heater-boiler-temperature-163354.jpeg"/>
                                    </div>
                                </Section>
                                <Advertisement ads={adsBottom}/>
                                <Section title="About Us" id="about">
                                    <p>We provide sanitary products and services.</p>
                                </Section>
                                <Section title="Our Services" id="services">
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Card text="Installation"
                                              image="https://images.pexels.com/photos/5841952/pexels-photo-5841952.jpeg"/>
                                        <Card text="Maintenance"
                                              image="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg"/>
                                        <Card text="Consultation"
                                              image="https://images.pexels.com/photos/6690311/pexels-photo-6690311.jpeg"/>
                                    </div>
                                </Section>
                                <Section title="Contact Us" id="contact">
                                    <p>Email: info@sanitaryshop.com</p>
                                </Section>
                            </>
                        } />
                        <Route path="/ad-manager" element={<AdManager fetchAds={fetchAds} />} />
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
