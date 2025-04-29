import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/seller');
      if(data.success){
        setOrders(data.orders)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-5 justify-between p-5 max-w-5xl border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            {/* Box Icon and Item Info */}
            <div className="flex gap-4 w-full md:w-[35%]">
              <img className="w-12 h-12 object-contain" src={assets.box_icon} alt="box icon" />
              <div>
                {order.items.map((item, index) => (
                  <p key={index} className="font-medium text-gray-800">
                    {item.product.name}
                    <span className="text-primary"> x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address Info */}
            <div className="text-sm md:text-base text-gray-600 w-full md:w-[30%]">
              <p className="text-black font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p>Phone: {order.address.phone}</p>
            </div>

            {/* Amount & Payment */}
            <div className="flex flex-col justify-between text-right text-sm md:text-base text-gray-600 w-full md:w-[30%]">
              <p className="text-lg text-black font-semibold">
                {currency}{order.amount}
              </p>
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
