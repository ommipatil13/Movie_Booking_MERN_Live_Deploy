import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api_helpers/api_helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const onResReceived = (data) => {
        console.log(data)
        dispatch(userActions.login())
        localStorage.setItem("userId", data.id)
        navigate('/')
    }

    const getData = (data) => {
        console.log("Auth", data)
        sendUserAuthRequest(data.inputs, data.signup)
            .then(onResReceived)
            // .then((res) => console.log(res))
            // .then(() => dispatch(userActions.login()))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <AuthForm onSubmit={getData} isAdmin={false} />
        </div>
    )
}

export default Auth