import './cart-dropdown.styles.scss';
import Button from '../button/button';
import CartItem from '../cart-item/cartItem';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartDropDown = () => {

  const { cartItems } = useContext(CartContext)

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropDown