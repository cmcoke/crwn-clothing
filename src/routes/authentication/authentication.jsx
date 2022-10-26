import SignUpForm from '../../components/sign-up-form/signUpForm';
import SignInForm from '../../components/sign-in-form/signInForm';
import './authentication.styles.scss'

const Authentication = () => {

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )

}

export default Authentication