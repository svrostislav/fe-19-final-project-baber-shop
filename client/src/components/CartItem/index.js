import React, { useState, useEffect } from 'react'
import './style.less'

import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, increaseQuantity, decreaseQuantity } from '../../store/cartItem/actionCartItem'
import axios from 'axios'

const CartItem = (props) => {
  const dispatch = useDispatch()
  const { imageUrls, name, currentPrice, _id, cartQuantity } = props.product
  const { setCart, cartQuantityDB } = props
  const [total, setTotal] = useState(0)
  const isAuth = useSelector(state => state.user.isAuthenticated)
  const increase = async (product) => await axios.put(`${process.env.REACT_APP_API}/cart/${product}`)
  const decrease = async (product) => await axios.delete(`${process.env.REACT_APP_API}/cart/product/${product}`)
  const deleteProduct = async (product) => await axios.delete(`${process.env.REACT_APP_API}/cart/${product}`)
  const deleteItem = (_id) => {
    deleteProduct(_id).then(r => setCart(r.data.products))
  }
  useEffect(() => {
    if (isAuth) {
      setTotal(cartQuantityDB * currentPrice)
    } else {
      setTotal(cartQuantity * currentPrice)
    }

  }, [cartQuantity, cartQuantityDB, currentPrice, isAuth])
  return (
    <div className="cart-item-wrapper">
      <div>
        <img className="cart-item-image" src={imageUrls[0]} alt=""/>
      </div>
      <div className="cart-item-meta">
        <p>{name}</p>
        <p>
          Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
          Delectus doloribus explicabo veniam!
        </p>
      </div>
      <div className="plus-minus-div">
        <div className="cart-item-price">{currentPrice}</div>
        <div className="cart-item-amount">
          <PlusCircleFilled
            onClick={() => {
              isAuth
                ? increase(_id).then(r => setCart(r.data.products))
                : dispatch(increaseQuantity(_id))
            }}/>
          <span>{isAuth ? cartQuantityDB : cartQuantity}</span>
          {cartQuantity === 0
            ? <MinusCircleFilled/>
            : <MinusCircleFilled onClick={() => {
              isAuth
                ? decrease(_id).then(r => setCart(r.data.products))
                : dispatch(decreaseQuantity(_id))
            }}/>
          }
        </div>
        <div className="cart-item-total">{total.toFixed(2)}</div>
        <div className="cart-item-basket-icon"
             onClick={() => {
               isAuth ? deleteItem(_id) : dispatch(deleteFromCart(_id))
             }}>
          <DeleteFilled/>
        </div>
      </div>
    </div>
  )
}

export default CartItem