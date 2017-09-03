import React from 'react';

export default function Unauthorized(props){
    return(
        <section className='thank-you'>
            <div>
                <i className='fa fa-exclamation-circle'></i>
                <p>{props.data}</p>
                <button id='btn-on-client-area' className='main-btn-style'>Log In</button>
            </div>
        </section>
    )
}