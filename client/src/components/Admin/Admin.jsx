import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../api_helpers/api_helpers'
import { useDispatch } from 'react-redux'
import { adminActions } from '../../store'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const onResReceived = (data) => {
        console.log(data)
        dispatch(adminActions.login())
        localStorage.setItem("adminId", data.id)
        localStorage.setItem("token", data.token)
        navigate('/')
    }

    const getData = (data) => {
        console.log("Admin", data)
        sendAdminAuthRequest(data.inputs)
            .then(onResReceived)
            // .then((res) => console.log(res))
            // .then(() => dispatch(adminActions.login()))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <AuthForm onSubmit={getData} isAdmin={true} />

        </div>
    )
}

export default Admin