import "./Collections.css"
import {Link} from 'react-router-dom'
export default ()=>{
    return (<>
    <div id="distance">
     <p id="mytetxt">Our Collections</p>
     <p style={{textAlign:"center",fontSize:'20px',color:'black',marginBottom:'40px'}}>Checkout our fabulous Collection</p>
    <div id="centeralizing">
        {/* <------No1-----> */}
    <Link className="effectnull" to='/mensCollection' onClick={ ()=>window. scrollTo(0, 0)}>
    <div class="main">
   <div class="section-content">
       <div class="content-wrapper">          
              <div class="box-unique box-1">
                <div class="first">
                   <h2 className="ct">Men Collection</h2>
                </div>
               
           </div>
       </div>
   </div>
  </div>
  </Link>
     {/* <------No2-----> */}
     <Link className="effectnull"  to='/womenCollection' onClick={ ()=>window. scrollTo(0, 0)}>
  <div class="main">
   <div class="section-content">
       <div class="content-wrapper">          
              <div class="box-unique box-2">
               
              <div class="first">
                   <h2 className="ct">Women Collection</h2>
                </div>
           </div>
       </div>
   </div>
  </div>
  </Link>
     {/* <------No3-----> */}

    <Link className="effectnull"  to='/childrenCollection' onClick={ ()=>window. scrollTo(0, 0)}>
     <div class="main">
   <div class="section-content">
       <div class="content-wrapper">          
              <div class="box-unique box-3">
                <div class="first">
                   <h2 className="ct">Kids Collection</h2>
                </div>
              
           </div>
       </div>
   </div>
  </div>
  </Link>
  </div>
  
  </div>
    </>)
}

