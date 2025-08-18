import { auth, db } from '../../db';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth'
import { customAlphabet } from 'nanoid';
import { useAdminStore } from '../store/adminStore/index'
import { App } from 'antd';
import { useNavigate } from 'react-router';
import _ from 'underscore'

const categoriesRef = collection(db, 'categories');
const productsRef = collection(db, 'products')
const settingsRef = collection(db, 'settings')
const ordersRef = collection(db, 'orders')

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
// Generate Category Id
const generateCategoryId = () => `CAT-${nanoid(6)}`;
const generateProductId = () => `MCP-${nanoid(6)}`;

export const useActions = () => {

    const navigate = useNavigate()

    const { setCategories, products, setProducts, setSettings, setOrders } = useAdminStore()
    const { message } = App.useApp()

    const addCategory = async (name, message) => {
        message.info("Saving...")
        // Add to Firestore
        const newDoc = await addDoc(categoriesRef, {
            id: generateCategoryId(),
            category: name.trim()?.toUpperCase(),
        });
        message.destroy()
        message.success(`Category ${name} added`)
        getAllCategory()

    };

    const getAllCategory = async () => {
        const q = query(categoriesRef);
        const snapshot = await getDocs(q);

        const categories = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setCategories(categories)
    };

    const deleteCategory = async (categoryId) => {
        if (!categoryId)
            message.error("Category deletion failed");
        message.info('Deleting...')
        const categoryRef = doc(db, 'categories', categoryId);
        await deleteDoc(categoryRef);
        message.destroy()
        message.success("Category deleted")
        getAllCategory()
    };

    const editCategory = async (categoryId, updatedName) => {
        if (!categoryId || !updatedName) {
            message.error("Category updation failed");
        }
        message.info('Updating...')
        const categoryRef = doc(db, 'categories', categoryId);
        await updateDoc(categoryRef, {
            category: updatedName.trim(),
        });
        message.destroy()
        message.success("Category updated")
        getAllCategory()

    }

    const addProduct = async (product) => {
        message.info("Saving...")
        const productData = {
            ...product,
            id: generateProductId()
        };
        const docRef = await addDoc(productsRef, productData);
        message.destroy()
        message.success(`Product ${product?.name} added`)
        setProducts(_.sortBy([...products, product], 'category')?.map((data, index) => { return { ...data, index: index + 1 } }))

    }
    const getAllProductsAdmin = async () => {
        const q = query(productsRef);
        const snapshot = await getDocs(q);

        const products = snapshot.docs.map((doc, index) => ({
            ...doc.data(),
        }));
        setProducts(_.sortBy(products, 'category')?.map((data, index) => { return { ...data, index: index + 1 } }))
    };

    const deleteProduct = async (id) => {
        if (!id)
            message.error("Product deletion failed");
        message.info('Deleting...')
        const q = query(productsRef, where('id', '==', id));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            throw new Error('No product found with that name');
        }
        console.log(snapshot)

        await deleteDoc(doc(db, 'products', snapshot?.docs[0]?.id));
        message.destroy()
        message.success("Product deleted")
        const newProducts = products?.filter((pro) => pro?.id != id)
        setProducts(_.sortBy(newProducts, 'category')?.map((data, index) => { return { ...data, index: index + 1 } }))
    };

    const editProduct = async (id, value) => {
        if (!id || !value) {
            message.error("Product updation failed");
        }
        message.info('Updating...')
        const q = query(productsRef, where('id', '==', id));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            throw new Error('No product found with that name');
        }
        await updateDoc(doc(db, "products", snapshot?.docs[0]?.id), {
            ...value
        });
        message.destroy()
        message.success("Product updated")
        const newProducts = products?.filter((pro) => pro?.id != id)
        setProducts(_.sortBy([...newProducts, value], 'category')?.map((data, index) => { return { ...data, index: index + 1 } }))

    }

    const getSettings = async () => {
        const q = query(settingsRef);
        const snapshot = await getDocs(q);
        if (!snapshot?.docs?.length)
            return;
        setSettings({ ...snapshot?.docs[0]?.data(), id: snapshot?.docs[0]?.id })
    };

    const updateSettings = async (data) => {
        message.info("Updating Settings...")
        await updateDoc(doc(db, "settings", data?.id), {
            ...data
        });
        message.destroy()
        message.success("Settings Updated.")
        setSettings(data)
    };

    const updateOrderStatus = async (id,data) => {
        message.info("Updating...")
        const docRef = doc(db, "orders", id); // collection, doc id
        await updateDoc(docRef, data);
        message.destroy()
        message.success("Status Updated")
        getAllOrders()
    };

    const deleteOrder = async (id) => {
        message.info("Deleting...")
        const docRef = doc(db, "orders", id); // collection, doc id
        await deleteDoc(docRef);
        message.destroy()
        message.success("Order Deleted")
        getAllOrders()
    };

    const logoutAdmin = async () => {
        await signOut(auth).then(() => {
            setCategories([])
            setProducts([])
            setSettings({})
            message.success("Logged out successfully")
            navigate('/admin')
        })
    }

    const getAllOrders = async () => {
        const q = query(ordersRef, orderBy("orderedAt", "desc")); // "desc" = newest first

        const snapshot = await getDocs(q);

        const orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setOrders(orders)
    };

    return {
        addCategory, getAllCategory, deleteCategory, editCategory, addProduct, getAllProductsAdmin, deleteProduct, editProduct,
        getSettings, updateSettings, logoutAdmin, getAllOrders,updateOrderStatus,deleteOrder
    }
}