export const createCartSlice = (set, get) => ({
    products:[],
    setProducts:(products)=>{
        set((state)=>({
            ...state,
            products:products
        }))
    },
})
