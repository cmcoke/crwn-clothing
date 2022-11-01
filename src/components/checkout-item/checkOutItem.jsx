import { CheckoutItemContainer, ImageContainer, CheckoutItemImage, CheckoutItemName, CheckoutItemQuantity, CheckoutItemPrice, Arrow, Value, RemoveButton } from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckOutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <CheckoutItemImage src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <CheckoutItemName> {name} </CheckoutItemName>
      <CheckoutItemQuantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </CheckoutItemQuantity>
      <CheckoutItemPrice > {price}</CheckoutItemPrice>
      <RemoveButton onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckOutItem