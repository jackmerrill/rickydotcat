import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layouts/Header.layout';
import Footer from './layouts/Footer.layout'

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
