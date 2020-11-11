import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layouts/Header.layout';
import Footer from './layouts/Footer.layout'
import Post from './posts'
import Index from './index';
import About from './about';
import Dashboard from './dash';
import Login from './login';
import Register from './register';
import Posts from './posts';

function App({ Component, pageProps }) {
  return (
    <>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
  )
}

export default App
