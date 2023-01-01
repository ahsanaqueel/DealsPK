import { map } from "jquery";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import {useForm, } from 'react-hook-form';
import {toast} from 'react-toastify'
import "./Checkout.css"
import { useNavigate } from "react-router-dom";

export default(props)=>{
      
    let totalcalculation=[];
    const cartProducts = JSON.parse(localStorage.getItem('cartData'));
    console.log(cartProducts)
    const navigate = useNavigate();
    function setting(){
      setTimeout(localStorage.clear(),3000)
      window. scrollTo(0, 0)
    }
    if(cartProducts !==null){
      cartProducts.map((product)=>{
        totalcalculation.push(product.productQuantity*product.productPrice)
        
      })
    }
    
      console.log(totalcalculation)

      const cartTotal = totalcalculation.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );
      console.log(cartTotal)

      let data = useForm();
     

    async function customerData(customerData){
        console.log(customerData)
        let form = new FormData();   
      let customerOrder=  {"customerName":customerData.customerName,
        "customerEmail":customerData.email,
        "customerPhone":customerData.phoneno,
        "customerAddress":customerData.address,
        'orderAmount':cartTotal,
        'orderProducts':cartProducts}     

        // form.append("customerName",customerData.customerName)
        // form.append("customerEmail",customerData.email)
        // form.append("customerPhone",customerData.phoneNo)
        // form.append("customerAddress",customerData.address)
        // form.append('orderAmount',cartTotal)
        // form.append('orderProducts',cartProducts)
        
         
        try{
               let resp = await axios.post('/order/orderdetails',customerOrder );
               toast.success("Your request has been sent");
               data.reset()
              setTimeout(()=>navigate("/"),1000) 
              
            }
            catch(e){
           
            console.log(e);
            toast.error("Something went wrong");
          }
              
            }
    
  return (
    <>
<div id="wrapper">
	
	
	<div class="container2">
		<div class="checkout1">
			<div class="payment">
				<div class="content">
                    
					<div class="infos">
                    <p style={{textAlign:'center',fontSize:'32px',color:'black'}}>Total Bill: Rs {cartTotal}</p>
                    <form onSubmit={data.handleSubmit( customerData  )}>
                        <div class="cardHolderName">
							<p class="title">Name</p>
							<div>
                <input {...data.register('customerName', {required:true})} />
            </div>
            {data.formState.errors.name && <div className="error">Enter Name</div>}
						</div>
						
						<div class="cardHolderName">
							<p class="title">Email</p>
                            <div>
                <input {...data.register('email', {required:true})} />
            </div>
            {data.formState.errors.email && <div className="error">Enter Email</div>}
						</div>
						
                        
						<div class="cardHolderName">
							<p class="title">Complete Address</p>
                            <div>
                <input {...data.register('address', {required:true})} />
            </div>
            {data.formState.errors.address && <div className="error">Enter Address</div>}
						</div>
						
						<div class="cardHolderName">
							<p class="title">Phone Number</p>
							<div>
                <input {...data.register('phoneno', {required:true})} />
            </div>
            {data.formState.errors.phoneno && <div className="error">Phone Number</div>}
						</div>
						<button className="mybtn" onClick={setting}>Checkout</button>
                        </form>
					</div> 
				</div>
			</div>
		</div>
	</div> 
</div> 

</>
  )
 
}