import MyNavbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RegistrationForm from './pages/Registration';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegistrationForm />} />

      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
