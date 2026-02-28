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

  addCartItem = item => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        each => each.dish_id === item.dish_id,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(each =>
            each.dish_id === item.dish_id
              ? {...each, quantity: each.quantity + 1}
              : each,
          ),
        }
      }

      return {cartList: [...prevState.cartList, {...item, quantity: 1}]}
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.dish_id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(each =>
          each.dish_id === id ? {...each, quantity: each.quantity - 1} : each,
        )
        .filter(each => each.quantity > 0),
    }))
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.dish_id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    const jwtToken = Cookies.get('jwt_token')

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/"
              render={() => (jwtToken ? <Home /> : <Redirect to="/login" />)}
            />
            <Route
              exact
              path="/cart"
              render={() => (jwtToken ? <Cart /> : <Redirect to="/login" />)}
            />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
