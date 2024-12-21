'use client';
import Navbar from './Navbar';
import Footer from './Footer';
import MainContent from './MainContent';
// import StoriesLanding from './StoriesLanding';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <MainContent />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
