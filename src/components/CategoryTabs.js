import {Component} from 'react'

class CategoryTabs extends Component {
  render() {
    const {menuList, activeCategory, changeCategory} = this.props

    return (
      <ul className="tabs-container">
        {menuList.map(each => (
          <li
            key={each.menu_category}
            className={
              activeCategory === each.menu_category ? 'tab active' : 'tab'
            }
            onClick={() => changeCategory(each.menu_category)}
          >
            {each.menu_category}
          </li>
        ))}
      </ul>
    )
  }
}

export default CategoryTabs
