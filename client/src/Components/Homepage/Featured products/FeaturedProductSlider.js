
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import $ from 'jquery';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Featuredproduct.css"

// import required modules
import { Pagination,Navigation} from "swiper";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import {toast} from 'react-toastify'

export default ()=> {
  let smallsize;
  console.log(smallsize)
  let [products, setProducts] = useState([]);
  let [cartitems,setcartitems]=useState([]);
  let [sizetype,setSizetype]=useState("");
  let[error,seterror] =useState(null);

   let sizeSelection1=useRef('')
   let sizeSelection2=useRef('')
   let sizeSelection3=useRef('')
   let sizeSelection4=useRef('')
  useEffect( ()=>{
      async function fetchProduct() {
      let resp = await axios.get("/product/allproducts");
      console.log(resp.data);
      setProducts(resp.data);
  }
  fetchProduct();
      }, []);

      console.log(sizetype)
      
      useEffect(() => {
        const retriveProducts = JSON.parse(localStorage.getItem('cart'));
        if (retriveProducts) setcartitems(retriveProducts);
      }, []);
      
      useEffect(() => {
        if(cartitems?.length) { // only store the state if products exists and it's length is greater than 0
          localStorage.setItem('cart', JSON.stringify(cartitems));
        }
        // else{
        //   localStorage.setItem('cart', JSON.stringify([]));
        // }
      
      }, [cartitems]);
   
   console.log(cartitems)

   
    
  return (
    <>
      <div id="centralize2">
      <p id="txt">Featured Product</p>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[ Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView:3,
            spaceBetween: 0,
          },
        }}
        className="mySwiper"
      >
    {products.map((product)=>{
   
      // console.log(product)
    return(
     product.productFeatured=='true'?   
      <SwiperSlide>
    
     <div id="centralizing2">
     <div class="container page-wrapper"
     onMouseLeave={() => {
      setSizetype("");
    }}>
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
        <Link to={`/productdetail${product._id}/${product.store}`}>
          
          <img class="img" src={`${product.productImage1}`} alt="" />
        </Link>
          <div class="img-info">
            <div class="info-inner">
            <span class="p-company" style={{color:'black',fontSize:'19px'}}>{`${product.productTitle}`}</span>
              <span class="p-name">{`${product.productType}`}</span>
            </div>
            <div class="a-size" style={{color:'black'}}> {product.totalProductStock !==0 ?"Available sizes" : "Out of stock"}<div class="sizes"> 
              { product.productSizeWithStock.Small != "0" ?<button  className="size1" ref={sizeSelection1}  onClick={()=>{setSizetype(sizeSelection1.current.textContent+"mall");seterror(null)}}>S</button>:null  }
              { product.productSizeWithStock.Medium !="0" ?<button className="size1" ref={sizeSelection2} onClick={()=>{setSizetype(sizeSelection2.current.textContent+"edium");seterror(null)}}>M</button>:null }
              { product.productSizeWithStock.Large != "0" ?<button className="size1" ref={sizeSelection3} onClick={()=>{setSizetype(sizeSelection3.current.textContent+"arge");seterror(null)}}>L</button>: null }
              { product.productSizeWithStock.xLarge != "0" ?<button className="size1" ref={sizeSelection4} onClick={()=>{setSizetype(sizeSelection4.current.textContent+"arge");seterror(null)}}>xL</button>:null }
                  </div>
                  {error !== null  && <div style={{color:'red',fontSize:'18px'}}>Size missing</div>}
                  </div>
          </div>
        </div>

        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          <a class="cart">
          {cartitems.find((myitem)=>myitem.size==sizetype && myitem.productId== product._id ) ==undefined?<span class="price">{`Rs ${product.productPrice}`}</span>:null}
            <span class="add-to-cart">
         <span class="txt">{cartitems.find((myitem)=> myitem.size==sizetype && myitem.productId==product._id)==undefined
          ?<button  className="btn2" onClick={()=>{ 
                if(sizetype!==""){
                                // setAdd("false")      
       const productExist=cartitems.find((myitem)=> myitem.size==sizetype && myitem.productId== product._id )
                                console.log(productExist)
                                if(productExist==undefined){
                                       let order={
                                           productTitle: product.productTitle,
                                           size:sizetype,
                                           productId:product._id,
                                           productQuantity:1,
                                           productPrice:product.productPrice,
                                           productImage:product.productImage1,
                                           productDescription:product.productDescription,
                                           totalStock:sizetype=='Small'?Number(product.productSizeWithStock.Small):
                                           sizetype=='Large'?Number(product.productSizeWithStock.Large):
                                           sizetype=='Medium'?Number(product.productSizeWithStock.Medium):
                                           sizetype=='xLarge'?Number(product.productSizeWithStock.xLarge):null,
                                           storeId:product.store
                                  

                                        }
                          
                                  setcartitems(([...cartitems,order]))
                                  setSizetype("")
                                  toast.success("Product added to cart");
                             
                                }                       
                                else{
                                  setcartitems([...cartitems])  
                                }}
                                else{
                                  seterror('exist')
                                  // alert("error")
                                }
                               

              }}>Add to cart</button>:<button className="btn2">Already sent in the cart</button>}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>

</div>








      {/* */}
    {/* <div class="container page-wrapper" 
     onMouseLeave={() => {
          setSizetype("");
        }}>
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper1">
        <div class="box-up">
        <Link to={`/productdetail${product._id}`}>
          <img className="img" src={`${product.productImage1}`} alt="" />
          </Link>
          <div class="img-info">
            <div class="info-inner">
              <span class="p-company" style={{color:'black',fontSize:'19px'}}>{`${product.productTitle}`}</span>
              <span class="p-name">{`${product.productType}`}</span>
            </div>
            <div class="a-size" style={{color:'black'}}> {product.totalProductStock !==0 ?"Available sizes" : "Out of stock"}<div class="sizes"> 
             
              { product.productSizeWithStock.Small != "0" ?<button  className="size1" ref={sizeSelection1}  onClick={()=>{setSizetype(sizeSelection1.current.textContent+"mall");seterror(null)}}>S</button>:<button className="size1"><i  class="fa-solid fa-x"></i></button>  }
              { product.productSizeWithStock.Medium !="0" ?<button className="size1" ref={sizeSelection2} onClick={()=>{setSizetype(sizeSelection2.current.textContent+"edium");seterror(null)}}>M</button>:<button className="size1"><i  class="fa-solid fa-x"></i></button> }
              { product.productSizeWithStock.Large != "0" ?<button className="size1" ref={sizeSelection3} onClick={()=>{setSizetype(sizeSelection3.current.textContent+"arge");seterror(null)}}>L</button>: <button className="size1"><i  class="fa-solid fa-x"></i></button> }
              { product.productSizeWithStock.xLarge != "0" ?<button className="size1" ref={sizeSelection4} onClick={()=>{setSizetype(sizeSelection4.current.textContent+"arge");seterror(null)}}>xL</button>:<button className="size1"><i  class="fa-solid fa-x"></i></button> }
                  </div>
                  {error !== null  && <div style={{color:'red',fontSize:'18px'}}>Size missing</div>}
                  </div>
          </div>
        </div>

        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          <a class="cart" >
            <span class="price">${`${product.productPrice}`}</span>
            <span class="add-to-cart">
         <span class="txt">{cartitems.find((myitem)=> myitem.size==sizetype && myitem.productId==product._id)==undefined
          ?<button className="btn2" onClick={()=>{ 
                if(sizetype!==""){
                                // setAdd("false")      
       const productExist=cartitems.find((myitem)=> myitem.size==sizetype && myitem.productId== product._id )
                                console.log(productExist)
                                if(productExist==undefined){
                                       let order={
                                           productTitle: product.productTitle,
                                           size:sizetype,
                                           productId:product._id,
                                           productQuantity:1,
                                           productPrice:product.productPrice,
                                           productImage:product.productImage1,
                                           productDescription:product.productDescription,
                                           totalStock:sizetype=='Small'?Number(product.productSizeWithStock.Small):
                                           sizetype=='Large'?Number(product.productSizeWithStock.Large):
                                           sizetype=='Medium'?Number(product.productSizeWithStock.Medium):
                                           sizetype=='xLarge'?Number(product.productSizeWithStock.xLarge):null,
                                           storeId:product.store,
                                           productStatus:"pending"

                                        }
                          
                                  setcartitems(([...cartitems,order]))
                                  setSizetype("")
                             
                                }                       
                                else{
                                  setcartitems([...cartitems])    
                                }}
                                else{
                                  seterror('exist')
                                  // alert("error")
                                }
                               

              }}>Add to cart</button>:<button className="btn2">Already sent in the cart</button>}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div> */}
{/* </Link> */}
</div> 
</SwiperSlide>:null
  )
 })}
      
        
      
        
        
       
      </Swiper>
      </div>
    </>
  );
}