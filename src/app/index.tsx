
import { View, Text, FlatList, SectionList } from "react-native";
import { Header } from "@/components/header";
import { Categorybutton } from "@/components/category-button";
import { CATEGORIES, MENU } from "../../utils/data/products";
import { useState } from "react";



export default function Home() {
    const [category, setCategory] = useState(CATEGORIES[0])
    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)
        const sectionIndex = CATEGORIES.findIndex(category => category === selectedCategory)
    }

    return (
        <View>
            <Header title="Faça seu pedido" cartQuatityItems={0} />
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <Categorybutton
                        title={item}
                        isSelected={item === category}
                        onPress={() =>handleCategorySelect(item)}
                    />
                }
                horizontal
                className="max-h-10"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap:12, paddingHorizontal:20}}
            />
            <SectionList
            sections={MENU}
            keyExtractor={(item)=> item.id}
            //não fazer efeito de esticar
            stickySectionHeadersEnabled={false}
            renderItem={({item})=> 
            <Text className="text-white">{item.title}</Text>
        }
        renderSectionHeader={({section: {title}})=> 
            <Text className="text-yellow-300">{title}</Text>
    }
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