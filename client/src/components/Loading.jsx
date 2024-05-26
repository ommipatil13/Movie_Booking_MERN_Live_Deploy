import React from 'react';
import loadingIcon from '../assets/loading.gif'

const Loading = () => {
    return (
        <div style={{ display: 'grid', placeContent: 'center', marginTop: '15vw' }} >
            <img src={loadingIcon} alt="loading" width={'100px'} />
        </div>
    )
}

export default Loading