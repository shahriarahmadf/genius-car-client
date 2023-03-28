import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user, logout} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect( () => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                logout();
            }
            return res.json()
        })
        .then(data => {
            // console.log('recieved', data);
            setOrders(data);
        })
    }, [user?.email])
    
    return (
        <div>
            <h2 className="text-5xl">You have {orders.length} orders</h2>

            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map(order => <OrderRow
                            key={order._id}
                            order={order}
                        ></OrderRow>)
                }
                </tbody>
                {/* foot */}
                <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
                </tfoot>
                
            </table>
            </div>
        </div>
    );
};

export default Orders;