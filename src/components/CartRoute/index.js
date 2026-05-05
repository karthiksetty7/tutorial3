import CartContext from '../context/CartContext'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      } = value

      return (
        <div>
          <h1>Cart Items</h1>

          {/* REMOVE ALL BUTTON (MANDATORY TEST) */}
          <button type="button" onClick={removeAllCartItems}>
            Remove All
          </button>

          {cartList.map(each => (
            <div key={each.dishId}>
              {/* IMAGE */}
              <img src={each.dishImage} alt={each.dishName} />

              {/* NAME */}
              <h1>{each.dishName}</h1>

              {/* QUANTITY CONTROLS */}
              <button
                type="button"
                onClick={() => decrementCartItemQuantity(each.dishId)}
              >
                -
              </button>

              <p>{each.quantity}</p>

              <button
                type="button"
                onClick={() => incrementCartItemQuantity(each.dishId)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartRoute
