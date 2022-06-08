import React, { useContext, useState} from 'react'
import CartContext from '../../Context/cart-context'
import 'bootstrap/dist/css/bootstrap.min.css'
import './EndShop.css'
import { useNavigate } from 'react-router-dom';
import ItemCart from '../ItemCart/ItemCart'
import { Link } from 'react-router-dom'
import {addDoc, collection, getFirestore } from 'firebase/firestore'

const EndShop= () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const {items, clearItems,totalPrice, totalCount}=useContext(CartContext)

    const onHandlerSubmit=(e)=>{
        e.preventDefault()
        
        if(!name || !phone || !mail){
            alert('Por favor llene el Formulario')
            return false
        }
        const newOrder={
            buyer:{
                name,
                phone,
                mail
            },
            items:items,
            totalCount:totalCount(),
            Date:new Date()
        } 
        const generatorOrder= async(newOrder)=>{
            try {
                const db=getFirestore()
                const col= collection(db,'orders')
                const order= await addDoc(col, newOrder)
                navigate(`/orders/${order.id}`)
                clearItems()
            } catch (error) {
                console.log('error', error)
            }
        }
        generatorOrder(newOrder)      
           
    }   
    
    if(items.length>=1){
        return (
            <>
                <h1>FINALIZAR COMPRA</h1>
                <div className='cartShop'>
                    <div className='btnCancelShop'>
                        <form onSubmit={onHandlerSubmit}>
                            <label className='label'htmlFor='name'>DATOS COMPRADOR</label>
                            <input 
                                type="text" 
                                placeholder='Escriba su nombre'
                                 value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                            <input 
                                type="number" 
                                placeholder='Escriba su telefono'
                                 value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />                                
                            <input 
                                type="mail"
                                placeholder='Escriba su mail'
                                value={mail}
                                onChange={(e)=>setMail(e.target.value)}
                            />
                            <h4>TOTAL PRODUCTOS: {totalCount()}</h4>
                            <h4>TOTAL PRECIO: ${totalPrice()}</h4>
                            <input type="submit" value='Comprar' className="btn btn-danger end" />
                        </form>
                    </div>
                    <div className='cartElementShop'>
                        {
                            items.map((item)=>
                                <ItemCart key={item.id} item={item}/>
                            )
                        }
                    </div>
                </div>
            </>
        )
    } else return( 
        <>  <h3>NO HAY PRODUCTOS EN EL CARRITO</h3> 
            <p className='shop'><Link to='/'>IR A COMPRAR</Link></p>
        </>
    )
}
export default EndShop;