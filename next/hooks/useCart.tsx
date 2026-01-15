"use client"
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useState, useContext, useCallback, useEffect } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
    productCartQty: number
    cartPrdcts: CardProductProps[] | null
    addToBasket: (product: CardProductProps) => void
    removeFromCart: (product: CardProductProps) => void
}
const CartContext = createContext<CartContextProps | null>(null)

interface Props{
    [propName: string]: any
}
export const CartContextProvider = (props:Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setcartPrdcts] = useState<CardProductProps[] | null>(null)


    useEffect(() => {
       let getItem: any = localStorage.getItem('cart')
       let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
       setcartPrdcts(getItemParse)
    },[])

    const addToBasket = useCallback((product: CardProductProps)=> {
        setcartPrdcts(prev=> {
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            }else{
                updatedCart = [product]
            }
            toast.success('Ürün Sepete Eklendi...')
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [cartPrdcts])

    const removeFromCart = useCallback((product: CardProductProps) => {

    }, [])


    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart
    }
    return (
        <CartContext.Provider value={value} {...props}/>
    )
}

const UseCart = () => {
    const context = useContext(CartContext)
    if(context == null){
        throw new Error('Bir hata durumu mevcut')
    }
    return context
}

export default UseCart