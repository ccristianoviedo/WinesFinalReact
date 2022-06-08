import React, { useContext } from 'react'
import CartContext from '../../Context/cart-context'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Cart.css'
import ItemCart from '../ItemCart/ItemCart'
import { Link } from 'react-router-dom'


const Cart = () => {
    const {items, clearItems, totalPrice, totalCount}=useContext(CartContext)

    if(items.length>=1){
        return (
            <>
                <div className='cart'>
                    <div className='cartElement'>
                        {
                            items.map((item)=>
                                <ItemCart key={item.id} item={item}/>
                            )
                        }
                    </div>
                    <div className='btnCancel'>
                        <button className="btn btn-danger btnEnd" onClick={()=>clearItems()}>BORRAR TODOS LOS PRODUCTOS</button>
                        <p>PRECIO TOTAL: $ {totalPrice()}</p>
                        <p>CANTIDAD TOTAL: {totalCount()} UNIDADES</p>
                        <button className="btn btn-info toShop"><Link to='/EndShop'>FINALIZAR COMPRA</Link></button>
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
export default Cart;