import React, { useState, useEffect } from 'react'
import './styles.less'
import ProductsContainer from '../../components/CartProductsContainer'
import CartTotal from '../../components/CartTotal'
import RegistrationForm from '../../components/Forms/RegistrationForm'
import withModal from '../../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../store/modal/modalAction'
import axios from 'axios'

const Cart = () => {
  const typeOfModal = 'RegistrationForm'
  const ModalReg = withModal(RegistrationForm, typeOfModal)
  const dispatch = useDispatch()
  const productsLength = useSelector(state => state.cartProducts.products.length)
  const showModalR = () => {
    dispatch(showModal({ status: true, type: typeOfModal }))
  }
  const [cart, setCart] = useState([])
  const isAuth = useSelector(state => state.user.isAuthenticated)
  const products = useSelector(state => state.cartProducts.products)
  const getProducts = async () => await axios.get(`${process.env.REACT_APP_API}/cart`)
  useEffect(() => {
    if (isAuth) {
      getProducts().then(r => setCart(r.data.products))
    }

  }, [isAuth])
  console.log('products from DB', cart)

  return (
    <>
      {!productsLength && !cart
        ? <p>ooops, you have't added products yet</p>
        : <>
          <div className="cart-wrapper-div">
            <ProductsContainer products={isAuth? cart : products } isAuth={isAuth} setCart={setCart}/>
            <CartTotal productsDB={cart}/>
          </div>
          <button onClick={showModalR}>SHOW REGISTRATION</button>
          <ModalReg width={1000}/>
        </>
      }
    </>
  )
}

export default Cart