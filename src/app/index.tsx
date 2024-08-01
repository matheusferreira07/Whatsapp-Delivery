
import { View, Text, FlatList, SectionList } from "react-native";
import { Header } from "@/components/header";
import { Categorybutton } from "@/components/category-button";
import { CATEGORIES, MENU, ProductProps } from "../../utils/data/products";
import { useState, useRef } from "react";
import { Product } from "@/components/product";

import { Link } from "expo-router";
import { useCartStore } from "@/store/cart-store";



export default function Home() {
    const cartStore = useCartStore();
    const [category, setCategory] = useState(CATEGORIES[0])

    const sectionListRef = useRef<SectionList<ProductProps>>(null)
    
    const cartQuatityItems = cartStore.products.reduce((total, Product) => total + Product.quantity, 0)

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)
        const sectionIndex = CATEGORIES.findIndex(category => category === selectedCategory)
        // console.log(sectionIndex)

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated: true, //animação
                sectionIndex, //usar o index que selecionamos
                itemIndex: 0 // e usar o 1 como ponto de partida (Promoções)
            })
        }


    }

    return (
        <View >
            <Header title="Faça seu pedido" cartQuatityItems={cartQuatityItems} />
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <Categorybutton
                        title={item}
                        isSelected={item === category}
                        onPress={() => handleCategorySelect(item)}
                    />
                }
                horizontal
                className="max-h-15 mt-1 "
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />
            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                //não fazer efeito de esticar
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) =>
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={item} />
                    </Link>
                }
                renderSectionHeader={({ section: { title } }) =>
                    <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
                }
                className="p-4"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 220 }}
            />

        </View>
    )
}

// <View className="flex-row gap-7">
//     <Categorybutton  title="Lanche do dia"/>
//     <Categorybutton  title="Promoções"/>
//     <Categorybutton  title="Bebidas"/>
//     <Categorybutton  title="Sobremesas"/>
// </View>