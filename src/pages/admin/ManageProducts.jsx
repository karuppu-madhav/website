import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Image, Typography,Drawer } from 'antd';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAdminStore } from '../../store/adminStore';
import Logo from '../../assets/madhav-logo.jpg'
import { useActions } from '../../actions/admin'
import AddOrEditProduct from '../../components/AddOrEditProduct';

const ManageProducts = () => {


    const { products,setCurrentProduct } = useAdminStore()
    const[isEdit,setIsEdit]=useState(false);    

    const { deleteProduct } = useActions()

    const handleDelete = async (id) => {
        try {
            deleteProduct(id)
        } catch (err) {
            message.error('Delete failed: ' + err.message);
        }
    };

    const handleClose=()=>{
        setIsEdit(false)
        setCurrentProduct(null)
    }

    // Columns for AntD table
    const columns = [
        {
            title: "Sno",
            dataIndex: "index",
            key: 'index'
        },
        {
            title: 'Image',
            dataIndex: 'imageFile',
            key: 'imageFile',
            render: (url) => (
                <Image
                    width={50}
                    height={50}
                    src={url ? url : Logo}
                    alt="Product"
                    className="object-cover rounded"
                />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantityType',
            key: 'quantityType',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Price (₹)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `₹${price}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<FiEdit2 />}
                        onClick={() => {
                            // Navigate to edit page or open modal
                            setCurrentProduct(record)
                            setIsEdit(true)
                        }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement='leftTop'
                    >
                        <Button type="text" danger icon={<FiTrash2 />} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Typography.Title level={4}>Manage Products</Typography.Title>
            <div className='max-w-screen' >
                <Table
                    dataSource={products}
                    columns={columns}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            </div>
            <Drawer open={isEdit} size='large' onClose={handleClose} >
                <AddOrEditProduct isEdit={isEdit} setOpen={setIsEdit} />
            </Drawer>
        </div>
    );
};

export default ManageProducts;
