import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from "./Components/Navbar/Navbar";
import Home from './Pages/Homepage/Home';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Footer from './Components/Footer/Footer';
import Product from './Pages/Product/Product';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Cart from './Pages/Cart/Cart';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import ShippingScreen from './Pages/Shipping/ShippingScreen';
import Payment from './Pages/Payment/Payment';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
// import Categories from './Components/Categories/Categories';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main">
      <ToastContainer position='bottom-center' limit={1} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search' element={<CategoryPage />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
      </Routes>
      </div>
      <div>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
