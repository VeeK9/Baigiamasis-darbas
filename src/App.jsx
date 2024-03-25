import './App.css';
import Home from './components/pages/Home';
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';

const App = () => {
  return (
    <>
      <Header />
        <Home />
      <Footer />
    </>
  );
}

export default App;
