import Form from '../common/form/Form';
import Joi from 'joi-browser';
import Image from 'next/image';
import auth from '../services/authService'

class Login extends Form {
    state = {
        data: { email: '', password: '' },
        errors: {},
        loadLoginForm: false,
        loadImage: true,
    }
    schema = {
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
    }

    doSubmit = async () => {
        try {
            const { email, password } = this.state.data
            const data = await auth.login(email, password)
            if (data.errors) return this.setState({ errors: data.errors })
            window.location = '/'

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                console.log(ex)
            }

        }
    }

    handleLoginContainer = () => {

        return (
            <div className='loginContainer rounded-md m-auto bg-[#28375d] shadow-loginContainer w-80 h-auto font-oswald opacity-90 p-4'>
                <h1 className='text-lime-50 relative mt-0 text-center text-5xl font-oswald p-4'>Login</h1>
                <form onSubmit={this.handleForm} className='   top-0 left-0 right-0 bottom-0 rounded-md m-auto'>
                    {this.renderInput('email', 'Email', 'email', 'Enter your Email here ...', style.inputContainerStyle, style.inputstyle)}
                    {this.renderInput('password', 'Password', 'password', 'Enter Password', style.inputContainerStyle, style.inputstyle)}
                    <div className='w-full flex flex-row items-center justify-center mt-3 '>
                        {this.renderButton('Login', style.submitBtn)}
                        <button className={style.closeBtn} onClick={() => this.setState({ loadLoginForm: !this.state.loadLoginForm })}>Close</button>
                    </div>
                </form>
            </div>
        )
    }

    handleImage = () => {
        return <div className={`${style.img} hover:bg-[#37bcf8] transition-all duration-25 ease-out`} onClick={() => this.setState({ loadLoginForm: !this.state.loadLoginForm })}>
            <Image
                src="https://dqcgrsy5v35b9.cloudfront.net/cruiseplanner/assets/img/icons/login-w-icon.png" alt='d'
                width={100}
                height={100}
                className='block m-auto '
            />
        </div>
    }

    render() {
        if (auth.getCurrentUser()) window.location = '/'
        return (
            <>
                {this.state.loadLoginForm ? this.handleLoginContainer() : this.handleImage()}
            </>
        );
    }
}

export default Login;

const style = {
    submitBtn: ' w-5/12 mt-3 text-xl rounded-md px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer opacity-100 hover:opacity-70',
    closeBtn: 'w-5/12 mt-3 hover:bg-[red] rounded-md px-5 py-2 ml-1 cursor-pointer',
    inputstyle: ' mx-auto my-4 font-oswald relative w-11/12 block  text-lg text-lime-50 p-2 rounded-full border-none bg-inputBG transition-all duration-200 ease-in-out focus:outline-none focus:shadow-inputFocus focus:bg-inputBG_Focus',
    img: ' cursor-pointer absolute top-0 left-0 right-0 bottom-0 p-8 m-auto w-28 h-28 rounded-full bg-loginImg truncate opacity-40 ',
    inputContainerStyle: 'flex flex-col'
}