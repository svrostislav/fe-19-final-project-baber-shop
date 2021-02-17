import React, { useState, useEffect } from 'react'
import './style.less'

import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, increaseQuantity, decreaseQuantity } from '../../store/cartItem/actionCartItem'
import { decrease, increase, deleteProduct } from '../../functions/products/product'

const CartItem = (props) => {
  const dispatch = useDispatch()
  const { imageUrls, name, currentPrice, _id, cartQuantity } = props.product
  const { setCart, cartQuantityDB } = props
  const [total, setTotal] = useState(0)
  const isAuth = useSelector(state => state.user.isAuthenticated)

  const riseQuantity = (_id) => {
    if (isAuth) {
      increase(_id).then(r => setCart(r.data.products))
    } else {
      dispatch(increaseQuantity(_id))
    }
  }
  const downQuantity = (_id) => {
    if (isAuth) {
      decrease(_id).then(r => setCart(r.data.products))
    } else {
      dispatch(decreaseQuantity(_id))
    }
  }
  const deleteItem = (_id) => {
    if (isAuth) {
      deleteProduct(_id).then(r => setCart(r.data.products))
    } else {
      dispatch(deleteFromCart(_id))
    }
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
            onClick={() => riseQuantity(_id)}/>
          <span>{isAuth ? cartQuantityDB : cartQuantity}</span>
          {cartQuantity === 0
            ? <MinusCircleFilled/>
            : <MinusCircleFilled onClick={() => downQuantity(_id)}/>
          }
        </div>
        <div className="cart-item-total">{total.toFixed(2)}</div>
        <div className="cart-item-basket-icon"
             onClick={() => deleteItem(_id)}>
          <DeleteFilled/>
        </div>
      </div>
    </div>
  )
}

export default CartItem