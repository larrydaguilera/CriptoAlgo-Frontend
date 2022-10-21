import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Validaciones.css'


export default function IngresoDinero
  () {

    const [usd, setUsdBalance] = useState("");
    const [numberError, setNumberError] = useState(false);
    const {auth} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        

      if (!localStorage.getItem("token")) {
       navigate("/iniciarsesion")
      }
   }, [navigate]);


    const numberValidation = () =>{
      const regEx = /^[0-9]+$/i;
      if(regEx.test(usd) ){
        setNumberError(false)
      }else if
        (!regEx.test(usd) || usd  === "") {
          setNumberError(true)
        }
    }



    const DEPOSIT_URL= 'wallets/me/add'

    const token = auth



    const ingresarDinero=()=>{
     
      numberValidation();
      const data = {
        usdBalance:usd,
      }
    
    
       

       axios.patch(DEPOSIT_URL, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
       .then(res => {
           console.log(res)
           navigate("/plataforma")
       })
   
       .catch(()=>{
           console.log("No Server Response")
       })
   
    }

  return (
    <>
      <div className='register'>
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">Ingresar dinero</h5>
            </div>
            <div className="card-body">
              <p className="card-text">¿Cuánto dinero deseas ingresar?</p>
              <div className="d-flex"> 
                  <input className={numberError?"inputNumberError":"inputNumber"} 
                        type="number"
                        name="text"
                        placeholder="0.00"
                        onChange={(e)=> setUsdBalance(e.target.value)}
                  
                  /> 
                  <p>USD</p>
              </div>
              {numberError&&<div className="messageError"><label>
                Ingrese un monto correcto
              </label></div>
              } 
              
              <div className="card-footer text-muted">
                <button type="button" className="btn btn-success me-3" onClick={ingresarDinero}>Aceptar</button>
                <Link to="/plataforma">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button> 
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}
