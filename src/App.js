
import './App.css';

const Navbar = () => (
    <nav className="bg-blue-900 p-4 text-white text-center">
      <a href="#home" className="mx-4">Home</a>
      <a href="#about" className="mx-4">About Us</a>
      <a href="#products" className="mx-4">Products</a>
      <a href="#services" className="mx-4">Services</a>
      <a href="#contact" className="mx-4">Contact</a>
    </nav>
);

const Section = ({ id, title, children }) => (
    <section id={id} className="py-10 px-5 text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </section>
);

const Card = ({ text, image }) => (
    <div className="border p-4 text-center w-1/3">
      <img src={image} alt={text} className="w-full h-40 object-cover mb-2" />
      <p>{text}</p>
    </div>
);

const Advertisement = () => (
    <div className="bg-yellow-400 p-4 text-center my-5">[Advertisement Space]</div>
);

function App() {
  return (
      <div>
          <header className="bg-blue-700 text-white text-center p-6 text-3xl">
              Welcome to PS SANITARY STORE
          </header>
          <Navbar/>
          <main className="max-w-5xl mx-auto">
              <Section id="home" title="Home">
                  <p>Your one-stop shop for high-quality sanitary hardware products.</p>
              </Section>
              <Section id="about" title="About Us">
                  <p>We provide top-quality sanitary hardware products and professional services to meet all your
                      needs.</p>
              </Section>
              <Advertisement/>
              <Section id="products" title="Our Products">
                  <div className="flex flex-wrap gap-4 justify-center">
                      <Card text="Faucets" image="https://images.pexels.com/photos/67184/pexels-photo-67184.jpeg"/>
                      <Card text="Pipes & Fittings"
                            image="https://images.pexels.com/photos/5309161/pexels-photo-5309161.jpeg"/>
                      <Card text="Bathroom Accessories"
                            image="https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg"/>
                      <Card text="Showers" image="https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg"/>
                      <Card text="Kitchen Sinks"
                            image="https://images.pexels.com/photos/617763/pexels-photo-617763.jpeg"/>
                      <Card text="Water Heaters"
                            image="https://images.pexels.com/photos/163354/switch-heater-boiler-temperature-163354.jpeg"/>
                  </div>
              </Section>
              <Advertisement/>
              <Section id="services" title="Our Services">
                  <div className="flex flex-wrap gap-4 justify-center">
                      <Card text="Installation"
                            image="https://images.pexels.com/photos/5841952/pexels-photo-5841952.jpeg"/>
                      <Card text="Maintenance"
                            image="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg"/>
                      <Card text="Consultation"
                            image="https://images.pexels.com/photos/6690311/pexels-photo-6690311.jpeg"/>
                  </div>
              </Section>
              <Section id="contact" title="Contact Us">
                  <p>Address: Jorpati-Nayabasti, Kathmandu, Nepal</p>
                  <p>Phone: 9841237161</p>
                  <p>Email: info@sanitaryshop.com</p>
              </Section>
          </main>
          <footer className="bg-blue-900 text-white text-center p-4 mt-10">
              &copy; 2025 Sanitary Hardware Shop. All Rights Reserved.
          </footer>
      </div>
  );
}

export default App;
