import clsx from "clsx"
import { Pressable, PressableProps, Text } from "react-native"

type CategoryProps = PressableProps & {
    title: string
    isSelected?: boolean
}

export function Categorybutton({title, isSelected, ...rest}: CategoryProps) {
    return(
        <Pressable className={clsx(
            'bg-slate-800 px-4 justify-center rounded-md h-10 mb-8' ,
            isSelected && 'border-2 border-lime-300'
        )}
        
        {...rest}>
            <Text className="text-slate-100 font-subtitle text-sm">
                {title}
                </Text>
        </Pressable>
    )
}