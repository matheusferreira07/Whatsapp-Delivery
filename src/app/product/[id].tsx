import { Redirect, router, useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, Image } from "react-native";
import * as products from "../../../utils/data/products";

import { formatCurrency } from "../../../utils/functions/format-currency";
import { LinkButton } from "@/components/link-button";
import { Feather } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { useCartStore } from "@/store/cart-store";

export default function Product() {
    const cartStore = useCartStore()
    const navigation = useNavigation()
    
    const { id } = useLocalSearchParams()

    //filtrar produto
    // const product = PRODUCTS.filter((item) => item.id === id)[0]
    const product = products.PRODUCTS.find((item) => item.id === id)

    function handleAddToCart(){
        if (product) {
            cartStore.add(product)
            navigation.goBack()
        }
    }

    if(!product) {
        return <Redirect href='/'/>
    }


    return (
        <View className="flex-1 mt-10">


            <Image source={product.cover} className="w-full h-52" resizeMode="cover" />
            <View className="p-5 mt-8 flex-1">
                <Text className="text-white text-xl font-heading">
                    {product.title}</Text>
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}</Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">{product.description}</Text>
                {product.ingredients.map(ingredient => (
                    <Text className="text-slate-400 font-body text-base leading-6" key={ingredient}>
                        {'\u2022'} {ingredient}
                    </Text>
                ))}


            </View>
            <View className="p-4 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20} />
                    </Button.Icon>
                    <Button.Text>
                        Adicionar ao Pedido
                    </Button.Text>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}

