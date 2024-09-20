import { useState } from "react";
import { useNavigation } from "expo-router";

import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { Header } from "@/components/header";
import { ProductCartProps, useCartStore } from "@/store/cart-store";
import { Product } from "@/components/product";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { LinkButton } from "@/components/link-button";
import { formatCurrency } from "../../utils/functions/format-currency";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useStripe } from "@stripe/stripe-react-native";


const PHONE_NUMBER = '5519999737281'

export default function Cart() {
    const [address, setAddress] = useState('')
    const cartStore = useCartStore()
    const navigation = useNavigation()
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const isProducts = cartStore.products.length > 0

    const total = formatCurrency(
        cartStore.products.reduce(
            (total, product) => total + product.price * product.quantity, 0
        ))

    function handleProductRemove(product: ProductCartProps) {
        Alert.alert('Remover', `Deseja remover ${product.title} do seu carrinho?`, [
            {
                text: 'Cancelar'
            },
            {
                text: 'Remover',
                onPress: () => cartStore.remove(product.id)
            }
        ])
    }

        async function handleOrder(){

        if (address.trim().length === 0){
            return Alert.alert('Pedido', 'Informe os dados da entrega')
        }

       const products = cartStore.products
       .map(product => `\n${product.quantity}x ${product.title}` )
       .join('')

       const message = `
       NOVO PEDIDO
       \n Entregar em ${address}

       ${products}

       \n Valor total: ${total}
       `


    
        const isInitialized = await initializePaymentSheet();

        if (isInitialized) {
            await openPaymentSheet();
        }

        //   Linking.openURL(
        //     `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
        //   )

        //   cartStore.clear()
        //   navigation.goBack
    }

    async function initializePaymentSheet(){
        const amountInCents = Math.round(
            cartStore.products.reduce(
                (total, product) => total + product.price * product.quantity, 0
            ) * 100
        );
        try{
            const response = await fetch('http://10.53.52.39:3030/payment-intent' , {
                method:'POST', 
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    amount:amountInCents,
                })
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.error || 'Erro ao criar o PaymentIntent')
            }

            console.log(data.clientSecret);

            const { clientSecret } = data;

            if (typeof clientSecret !== 'string'){
                console.error('clientSecret não é uma string ', clientSecret)
                return false;
            }

            if (!clientSecret){
                console.error('clientSecret não retornado !!!')
                return false;
            }

            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: 'Delivery-Whatsapp',
                returnURL:'myapp://home',
            })

            if (error){
                console.error('Error initializing payment sheet:', error)
                return false;
            }

            return true;
            
        }catch (error) { 
            console.error('Error in initializePaymentSheet: ', error)
        }
    }

    async function openPaymentSheet(){
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
        } else {
            Alert.alert('Sucesso', 'Seu pedido/pagamento foi confirmado!!')
        }
        
        // navigation.goBack()


    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="flex-1 p-5">
                        {isProducts ? (
                            <View className="border-b border-slate-400">
                                {
                                    cartStore.products.map(product => (
                                        <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                                    ))
                                }
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrinho está vazio
                            </Text>
                        )

                        }
                        <View className="flex-row gap-2 items-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle">Total:</Text>
                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                        </View>
                        <Input placeholder="Informe o endereço de entrega com rua, bairro, cep, número e complemento" 
                        onChangeText={setAddress}
                        // mudanças do botão do teclado do celular
                        blurOnSubmit={true} // permite a tecla "enter" do teclado enviar o pedido
                        onSubmitEditing={handleOrder}
                        returnKeyType='next'  // muda o ícone do teclado
                        />
                        
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
            <View className="p-5 gap-5">
                <Button onPress={ handleOrder }>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}