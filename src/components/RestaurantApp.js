import {Component} from 'react'
import CategoryTabs from './CategoryTabs'
import DishItem from './DishItem'

class RestaurantApp extends Component {
  state = {
    menuList: [],
    activeCategory: '',
    cartCount: 0,
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

  updateCart = value => {
    this.setState(prev => ({cartCount: prev.cartCount + value}))
  }

  render() {
    const {menuList, activeCategory, cartCount} = this.state
    const activeMenu = menuList.find(
      each => each.menu_category === activeCategory,
    )

    return (
      <div className="app-container">
        <header className="header">
          <h2>UNI Resto Cafe</h2>
          <div className="cart">
            🛒 <span>{cartCount}</span>
          </div>
        </header>

        <CategoryTabs
          menuList={menuList}
          activeCategory={activeCategory}
          changeCategory={this.changeCategory}
        />

        <div className="dishes-container">
          {activeMenu &&
            activeMenu.category_dishes.map(dish => (
              <DishItem
                key={dish.dish_id}
                dish={dish}
                updateCart={this.updateCart}
              />
            ))}
        </div>
      </div>
    )
  }
}

export default RestaurantApp
