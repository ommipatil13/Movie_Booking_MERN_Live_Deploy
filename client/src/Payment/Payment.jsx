import React from 'react'
import axios from 'axios'

const Payment = () => {

    const buyFunction = async () => {
        let response = await axios.post(`/payment`)

        if (response && response.status === 200) {
            window.location.href = response.data.url
            console.log(response.data)
        }
    }

    return (
        <div>
            <button onClick={buyFunction} >Payment</button>
        </div>
    )
}

export default Payment