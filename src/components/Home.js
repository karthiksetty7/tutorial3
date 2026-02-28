import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CategoryTabs from './CategoryTabs'
import DishItem from './DishItem'
import CartContext from '../context/CartContext'

class Home extends Component {
  state = {
    menuList: [],
    activeCategory: '',
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const categories = data[0].table_menu_list

    this.setState({
      menuList: categories,
      activeCategory: categories[0].menu_category,
    })
  }

  changeCategory = category => {
    this.setState({activeCategory: category})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {menuList, activeCategory} = this.state
    const activeMenu = menuList.find(
      each => each.menu_category === activeCategory,
    )

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <div className="app-container">
              {/* Header */}
              <header className="header">
                <Link to="/" style={{textDecoration: 'none'}}>
                  <h2>UNI Resto Cafe</h2>
                </Link>

                <div className="header-actions">
                  <Link to="/cart" className="cart">
                    🛒 <span>{cartList.length}</span>
                  </Link>
                  <button type="button" onClick={this.onClickLogout}>
                    Logout
                  </button>
                </div>
              </header>

              {/* Category Tabs */}
              <CategoryTabs
                menuList={menuList}
                activeCategory={activeCategory}
                changeCategory={this.changeCategory}
              />

              {/* Dish List */}
              <div className="dishes-container">
                {activeMenu &&
                  activeMenu.category_dishes.map(dish => (
                    <DishItem key={dish.dish_id} dish={dish} />
                  ))}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Home)
