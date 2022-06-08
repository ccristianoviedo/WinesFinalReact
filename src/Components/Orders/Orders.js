import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../mocks/getOrder';

const Orders=()=>{
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const {orderId}= useParams()  

    useEffect(() => {        
        setLoading(true)
        getOrder(orderId)
        .then((snapshot) => setOrder({...snapshot.data(), id: snapshot.id}))
        .catch((error)=>console.error(error + 'HA OCURRIDO UN ERROR!!'))
        .finally(()=>setLoading(false))    
    },[orderId])    
    return(
        <>   
            <h1>GRACIAS POR SU COMPRA</h1>     
            {loading? <h2>Cargando...</h2>:
            <div>
                <br/>         
                <h4>Hola tu codigo de compra es: {orderId}</h4>               
            </div>}            
        </>
    )
}   
export default Orders;