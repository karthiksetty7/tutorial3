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
      } = value

      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.dishPrice * item.quantity,
        0,
      )

      const renderEmptyCart = () => (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
          />
          <h1>Your Cart is Empty</h1>

          <Link to="/">
            <button type="button">Browse Menu</button>
          </Link>
        </div>
      )

      const renderCartItems = () => (
        <div>
          <header>
            <Link to="/">
              <h1>UNI Resto Cafe</h1>
            </Link>
          </header>

          <h1>My Cart</h1>

          <button type="button" onClick={removeAllCartItems}>
            Remove All
          </button>

          {cartList.map(item => (
            <div key={item.dishId}>
              <img src={item.dishImage} alt={item.dishName} />

              <h1>{item.dishName}</h1>

              <p>SAR {item.dishPrice * item.quantity}</p>

              <button
                type="button"
                onClick={() => decrementCartItemQuantity(item.dishId)}
              >
                -
              </button>

              <p>{item.quantity}</p>

              <button
                type="button"
                onClick={() => incrementCartItemQuantity(item.dishId)}
              >
                +
              </button>
            </div>
          ))}

          <h1>Total: SAR {totalPrice}</h1>

          <button type="button">Checkout</button>
        </div>
      )

      return (
        <div>
          {cartList.length === 0 ? renderEmptyCart() : renderCartItems()}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
