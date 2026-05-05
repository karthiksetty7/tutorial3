import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    const {cartList} = this.state
    const existing = cartList.find(i => i.dish_id === dish.dish_id)

    if (existing) {
      this.setState({
        cartList: cartList.map(i =>
          i.dish_id === dish.dish_id ? {...i, quantity: i.quantity + 1} : i,
        ),
      })
    } else {
      this.setState({
        cartList: [...cartList, {...dish, quantity: 1}],
      })
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(i =>
        i.dish_id === id ? {...i, quantity: i.quantity + 1} : i,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(i => (i.dish_id === id ? {...i, quantity: i.quantity - 1} : i))
        .filter(i => i.quantity > 0),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(i => i.dish_id !== id),
    }))
  }

  render() {
    const {cartList} = this.state
    const token = Cookies.get('jwt_token')

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />

            <Route
              exact
              path="/"
              render={() => (token ? <Home /> : <Redirect to="/login" />)}
            />

            <Route
              exact
              path="/cart"
              render={() => (token ? <Cart /> : <Redirect to="/login" />)}
            />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
