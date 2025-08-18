import React, { useEffect, useMemo, useState } from 'react'
import { Form, Input, Button, Checkbox, Select, Modal, Result } from "antd";
import Header from '../components/Header'
import Footer from '../components/Footer';
import _ from 'underscore'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router'
import BookingSummary from '../components/BookingSummary'
import { useUserActions } from '../actions/user'
const { Option } = Select;
const { TextArea } = Input;

export default function CheckOut() {
    const navigate = useNavigate()
    const { products, setProducts } = useCartStore()
    const { settings } = useUserStore()
    const [orderId, setOrderId] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false)
    const {addProduct}=useUserActions()
    const[loading,setLoading]=useState(false);

    const total = useMemo(() => {
        var counts = 0, amount = 0;
        products?.map((prod) => {
            counts = counts + prod?.count
            amount = amount + prod?.total
        })
        return { counts, amount }
    }, [products])

    useEffect(() => {
        if (total?.amount < settings?.minimumAmount)
            navigate('/cart')
    }, [])

    const [form] = Form.useForm();
    const [usePhoneAsWhatsapp, setUsePhoneAsWhatsapp] = useState(false);

    const states = [
        "Andhra Pradesh",
        "Karnataka",
        "Kerala",
        "Pondicherry",
        "Tamil Nadu"
    ];

    const onCheckboxChange = (e) => {
        setUsePhoneAsWhatsapp(e.target.checked);
        if (e.target.checked) {
            const phoneValue = form.getFieldValue("phone");
            form.setFieldsValue({ whatsapp: phoneValue });
        }
    };

    const onPhoneChange = (e) => {
        if (usePhoneAsWhatsapp) {
            form.setFieldsValue({ whatsapp: e.target.value });
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        const cart = products?.map((prod) => {
            return { name: prod?.name, type: prod?.quantityType, qty: prod?.count, price: Math.round(prod?.total/prod?.count), total: prod?.total }
        })
        const subTotal = total?.amount
        const totalQuantity = total?.counts
        const totalAmount = (total?.amount + settings?.courierCharge)
        const id = generateId()
        const data = {
            customerData: values,
            cart: {
                products: cart,
                subTotal,
                totalQuantity,
                totalAmount
            },
            orderID: id,
            orderedAt: Date.now(),
            orderStatus: "Waiting for Payment",
            paymentStatus: "Not Paid"
        }
        const result = await addProduct(data);
        console.log(result)
        if (result===true) {
            setOrderId(id);
            setOpenSuccess(true)
            setProducts([])
        }
        setLoading(false);
    };

    return (
        <div className='w-full h-screen flex flex-col select-none ' >
            <Header />
            <div className='p-4 lg:p-6 border-b border-gray-300' >
                <h1 className='text-2xl font-bold' >Complete Booking</h1>
                <p className='my-2 text-lg font-medium' >Please enter your contact & address to complete booking.</p>
            </div>
            <div className='w-full grid grid-cols-12 gap-6 px-4 lg:px-8 mt-3 pb-12' >
                <div className='col-span-12 md:col-span-7 lg:col-span-8' >
                    <Form
                        className='grid grid-cols-12 gap-4'
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            state: "Tamil Nadu",
                        }}
                    >
                        <Form.Item
                            className='col-span-12 md:col-span-6'
                            label="Full Name"
                            name="fullName"
                            rules={[
                                { required: true, message: "Please enter your full name" },
                                { min: 3, message: "Name must be at least 3 characters" }
                            ]}
                        >
                            <Input placeholder="Enter full name" size='large' />
                        </Form.Item>

                        <Form.Item
                            className='col-span-12 md:col-span-6'
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Please enter a valid email" }
                            ]}
                        >
                            <Input placeholder="Enter email" size='large' />
                        </Form.Item>

                        <div className='col-span-12 md:col-span-6' >
                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[
                                    { required: true, message: "Please enter your phone number" },
                                    { pattern: /^[0-9]{10}$/, message: "Phone must be 10 digits" }
                                ]}
                            >
                                <Input placeholder="Enter phone number" size='large' maxLength={10} onChange={onPhoneChange} />
                            </Form.Item>

                            <Form.Item>
                                <Checkbox checked={usePhoneAsWhatsapp} onChange={onCheckboxChange}>
                                    Use phone number as WhatsApp number
                                </Checkbox>
                            </Form.Item>
                        </div>

                        <Form.Item
                            className='col-span-12 md:col-span-6'
                            label="WhatsApp Number"
                            name="whatsapp"
                            rules={[
                                { required: true, message: "Please enter your WhatsApp number" },
                                { pattern: /^[0-9]{10}$/, message: "WhatsApp must be 10 digits" }
                            ]}
                        >
                            <Input placeholder="Enter WhatsApp number" size='large' maxLength={10} />
                        </Form.Item>

                        <Form.Item
                            className='col-span-12'
                            label="Address"
                            name="address"
                            rules={[
                                { required: true, message: "Please enter your address" },
                                { min: 5, message: "Address must be at least 5 characters" }
                            ]}
                        >
                            <TextArea rows={3} placeholder="Enter address" size='large' />
                        </Form.Item>

                        <Form.Item
                            className='col-span-12 md:col-span-4'
                            label="State"
                            name="state"
                            rules={[{ required: true, message: "Please select your state" }]}
                        >
                            <Select placeholder="Select state" size='large'>
                                {states.map((state) => (
                                    <Option key={state} value={state}>
                                        {state}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            className='col-span-12 md:col-span-4'
                            label="City"
                            name="city"
                            rules={[{ required: true, message: "Please enter your city" }]}
                        >
                            <Input placeholder="Enter city" size='large' />
                        </Form.Item>

                        <Form.Item
                            className='col-span-12 md:col-span-4'
                            label="Pincode"
                            name="pincode"
                            rules={[
                                { required: true, message: "Please enter your pincode" },
                                { pattern: /^[0-9]{6}$/, message: "Pincode must be exactly 6 digits" }
                            ]}
                        >
                            <Input placeholder="Enter pincode" maxLength={6} size='large' />
                        </Form.Item>

                        <Form.Item className='flex justify-end col-span-12' >
                            <Button type="primary" htmlType="submit" size='large' disabled={loading} >
                                {loading?" Processing...":"Place Order"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='col-span-12  md:col-span-5 lg:col-span-4' >
                    <BookingSummary showButton={false} />
                </div>
            </div>
            <Footer/>
            <Modal width={700} open={openSuccess} footer={null} onCancel={() => {
                setProducts([])
                setOpenSuccess(false)
            }} >
                <Result
                    status="success"
                    title="Order Placed Successfully."
                    subTitle={`Order number : ${orderId} and Please make the payment and sent the screenshot to us.`}
                    extra={[
                        <Button key="buy" onClick={() => {
                            setProducts([])
                            navigate('/quick-purchase')
                        }} >Buy Again</Button>,
                    ]}
                />
            </Modal>
        </div>
    )
}

const generateId = () => {
    const now = new Date();

    const year = now.getFullYear(); // 2024
    const monthDay = String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0'); // 1010
    const time =
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0'); // 213358

    return `${year}-${monthDay}-${time}`;
};

console.log(generateId());
// Example output: 2024-1010-213358

