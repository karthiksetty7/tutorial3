import {Link} from 'react-router-dom'
import CartContext from '../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.dish_price * item.quantity,
        0,
      )

      const renderEmptyView = () => (
        <div className="empty-cart">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
          />
          <h2>Your Cart is Empty</h2>
          <Link to="/">
            <button className="browse-btn" type="button">
              Browse Menu
            </button>
          </Link>
        </div>
      )

      const renderCartItems = () => (
        <>
          <header className="header">
            <Link to="/" className="logo-link">
              <h2>UNI Resto Cafe</h2>
            </Link>
          </header>

          <div className="cart-container">
            <div className="cart-header">
              <h2>My Cart</h2>
              <button
                type="button"
                className="remove-all-btn"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>

            {cartList.map(item => (
              <div key={item.dish_id} className="cart-item">
                <img
                  src={item.dish_image}
                  alt={item.dish_name}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h3>{item.dish_name}</h3>

                  <p className="price">SAR {item.dish_price * item.quantity}</p>

                  <div className="counter">
                    <button
                      type="button"
                      onClick={() => decrementCartItemQuantity(item.dish_id)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => incrementCartItemQuantity(item.dish_id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeCartItem(item.dish_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total: SAR {totalPrice}</h3>
              <button className="checkout-btn" type="button">
                Checkout
              </button>
            </div>
          </div>
        </>
      )

      return (
        <div className="app-container">
          {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
