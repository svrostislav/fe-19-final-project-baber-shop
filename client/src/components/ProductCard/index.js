import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.less';
import { Card, Button } from 'antd';
import {addToCart} from "../../store/cartItem/actionCartItem";
import { addItem } from '../../functions/products/product'

const ProductCard = ({ product }) => {
    const {name, currentPrice, itemNo, categories, imageUrls, _id} = product;
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuthenticated)
    const onAddToCart = (e) => {
        e.preventDefault();
        if(isAuth){
            addItem(_id).then(r => console.log(r.data))
        }else {
            const newProduct = {...product, cartQuantity: + 1}
            dispatch(addToCart(newProduct));
        }

    }

    return (
        <>
            <li className='product-card-container'>
                    <Card data-category={categories} src='google.com' data-itemno={itemNo} bordered={true} hoverable={true} cover={
                        <img className='product-card-img' alt="product-item" src={imageUrls}/>}>
                        <div className='product-heading-wrapper'>
                            <p className='product-heading'>{name}</p>
                            <p className='product-price'>{currentPrice}$</p>
                        </div>
                        <div className='button-container'>
                            <Button type="primary" className='product-card-btn' onClick={onAddToCart}>Add to cart</Button>
                        </div>
                    </Card>
            </li>
        </>
    )
}

export default ProductCard;