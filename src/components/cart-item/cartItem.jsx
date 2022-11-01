import { CartItemContainer, CartItemImage, ItemDetails, ItemDetailsName } from './cart-item.styles';

const CartItem = ({ cartItem }) => {

  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemDetailsName>{name}</ItemDetailsName>
        <span >{quantity} x ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem