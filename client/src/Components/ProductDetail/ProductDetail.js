import "./ProductDetail.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import ProductSlider from './ProductSlider'
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
export default()=>{
    let [products, setProducts] = useState([]);
    let [cartitems,setcartitems]=useState([]);
    let [sizetype,setSizeset]=useState(null);
    let [storeName,setstoreName]=useState('');
    let [storeAvatar, setstoreAvatar]=useState();
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
       
        // useEffect( ()=>{
        // async function fetchUsers() {    
        //     let resp = await axios.get('/currentstore?id='+ store
        //     );
        //     console.log(resp.data);
          
        //    }
        // },[])
        useEffect(() => {
          const retriveProducts = JSON.parse(localStorage.getItem('cart'));
          if (retriveProducts) setcartitems(retriveProducts);
        }, []);
        
        useEffect(() => {
          if(cartitems?.length) { // only store the state if products exists and it's length is greater than 0
            localStorage.setItem('cart', JSON.stringify(cartitems));
          }
        }, [cartitems]);
    
    let {id} = useParams();
    let {storeId} = useParams();
    console.log(storeId)
     console.log(id)
    useEffect( ()=>{
        async function fetchProduct() {
            if(id!==undefined){
        let resp = await axios.get(`/product/${id}`);
        console.log(resp.data)
    }}
    fetchProduct();
        }, []);

        useEffect( ()=>{
            async function fetchStore() {
                if(storeId!==undefined){
            let resp = await axios.get(`/store/${storeId}`);
            console.log(resp.data)
            setstoreName(resp.data.storeName)
            setstoreAvatar(resp.data.storeLogo)
        }}
        fetchStore()
            }, []);
        
        
       
 return <>
 
    {products.map((product)=>{  
if(id==product._id){
        return(
           < div class="bg-codeblocks">
            <div class="main-box-codeblocks">
                <div class="container">
        
                    <div class="row">
                        <div class="col-md-6">
                            <div class="box-image-codeblocks">
                               
                        <ProductSlider image1={product.productImage1} image2={product.productImage2} image3={product.productImage3} title={product.productTitle}/>
                                
                            </div>
                        </div>
                        <div class="col-md-6" id="uniqueness">
                            <h2 class="text-bold text-strong">{product.productTitle}</h2>
                            <span>
                                <h1>{`Rs ${product.productPrice}`}</h1>
                                 <h2 style={{display:'inline-block'}}> <img src={`${storeAvatar}`} alt="Avatar" class="avatar" />{` ${storeName}`}</h2>
                            </span>
                            <div style={{fontSize:'24px'}}>{product.totalProductStock !==0 ?"Available sizes" : "Out of stock"}</div>
                            <div>
                            { product.productSizeWithStock.Small != "0" ?<button  className="size2" ref={sizeSelection1}  onClick={()=>{setSizeset(sizeSelection1.current.textContent+"mall");seterror(null)}}>S</button>:null  }
                            { product.productSizeWithStock.Medium !="0" ?<button className="size2" ref={sizeSelection2} onClick={()=>{setSizeset(sizeSelection2.current.textContent+"edium");seterror(null)}}>M</button>:null}
                            { product.productSizeWithStock.Large != "0" ?<button className="size2" ref={sizeSelection3} onClick={()=>{setSizeset(sizeSelection3.current.textContent+"arge");seterror(null)}}>L</button>: null}
                            { product.productSizeWithStock.xLarge != "0" ?<button className="size2" ref={sizeSelection4} onClick={()=>{setSizeset(sizeSelection4.current.textContent+"arge");seterror(null)}}>xL</button>:null}
                            </div>
                            {error !== null  && <div style={{color:'red',fontSize:'24px',marginTop:'24px'}}><span style={{color:'yellow',}}>Warning<i class="fa-solid fa-triangle-exclamation"></i>: </span> Size missing</div>}
                            <span class="description-codeblocks">
        
                                <p style={{marginTop:'24px',color:'black',fontSize:'18px'}}>
                                    <strong>Description:</strong> <br/>
                                    <span class="text-muted">
                                        {product.productDescription}
                                    </span>
                                </p>
                            </span>
        
                            <span class="buy-form-codeblocks">
                                <div class="form-inline">
                                {cartitems.find((myitem)=>myitem.size==sizetype)==undefined
              
              ?<button className="btn btn-primary btn-lg btn-lg" style={{marginTop:'20px'}} onClick={()=>{ 
                if(sizetype!==null){
                                // setAdd("false")      
                                const productExist=cartitems.find((myitem)=>myitem.size==sizetype )
                                console.log(productExist)
                                if(productExist==undefined){
                                       let order={
                                           productTitle: product.productTitle,
                                           size:sizetype,
                                           productId:product._id,
                                           productQuantity:1,
                                           total:1*product.productPrice,
                                           productPrice:product.productPrice,
                                           productImage:product.productImage1,
                                           productDescription:product.productDescription,
                                           totalStock:sizetype=='Small'?Number(product.productSizeWithStock.Small):
                                           sizetype=='Large'?Number(product.productSizeWithStock.Large):
                                           sizetype=='Medium'?Number(product.productSizeWithStock.Medium):
                                           sizetype=='xLarge'?Number(product.productSizeWithStock.xLarge):null
                                           
                                        }

                                  setcartitems(([...cartitems,order]))
                                  setSizeset('')
                                  toast.success("Product added to cart");
                                }                       
                                else{
                                  setcartitems([...cartitems])
                                 
                                }}
                                else{
                                  seterror('exist')
                                  toast.error("Something went wrong");
                                }
                               

              }}>Add to cart</button>:<button className="btn btn-primary btn-lg btn-lg">Already sent in the cart</button>}

              
                                   
                                </div>
                            </span>
                           
                          <Link to='/cart' style={{textDecoration:'none'}}>  <div style={{fontSize:'28px',color:'rgb(10, 114, 255)',marginTop:'30px'}}>Visit Cart<i class="fa-brands fa-opencart" style={{fontSize:'28px',color:'rgb(10, 114, 255)',marginLeft:'8px'}}></i></div></Link>
                            {/* <button type="button"class="btn btn-primary btn-lg btn-lg">Add To Cart</button> */}
                        </div>
                        
                    </div>
        

                </div>
            </div>
        </div>
)}
})}
  
  {/* <ProductSlider image1={product.productImage1} image2={product.productImage2} image3={product.productImage3} title={product.productTitle}/> */}
{/* <div id="product">
    
    <div class="product_images">
        <img id="myImage4" src="mens2.jpg" alt=""/>
    </div>
   
    <div class="product_details">
        <div class="back">
            <span class="material-symbols-outlined">chevron_left</span>
        </div>

        <h2>The Atelier Tailored Coat</h2>
        <h3>$499.00</h3>

        <div class="about">
            <p>Availability :<span>In stock</span></p>
            <p>Product Code : <span>#4657</span></p>   
            <p>Tags : <span>Fashion, Hood, Classic</span> </p>
        </div>

        <p className="txt_adjust">Sleek, polished, and boasting an impeccably modern fit, this blue, 2-but-
            ton Lazio suit features a notch lapel, flap pockets, and accompanying flat
            front trousers—all in pure wool by Vitale Barberis Canonico.</p>
        <ul>
            <li>Dark blue suit for a tone-on-tone look</li>
            <li>Regular fit</li>
            <li>100% Cotton</li>
            <li>Free shipping with 4 days delivery</li>
        </ul>

        <a >Clear Selection</a>
        
        <div class="cta">
            <div class="btn btn_primary">add to cart</div>
            <div class="btn btn_outline_secondary">
                <span class="material-symbols-outlined">favourite</span><span id="see">add to wishlist</span><i id="icv" class="fa-sharp fa-solid fa-heart"></i></div>
        </div>
    </div>
</div> */}

 
 </>

}