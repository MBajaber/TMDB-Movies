import React from 'react';
import './SignUp.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as EmailValidator from 'email-validator';
import { auth } from '../../firebase';
import Loader from '../../Copmponents/Loader/Loader';
import { Alert, AlertTitle } from '@material-ui/lab';
import { getUserInfo } from '../../store/UserSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function SignUp({ history }) {
    const dispatch = useDispatch();
    const [values, setValues] = React.useState({
        email: '',
        validateEmail: false,
        touchEmail: false,
        password: '',
        showPassword: false,
        validatePassword: false,
        touchPassword: false,
        error: '',
        isLoader: false
    });
    
    const handleChange = (prop) => (event) => {
        if(prop === 'email') {
            setValues({ ...values, [prop]: event.target.value, validateEmail: EmailValidator.validate(event.target.value), touchEmail: true});
        } else if(prop === 'password') {
            setValues({ ...values, [prop]: event.target.value, validatePassword: event.target.value.length >= 6, touchPassword: true});
        }
    };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const submitHandler = (event) => {
        handleMouseDownPassword(event);
        if(values.email === '' && values.password === '') {
            setValues({ ...values, touchEmail: true, touchPassword: true});
        } else if(values.password.length > 0 && values.validatePassword && values.email.length > 0 && values.validateEmail) {
            console.log('Success');
            setValues({ ...values, isLoader: true, error: ''});
            auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(({user}) => {
                dispatch(getUserInfo({
                    uid: user.uid,
                    email: user.email
                }))
                setValues({ ...values, email: '', password: '', isLoader: false});
                history.push('/');
            })
            .catch(error => {
                setValues({ ...values, password: '', error: error.message, isLoader: false});
            });
        }
    };

    return (
        <div className='signup'>
            <div className="signup_box">
                <h2 className="signup_title">Sign Up</h2>
                {
                    values.isLoader && (
                        <div style={{position: 'relative'}}>
                            <Loader width='30px' height='30px' />
                        </div>
                    )
                }
                {
                    values.error.length > 0 && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>{values.error}</strong>
                        </Alert>
                    )
                }
                <form onSubmit={submitHandler} noValidate autoComplete="off">
                    <TextField
                        required
                        id="standard-required"
                        label="Email"
                        value={values.email}
                        onChange={handleChange('email')}
                        error={values.touchEmail ? !values.validateEmail ? true : false : false}
                    />
                    <FormControl>
                        <InputLabel 
                            htmlFor="standard-adornment-password" 
                            required
                            error={values.touchPassword ? !values.validatePassword ? true : false : false}
                        >
                            Password
                        </InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            label="Required"
                            required
                            error={values.touchPassword ? !values.validatePassword ? true : false : false}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button type='submit' variant="contained" color="primary">
                        Sign up
                    </Button>
                </form>
                <p className='have_account'>if you have account <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default SignUp;