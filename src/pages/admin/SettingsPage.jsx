import React, { useEffect, useState } from 'react';
import { Input, InputNumber, Button, message, Typography } from 'antd';
import {useActions} from '../../actions/admin'
import {useAdminStore} from '../../store/adminStore/index'

const SettingsPage = () => {
    
    const[data,setData]=useState({})
    const {settings}=useAdminStore()
    const {updateSettings}=useActions()

    useEffect(()=>{
        console.log(settings)
        setData(settings)
    },[settings])

    const handleSave = () => {
        if(!data?.discount || !data?.minimumAmount || !data?.courierCharge )
            message.info("Please fill all fields")
        updateSettings(data)
    };

    return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded shadow my-12">
            <Typography.Title level={4} >Settings</Typography.Title>

            {/* Discount */}
            <label className="block mb-2 text-gray-700">Discount (%)</label>
            <InputNumber
                min={0}
                max={100}
                type='number'
                value={data?.discount}
                onChange={(value)=>{setData({...data,discount:value})}}
                className="mb-4"
                placeholder="Enter discount in %"
                style={{width:"200px"}}
            />

            {/* Courier Charge */}
            <label className="block mb-2 text-gray-700 mt-3">Courier Charge (₹)</label>
            <InputNumber
                type="number"
                min={0}
                value={data?.courierCharge}
                onChange={(value)=>{setData({...data,courierCharge:value})}}
                className="mb-4"
                placeholder="Enter courier charge"
                style={{width:"200px"}}
            />

            {/* Minimum Order Amount */}
            <label className="block mb-2 text-gray-700 mt-3">Minimum Order Amount (₹)</label>
            <InputNumber
                min={0}
                type='number'
                value={data?.minimumAmount}
                onChange={(value)=>{setData({...data,minimumAmount:value})}}
                className="w-full mb-6"
                placeholder="Enter minimum order amount"
                style={{width:"200px"}}
            />

            <Button className='my-3' type="primary" block onClick={handleSave}>
                Save Settings
            </Button>
        </div>
    );
};

export default SettingsPage;
