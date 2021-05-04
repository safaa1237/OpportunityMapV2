import React, { useState } from "react";
import {useDispatch} from "react-redux"
import "./authentication.css";

function Authentication() {
    
  return <div> 
  <form className="modal-content animate" onSubmit={e => authentication(e)} >
    <div className="container">
      <label ><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required value={userName} onChange={e => setUserName(e.target.value)} ></input>    

      <label ><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required value={password}  onChange={e => setPassword(e.target.value)} ></input>
        
      <button type="submit"  >Login</button>
    </div>
  </form>
  </div>;
}

export default Authentication;
