import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { PRODUCTS } from "../../../utils/data/products";
import { white } from "tailwindcss/colors";

export default function Product() {
    const { id } = useLocalSearchParams()

    //filtrar produto
    const product = PRODUCTS.filter((item) => item.id === id)[0]


    return (
        <View className="flex-1 mt-10">
            <MaterialIcons
            size={34}
            name="arrow-back"
            onPress={() => router.back}
            color={white}
            />
            <Image source={product.cover} className="w-full h-52" resizeMode="cover"/>
            <View className="p-5 mt-8 flex-1">
                <Text className="text-white">{product.title}</Text>
                <Text className="text-white">{product.price}</Text>
                <Text className="text-white">{product.description}</Text>


            </View>


        </View>
    )
}