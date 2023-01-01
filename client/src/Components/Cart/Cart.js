
import "./Cart.css"
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"


export default()=>{
  let calculation=[];
 
  let calculate;
  let [refetch,setRefetch]=useState([]);
  let [cart,setCart]=useState([]);
  let [amount,setAmount]=useState(0);
  const products = JSON.parse(localStorage.getItem('cart'));
  useEffect(()=>{
    if(products!==null){
    setCart(products)
    }
  },[refetch])

  function setting2(){
    localStorage.setItem('cartData',JSON.stringify(cart))
     window. scrollTo(0, 0)
  } 
  const handleDecrement = (cart_id,size) => {
    setCart(cart => 
        cart.map( (item) => 
            cart_id == item.productId && item.size==size ? {...item, productQuantity:item.productQuantity>1?  Number(item.productQuantity - (item.totalStock > 1 ? 1:0)):1 } : item,
            
        )
    );
  
}
const handleIncrement = (cart_id,size,) => {
  console.log(cart_id)
  setCart(cart => 
    cart.map( (item) => 
        cart_id == item.productId  && item.size==size ? {...item, productQuantity: item.productQuantity<item.totalStock? Number(item.productQuantity + (item.totalStock > 1 ? 1:0)):item.totalStock } : item,
    )
);
   
}

// useEffect(()=>{
//   async function settting(){
//    await setAmount(calculate)
//   }
  
// },[setAmount])
console.log(amount)
 

    // productTitle: product.productTitle,
    // size:sizetype,
    // productQuantity:1,
    // total:1*product.productPrice,
    // productPrice:product.productPrice,
    // productImage:product.productImage1,
    // productDescription:product.productDescription,
    // product.total*product.productQuantity
  //   cart.totalQty = cart.items.reduce((sum, item)=>{
  //     return sum + item.quantity;
  // },0);
  let dataSettlement;
    return <>
   
   <h1 style={{textAlign:'center'}}>Shopping Cart</h1>
{cart.length!==0  ?	<div class="container">
         
		<section id="cart">
    {cart.map((product,index)=>{ 
     
        dataSettlement=   function dataSettlement(){
          const retriveProducts = JSON.parse(localStorage.getItem('cart'));
          if (retriveProducts) setCart(retriveProducts);
          if(cart?.length) { // only store the state if products exists and it's length is greater than 0
            localStorage.setItem('cart', JSON.stringify(cart));
          }
              calculate=product.productPrice*product.productQuantity;
              setCart(cart => 
                cart.map( (item) => 
           [...item, {totalAmount:calculate} ],
                )
            );
            localStorage.setItem('data',JSON.stringify(cart))
            }
   
            
           
      return (
			<article class="product">
				<header>
					<div class="remove">
						<img src={`${product.productImage}`} alt="" />

						<button className="myClass" onClick={()=>{
       setRefetch(cart.splice(index,1),localStorage.setItem('cart', JSON.stringify(cart)))  
      }} >Remove</button>
					</div>
				</header>

				<div class="content">

					<h1>{`${product.productTitle}`}</h1>
          {`${product. productDescription}`}



					<div title="You have selected this product to be shipped in the color yellow." style={{top: "0"}} class="color yellow"></div>
					<div style={{top: "20px"}} class="type small" id="setting">{product.size}</div>
				</div>

				<footer class="content">
        <button onClick={()=>handleDecrement(product.productId,product.size,calculate)} class="qt-minus">-</button>
					<span class="qt">{product.productQuantity}</span>
					<button onClick={()=>handleIncrement(product.productId,product.size,calculate)} class="qt-plus">+</button>

					<h2 class="full-price">
          {`${product.productPrice*product.productQuantity}`}
          
					</h2>
          {}
            
            {console.log(calculate)}
					<h2 class="price">
					{`Rs ${product.productPrice}`}
					</h2>
				</footer>
			</article>)})}
		</section>
    <Link to='/checkout'><button onClick={setting2} class="checkout">Checkout</button></Link>
	</div>
  
  :<h2 style={{textAlign:"center",marginTop:"100px",marginBottom:'33vh'}}>No items in the cart</h2>}  




    </>
}
 {/* <div className="set3">
    <h1>Shopping Cart</h1>

<div class="shopping-cart">

  <div class="column-labels">
    <label class="product-image">Image</label>
    <label class="product-details">Product</label>
    <label class="product-price">Price</label>
    <label class="product-quantity">Quantity</label>
    <label class="product-removal">Remove</label>
    <label class="product-line-price">Total</label>
  </div>
  {}
  {cartproduct.length!==0?cartproduct.map((product,index)=>{

    return(
  <div class="product">
    <div class="product-image">
      <img src={`${product.productImage1}`} alt="Image here" />
    </div>
    <div class="product-details">
      <div class="product-title" className="">{`${product.productTitle}`}</div>
      <p className="product-description">{`${product.productDescription}`}</p>
    </div>
    <div class="product-price">{`${product.productPrice}`}</div>
    <div class="product-quantity">
      <button  className="same">+</button><input id="data" style={{margin:'0',textAlign:'center'}}  type="number" value   />< button  className="same">-</button>
    </div>
    <div class="product-removal">
      <button class="remove-product" onClick={()=>{
       setRefetch(cartproduct.splice(index,1),localStorage.setItem('cart', JSON.stringify(cartproduct)))  
      }} >
        Remove
      </button>
    </div>
    <div class="product-line-price">25.98</div>
  </div>)
}):"No items in the cart"}  

  <div class="totals">
    <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">71.97</div>
    </div>
    <div class="totals-item">
      <label>Tax (5%)</label>
      <div class="totals-value" id="cart-tax">3.60</div>
    </div>
    <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">90.57</div>
    </div>
  </div>
      
    <Link to='/checkout'><button class="checkout">Checkout</button></Link>

</div>
</div> */}