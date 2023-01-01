
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import Footer from './Components/Footer/Footer';
import Checkout from './Components/Checkout/Checkout';
import { useParams } from 'react-router-dom';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
// import ProductSlider from './Components/ProductDetail/ProductSlider';
import MensCollection from './Components/Homepage/Collections/MensCollection.js';
import WomenCollection from './Components/Homepage/Collections/WomenCollection';
import ChildrenColllection from './Components/Homepage/Collections/ChildrenCollection'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const params=useParams()
  console.log(params)
  return (
    <>
  <BrowserRouter>
  <Navbar/>
    <Routes>
   {/* <div className='center'> */}
    <Route path='/' element={<Homepage/>} />
    <Route path='/cart' element={ <Cart/>} />
    <Route path='/productdetail:id/:storeId' element={<ProductDetail/>} />
    <Route path='/checkout' element={<Checkout/>} />
    <Route path='/mensCollection' element={<MensCollection/>} />
    <Route path='/womenCollection' element={<WomenCollection/>} />
    <Route path='/childrenCollection' element={<ChildrenColllection/>} />
    
    <Route path='/checkout' element={<Checkout/>} />
    {/* <ProductDetail/> */}
    {/* </div> */}
    </Routes>
    <ProductDetail/>
    {/* <ProductSlider/> */}
    {/* <Checkout/> */}
    {/* <WomenCollection/> */}
    {/* <MensCollection/> */}
    <Footer/>
  </BrowserRouter>
  <ToastContainer/>     
    </>
  );
}

export default App;
