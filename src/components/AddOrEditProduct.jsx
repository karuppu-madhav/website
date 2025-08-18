import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Upload, App, InputNumber, Image } from 'antd';
import { FiUpload } from 'react-icons/fi';
import { useAdminStore } from '../store/adminStore';
import { useActions } from '../actions/admin'

const { Option } = Select;

const AddOrEditProduct = ({ isEdit, setOpen }) => {

    const { addProduct,editProduct } = useActions()

    const { categories, currentProduct,setCurrentProduct } = useAdminStore()

    const [product, setProduct] = useState({
        name: '',
        quantityType: '',
        category: '',
        price: 0,
        imageFile: ''
    })

    useEffect(() => {
        if (isEdit)
            setProduct({ ...currentProduct })
    }, [currentProduct])

    const { message } = App.useApp()

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleImageChange = async ({ file }) => {
        const isImage = file.type.startsWith('image/');
        const isLt2MB = file.size / 1024 / 1024 < 1;

        if (!isImage) {
            message.error('You can only upload image files!');
            return Upload.LIST_IGNORE; // Prevent file from being added
        }

        if (!isLt2MB) {
            message.error('Image must be smaller than 1MB!');
            return Upload.LIST_IGNORE;
        }
        console.log(file)
        try {
            const base64 = await getBase64(file);
            setProduct({ ...product, imageFile: base64 })
        } catch (err) {
            message.error('Failed to read file as Base64');
        }
        return false; // Prevent auto upload
    };

    const handleSubmit = () => {
        if (!product?.name?.trim() || !product?.quantityType?.trim() || !product?.category?.trim() || !product?.price) {
            message.error('Please fill in all fields');
            return;
        }
        addProduct(product)
        setProduct({ name: '', quantityType: '', category: '', price: 0, imageFile: '' })
    };

    const handleEdit = async() => {
        if (!product?.name?.trim() || !product?.quantityType?.trim() || !product?.category?.trim() || !product?.price) {
            message.error('Please fill in all fields');
            return;
        }
        await editProduct(product?.id,product)
        setCurrentProduct(null)
        setOpen(false)
        setProduct({ name: '', quantityType: '', category: '', price: 0, imageFile: '' })
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow my-6">
            <h2 className="text-2xl font-semibold mb-6">{isEdit ? "Edit Product" : "Create New Product"}</h2>

            <div className='w-full grid grid-col-1 lg:grid-cols-2 gap-4' >
                <div className='' >
                    {/* Product Name */}
                    <label className="block mb-2 text-gray-700">Product Name *</label>
                    <Input
                        placeholder="Enter product name"
                        value={product?.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="mb-4"
                    />
                </div>

                {/* Quantity Type */}
                <div>
                    <label className="block mb-2 text-gray-700">Quantity Type *</label>
                    <Select
                        placeholder="Select quantity"
                        value={product?.quantityType}
                        onChange={(value) => { setProduct({ ...product, quantityType: value }) }}
                        className="w-full mb-4"
                    >
                        <Option value="1 Pkt">1 Pkt</Option>
                        <Option value="1 Pcs">1 Pcs</Option>
                        <Option value="1 Box">1 Box</Option>
                        <Option value="1 Tin">1 Tin</Option>
                    </Select>
                </div>

                <div>
                    {/* Category Select */}
                    <label className="block mb-2 text-gray-700">Category *</label>
                    <Select
                        placeholder="Select category"
                        value={product?.category}
                        onChange={(value) => { setProduct({ ...product, category: value }) }}
                        className="w-full mb-4"
                    >
                        {
                            categories?.map((cat, index) => {
                                return (
                                    <Option value={cat?.category} key={index} >{cat?.category}</Option>
                                )
                            })
                        }
                    </Select>
                </div>

                <div className='w-[100%]' >
                    {/* Price */}
                    <label className="block mb-2 text-gray-700">Price (₹) *</label>
                    <InputNumber
                        value={product.price}
                        onChange={(value) => { setProduct({ ...product, price: Number(value) }) }}
                        min={0}
                        type='number'
                        className="w-[300px] mb-4"
                        style={{ width: "100%" }}
                        placeholder="Enter product price"
                    />
                </div>

                <div className='flex flex-col gap-1' >
                    <label className="block mb-2 text-gray-700">Product Image</label>
                    <Upload
                        beforeUpload={() => false} // prevent auto upload
                        maxCount={1}
                        onChange={handleImageChange}
                        listType="picture"
                        showUploadList={false}
                    >
                        <Button icon={<FiUpload />}>Upload Image</Button>
                    </Upload>
                    {
                        product?.imageFile && (
                            <Image width={100} className='block p-2 border border-gray-200 my-3 rounded-md' src={product?.imageFile} />
                        )
                    }
                </div>
            </div>

            {/* Submit Button */}
            <div className=" mt-6">
                {
                    isEdit ?
                        <div className='flex gap-4' >
                            <Button className='w-full' type="primary" block onClick={handleEdit} >
                                Update
                            </Button>
                            <Button className='w-full' type="primary" danger onClick={()=>{
                                setCurrentProduct(null);
                                setOpen(false)
                            }}>
                                Cancel
                            </Button>
                        </div>
                        :
                        <Button className='w-full' type="primary" block onClick={handleSubmit}>
                            Submit Product
                        </Button>
                }
            </div>
        </div>
    );
};

export default AddOrEditProduct;
