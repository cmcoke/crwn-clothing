import { NavigationContainer, LogoContainer, NavigationLinks, NavigationLink } from './navigation.styles'
import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'
import { signOutUser } from '../../utils/firebase/firebase'
import CartIcon from '../../components/cart-icon/cartIcon'
import CartDropDown from '../../components/cart-dropdown/cartDropDown'

const Navigation = () => {

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>

        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavigationLinks>
          <NavigationLink to='/shop'>
            SHOP
          </NavigationLink>

          {
            currentUser ? (
              <NavigationLink as='span' onClick={signOutUser}>SIGN OUT</NavigationLink>
            ) : (
              <NavigationLink to='/auth'>
                SIGN IN
              </NavigationLink>
            )
          }

          <CartIcon />
        </NavigationLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation