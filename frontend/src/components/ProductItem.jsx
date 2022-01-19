import { Link } from "react-router-dom";

const ProductItem = (props) => {

  const product = props.product;

  return (
    <div className='ui link cards'>
      <div className='card'>
        {product.price !== product.discountedPrice ? (
          <div
            style={{
              paddingTop: 10,
              paddingLeft: 10,
              // backgroundColor: '#fc0307',
              color: '#fc0307',
              fontWeight: 600,
            }}
          >
            Hot Offer {product.discountText}
          </div>
        ) : (
          <div
            style={{
              paddingTop: 30,
              paddingLeft: 20,
              // backgroundColor: '#fc0307',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            No OFfer
          </div>
        )}
        <div className='image'>
          <img src={product.image} alt={product.title} />
        </div>
        <div className='content'>
          <div className='header'>{product.title}</div>
          {product.price !== product.discountedPrice ? (
            <div className='meta price'>
              <div>$ {product.discountedPrice}</div>
              <span className='strikethrough'>
                <span className='meta price'>$ {product.price}</span>
              </span>
            </div>
          ) : (
            <div className='meta price'>$ {product.price}</div>
          )}

          <div className='meta'>
            {product.masterCategory}, {product.subCategory}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;