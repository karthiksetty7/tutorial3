import CartContext from '../context/CartContext'

const DishItem = props => {
  const {dish} = props

  // Proper destructuring with renaming (ESLint safe)
  const {
    dish_name: dishName,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_calories: dishCalories,
    dish_image: dishImage,
    dish_Availability: dishAvailability,
    addonCat,
  } = dish

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAdd = () => {
          addCartItem(dish)
        }

        return (
          <div className="dish-card">
            <div className="dish-info">
              <h3>{dishName}</h3>
              <p className="price">SAR {dishPrice}</p>
              <p>{dishDescription}</p>
              <p className="calories">{dishCalories} calories</p>

              {dishAvailability && dishPrice > 0 ? (
                <button type="button" onClick={onClickAdd}>
                  ADD TO CART
                </button>
              ) : (
                <p className="not-available">Not available</p>
              )}

              {addonCat.length > 0 && (
                <p className="custom">Customizations available</p>
              )}
            </div>

            <img src={dishImage} alt={dishName} className="dish-image" />
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
