import React, {useEffect, useState} from 'react';
import './styles.less';
import ProductCarousel from "../../components/ProductCarousel";
import Ajax from "../../services/Ajax";

const ProductDetails = (props) => {
    const [images, setImages] = useState([])

    useEffect( () => {
        async function fetch () {
            const { imageUrls } = await Ajax.get('/products/76100')
            setImages(imageUrls);
        }
        fetch();
    }, [])

    return (
        <div className='container'>
            <ProductCarousel imageUrls={images}/>
        </div>
    )
}

export default ProductDetails