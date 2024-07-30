import { create } from "zustand";
import { ProductProps } from "../../utils/data/products";

import * as CartInMemory from './helpers/cart-in-memory'


export  type ProductCartProps = ProductProps & {
    quantity: number
}

// é um tipo Props Estado que será o Estado publico tipado
type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
}

export const useCartStore = create<StateProps>( (set) => ({
    products:[],

    add: (product: ProductProps) => 
    set( ( state ) => ({
        products: CartInMemory.add(state.products, product)
    }))
}))