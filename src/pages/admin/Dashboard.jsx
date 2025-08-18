import React, { useMemo } from "react";
import {
    FiShoppingCart,
    FiDollarSign,
    FiUsers,
    FiPackage,
} from "react-icons/fi";
import { useAdminStore } from "../../store/adminStore";

export default function Dashboard() {

    const { products, categories, orders } = useAdminStore()

    const stats = [
        { title: "Total Orders", value: orders?.length, icon: <FiShoppingCart />, color: "bg-blue-500" },
        { title: "Categories", value: categories?.length, icon: <FiUsers />, color: "bg-purple-500" },
        { title: "Products", value: products?.length, icon: <FiPackage />, color: "bg-yellow-500" },
    ];

    const recentOrders = useMemo(() => {
        return orders?.slice(0, 5) ?.map((order) => {
                return { id: order?.orderID, customer: order?.customerData?.fullName, total: order?.cart?.totalAmount, status: order?.orderStatus }
        })
    }, [orders])

    return (
        <div className="p-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 transition-transform hover:scale-105"
                    >
                        <div className={`${item.color} text-white p-3 rounded-xl text-xl`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{item.title}</p>
                            <h3 className="text-2xl font-bold">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white shadow-md rounded-2xl mt-8 p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order, index) => (
                                <tr
                                    key={order?.id}
                                    className={`text-sm border-b border-gray-50 hover:bg-gray-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    <td className="p-3 font-medium">{order?.id}</td>
                                    <td className="p-3">{order?.customer}</td>
                                    <td className="p-3">Rs.{order?.total}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium
                        ${order?.status === "Paid"
                                                    ? "bg-green-100 text-green-600"
                                                    : order?.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {order?.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
