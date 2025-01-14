import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { PRODUCTS } from "../../../utils/data/products";

import { formatCurrency } from "../../../utils/functions/format-currency";
import { LinkButton } from "@/components/link-button";
import { Feather } from "@expo/vector-icons";
import { Button } from "@/components/button";

export default function Product() {
    const { id } = useLocalSearchParams()

    //filtrar produto
    const product = PRODUCTS.filter((item) => item.id === id)[0]


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
                <Button>
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

