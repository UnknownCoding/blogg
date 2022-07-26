import React,{useState,useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBInput,MDBCardFooter,MDBValidation,MDBBtn,MDBIcon,MDBSpinner} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { toast } from 'react-toastify' 
import { register } from '../redux/features/authSlice'

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmedPass:'',
}
const toastStyle = {
    background: 'black',
    color: 'red',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
}


const Register = () => {
    const [formVal,setFormVal] = useState(initialState)
    const {email,password,firstName ,lastName,confirmedPass} = formVal
    const {loading,error} = useSelector((state)=>({...state.auth}))
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleSumbit =  (e) => {
        e.preventDefault();
        if(password !== confirmedPass){
            toast.error("Passwords dont match",{duration:5000, style: toastStyle,})
        }
        if(email && password && firstName && lastName && confirmedPass){
            dispatch(register({formVal,navigate,toast}))
        }
    
    }
    const onInputChange = (e) => {
        let {name,value} = e.target
        setFormVal({...formVal,[name]:value})
    }
    useEffect(()=>{
        error && toast.error(error,{duration:5000, style: toastStyle,}) 
    },[error])

    return (
        <div style={{margin:'auto',padding:'15px',maxWidth:'450px',alignContent:"center",marginTop:'120px'}}>
            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x'/>
                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSumbit} noValidate className='row g-3'>
                        <div className='col-md-6'>
                            <MDBInput label='First Name' type='text' value={firstName} name="firstName" onChange={onInputChange} required invalid validation="Please provide your First Name"/>
                        </div>
                        <div className='col-md-6'>
                            <MDBInput label='Last Name' type='text' value={lastName} name="lastName" onChange={onInputChange} required invalid validation="Please provide your Last Name"/>
                        </div>
                        <div className='col-md-12'>
                            <MDBInput label='Email' type='email' value={email} name="email" onChange={onInputChange} required invalid validation="Please provide your email"/>
                        </div>
                        <div className='col-md-12'>
                            <MDBInput label='Password' type='password' value={password} name="password" onChange={onInputChange} required invalid validation="Please provide your password"/>
                        </div>
                        <div className='col-md-12'>
                            <MDBInput label='Password Confirm' type='password' value={confirmedPass} name="confirmedPass" onChange={onInputChange} required invalid validation="Please confirm your password"/>
                        </div>

                        <div className='col-12'>
                            <MDBBtn style={{width:'100%'}} className='mt-2'>
                                {loading && (
                                    <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                )}
                                Register
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to='/login'>
                        <p>
                            Already have an account ? Sign In !
                        </p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Register