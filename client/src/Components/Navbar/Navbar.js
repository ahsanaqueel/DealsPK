import "./Navbar.css"
import SellerButtons from "./SellerButtons";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
// import NavDropdown from 'react-bootstrap/NavDropdown';
export default ()=>{
  function closing(){
    document.getElementById('menu-btn').checked =false;
  }
   
    
  
  return (<>
 
 <header class="main-header" style={{backgroundColor:'black'}}>
        <div class="logo">
        <Link className="" to='/'  style={{fontSize:'28px',color:'white',}}><img src='dealsPK.png' style={{width:'65px'}} alt='Logo.ong'/></Link>
         
        </div>
    
        <input style={{backgroundColor:'white'}} type="checkbox" class="menu-btn" id="menu-btn" />
        <label for="menu-btn" class="menu-icon">
          <span style={{backgroundColor:'white'}} class="menu-icon__line"></span>
        </label>
    
        <ul class="nav-links" id="toogleNav" style={{paddingTop:'20px'}}>
          <li class="nav-link">
           <Link to='/' onClick={closing}  style={{fontSize:'20px',color:'white'}}>Home</Link>
          </li>
          <li class="nav-link">
          <Link to='/cart'onClick={closing} style={{fontSize:'20px',color:'white'}}>Cart</Link>
          </li>
          {/* <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          <li class="nav-link">
            <a href="https://dashboard-dealspk.cyclic.app/Signup" onClick={closing} style={{fontSize:'20px'}} target="_blank"><SellerButtons/></a>
          </li>
          <li class="nav-link">
            <a href="https://dashboard-dealspk.cyclic.app/" onClick={closing} style={{fontSize:'20px'}} target="_blank"><LoginButton/></a>
          </li>
        </ul>
      </header>
{
 
}
  
  
  </>)

}