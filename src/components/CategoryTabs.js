const CategoryTabs = props => {
  const {menuList, changeCategory, activeCategory} = props

  return (
    <div>
      {menuList.map(each => {
        const isActive = each.menu_category === activeCategory

        return (
          <button
            key={each.menu_category}
            type="button"
            onClick={() => changeCategory(each.menu_category)}
            style={{
              fontWeight: isActive ? 'bold' : 'normal',
            }}
          >
            {each.menu_category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
