import Form from '../common/form/Form'
import Joi from 'joi-browser';
import axios from 'axios';
import auth from '../services/authService';

class SignUp extends Form {
    state = {
        data: { email: '', password: '', username: '', repeat_password: '' },
        errors: {},
    }
    schema = {
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
        repeat_password: Joi.string().required().label('Repeat password'),
        username: Joi.string().required().label('Username')
    }

    doSubmit = async () => {
        const { password, repeat_password } = this.state.data
        if (password !== repeat_password) return this.setState({
            errors: {
                repeat_password: 'Passwords does not match'
            }

        })

        const { data } = await axios.post('http://localhost:3001/signup', this.state.data)

        if (data.errors) {
            this.setState({ errors: data.errors })
        }
    }

    render() {
        if (auth.getCurrentUser()) window.location = '/'
        return (
            <>
                <div className='relative w-full h-[calc(100vh-3rem)] flex flex-col justify-center items-center'>
                    <div className='container absolute top-0 w-1/3 h-5/6 flex flex-col justify-center items-center bg-[#28375d] rounded-lg  xsm:w-11/12 sm:w-2/3  md:w-4/12'>
                        <h1 className=' font-openSans text-5xl'>Sign up</h1>
                        <form onSubmit={this.handleForm} className='w-full'>
                            {this.renderInput('username', 'Username', 'text', '', styles.inputContainer, styles.inputEle, styles.inputEle)}
                            {this.renderInput('password', 'Password', 'password', '', styles.inputContainer, styles.inputEle)}
                            {this.renderInput('repeat_password', 'Repeat Password', 'password', '', styles.inputContainer, styles.inputEle)}
                            {this.renderInput('email', 'Email', 'email', '', styles.inputContainer, styles.inputEle)}
                            {this.renderButton('Submit', styles.submitBtn)}
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default SignUp;

const styles = {
    inputContainer: ' flex flex-col w-11/12 mx-auto',
    submitBtn: 'w-11/12 bg-[#1161ed] p-2 ml-[calc((100%-91%)/2)] rounded-full mt-4',
    inputEle: 'rounded-full p-3 my-2 w-full text-black'
}