import {Component} from 'react'
import CartContext from './CartContext'

class CartProvider extends Component {
  state = {
    cartList: [],
  }

  addCartItem = item => {
    const {cartList} = this.state
    const existing = cartList.find(each => each.dishId === item.dishId)

    if (existing) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.dishId === item.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    } else {
      this.setState(prev => ({
        cartList: [...prev.cartList, {...item, quantity: 1}],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.dishId === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.dishId === id && each.quantity > 1
          ? {...each, quantity: each.quantity - 1}
          : each,
      ),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}

export default CartProvider
