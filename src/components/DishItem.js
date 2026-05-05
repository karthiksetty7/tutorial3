import {Component} from 'react'
import CartContext from '../context/CartContext'

class DishItem extends Component {
  state = {
    quantity: 0,
  }

  onIncrement = incrementCartItemQuantity => {
    const {quantity} = this.state

    this.setState({quantity: quantity + 1})
    incrementCartItemQuantity()
  }

  onDecrement = decrementCartItemQuantity => {
    const {quantity} = this.state

    if (quantity > 0) {
      this.setState({quantity: quantity - 1})
      decrementCartItemQuantity()
    }
  }

  render() {
    const {dish} = this.props
    const {quantity} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const isAvailable = dish.dish_Availability !== false

          return (
            <div>
              <h1>{dish.dish_name}</h1>

              <p>
                {dish.dish_currency} {dish.dish_price}
              </p>

              <p>{dish.dish_description}</p>

              <p>{dish.dish_calories} calories</p>

              <img src={dish.dish_image} alt={dish.dish_name} />

              {/* SHOW CONTROLS ONLY IF AVAILABLE */}
              {isAvailable && (
                <>
                  <button
                    type="button"
                    onClick={() => this.onDecrement(decrementCartItemQuantity)}
                  >
                    -
                  </button>

                  <p>{quantity}</p>

                  <button
                    type="button"
                    onClick={() => this.onIncrement(incrementCartItemQuantity)}
                  >
                    +
                  </button>

                  {/* ADD TO CART ONLY WHEN quantity > 0 */}
                  {quantity > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        addCartItem({
                          dish_id: dish.dish_id,
                          dish_name: dish.dish_name,
                          dish_image: dish.dish_image,
                          dish_price: dish.dish_price,
                        })
                      }
                    >
                      ADD TO CART
                    </button>
                  )}
                </>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
