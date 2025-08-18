import React, { useEffect, useState } from 'react';
import { Input, Button, Table, App, Typography } from 'antd';
import { FiTrash2,FiEdit } from 'react-icons/fi';
const { Title } = Typography
import { useActions } from '../../actions/admin';
import { useAdminStore } from '../../store/adminStore';

const Categories = () => {
    const { addCategory, deleteCategory,editCategory } = useActions()
    const[editId,setEditId]=useState("")
    const { categories } = useAdminStore()
    const { message } = App.useApp()

    let temp=''    

    const [newCategory, setNewCategory] = useState('')

    useEffect(()=>{
        if(editId){
            const category=categories?.filter((cat)=>cat?.id===editId)
            setNewCategory(category[0]?.category)
            temp=category[0]?.category
        }
    },[editId])

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'id',
            render: (record) => (
                <div className='flex items-center gap-3' >
                    <Button
                        type="text"
                        icon={<FiEdit />}
                        onClick={() => { 
                            setEditId(record)
                        }}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<FiTrash2 />}
                        onClick={() => { deleteCategory(record) }}
                    />
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        if (!newCategory?.trim())
            return
        const isExist = categories?.filter((catg) => catg?.category == newCategory?.trim())
        if (isExist?.length) {
            message.error("Category already exists.")
            return;
        }
        addCategory(newCategory?.trim(), message)
        setNewCategory("")
    }

    const handleEdit = () => {
        if (!newCategory?.trim())
            return
        const isExist = categories?.filter((catg) => catg?.category == newCategory?.trim())
        if (isExist?.length) {
            message.error("Category already exists.")
            return;
        }
        editCategory(editId,newCategory)
        setEditId('')
        setNewCategory("")
        temp==""
    }

    return (
        <div className="p-6 bg-white shadow rounded">
            <Title level={4} >Manage Category</Title>

            {/* Add Category Form */}
            <div className='bg-blue-50 px-5 py-5 rounded-xl border border-blue-200' >
                <Input placeholder='Enter Category' size='large' value={newCategory} onChange={(e) => {
                    setNewCategory(e.target.value)
                }} onKeyDown={(e) => {
                    if (e.key == "Enter")
                        if(editId)
                            handleEdit()
                        else
                            handleAdd()
                }} />
                <div className='flex justify-end my-3' >
                    {
                        editId?
                        <>
                            <Button className='mx-1' type='primary' onClick={handleEdit} >Update</Button>
                            <Button className='mx-1' type='primary' danger onClick={()=>{
                                setNewCategory('')
                                setEditId('')
                                temp=''
                            }} >Cancel</Button>
                        </>:
                        <Button type='primary' onClick={handleAdd} >Add Category</Button>
                    }
                </div>
            </div>

            {/* Categories Table */}
            <div className="mt-6">
                <Table
                    columns={columns}
                    dataSource={categories}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
};

export default Categories;
