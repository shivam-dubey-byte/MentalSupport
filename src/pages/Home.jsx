import Navbar from '../components/Navbar';
import IntroSection from '../components/IntroSection';
import TalkSection from '../components/TalkSection';
import PlacesSection from '../components/PlacesSection';
import ShoppingSection from '../components/ShoppingSection';
import Footer from '../components/Footer';  // ✅ Import Footer

const Home = () => {
  return (
    <div>
      <Navbar />
      <IntroSection />
      <TalkSection />
      <PlacesSection />
      <ShoppingSection />
      <Footer />  {/* ✅ Add Footer */}
    </div>
  );
};

export default Home;
