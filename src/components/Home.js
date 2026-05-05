import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../context/CartContext'
import CategoryTabs from './CategoryTabs'
import DishItem from './DishItem'

class Home extends Component {
  state = {
    menuList: [],
    activeCategory: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const res = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await res.json()

    const list = data[0].table_menu_list

    this.setState({
      menuList: list,
      activeCategory: list[0]?.menu_category,
    })
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {menuList, activeCategory} = this.state

    const activeMenu = menuList.find(i => i.menu_category === activeCategory)

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const cartCount = cartList.reduce((acc, i) => acc + i.quantity, 0)

          return (
            <div>
              {/* FIXED HEADER TEXT */}
              <h1>UNI Resto Cafe</h1>

              <p>My Orders</p>

              {/* CART BUTTON */}
              <Link to="/cart">
                <button type="button" data-testid="cart">
                  Cart <span>{cartCount}</span>
                </button>
              </Link>

              <button type="button" onClick={this.logout}>
                Logout
              </button>

              {/* CATEGORY TABS */}
              <CategoryTabs
                menuList={menuList}
                activeCategory={activeCategory}
                changeCategory={cat => this.setState({activeCategory: cat})}
              />

              {/* DISHES */}
              {activeMenu &&
                activeMenu.category_dishes.map(dish => (
                  <DishItem key={dish.dish_id} dish={dish} />
                ))}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Home)
