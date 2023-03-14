import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const service = useLoaderData();
    const {title,price,_id} = service;
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = e => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregisterd';
        const phone = form.phone.value;
        const message = form.message.value;

        // db object
        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
        
    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl">
                    You are about to order: {title}
                </h2>
                <h4 className="text-3xl">
                    Price: {price}
                </h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered input-ghost w-full" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered input-ghost w-full" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered input-ghost w-full" />
                    <input name='email' type="email" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered input-ghost w-full" readOnly/>
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>

                <input className='btn' type="submit" value="Place Your Order" />
            </form>
           
        </div>
    );
};

export default Checkout;