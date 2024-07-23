import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

type HeaderProps ={
    title: string
    cartQuatityItems?: number
}

export function Header({title, cartQuatityItems = 0}: HeaderProps) {
    return(
        <View  className="flex-row items-center border-b border-slate-700 pb-5 mx-5 my-10">
            <View className="flex-1">
                <Image source={require('@/assets/logo.png')} className="h-6 w-32"/>
                <Text className="text-white text-xl font-heading mt-2">{title}</Text>
            </View>
            
            <TouchableOpacity className="relative" activeOpacity={0.5}>
            {cartQuatityItems > 0 && (
                <View className="bg-lime-400 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-4">
                    <Text className="text-slate-900 font-bold text-xs">{cartQuatityItems}</Text>
                </View>
                )}
                <Feather name="shopping-cart" color={colors.white} size={24}/>
            </TouchableOpacity>

        </View>
    )
}