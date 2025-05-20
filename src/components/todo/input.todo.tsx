import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native"

interface IProps {
    handleInputToDo: (v: string) => void;
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 50
    },
});

const InputTodo = (props: IProps) => {
    const { handleInputToDo } = props

    const [name, setName] = useState("heloo");

    const handleAddNewToDo = () => {
        handleInputToDo(name);
    }

    return (

        <View style={styles.container}>
            <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={v => setName(v)}
                value={name}
                style={{
                    borderColor: "red",
                    borderWidth: 1,
                    padding: 5,
                    paddingHorizontal: 5
                }}
            />
            <Button
                title='Bam em di'
                onPress={handleAddNewToDo}
            />
        </View>
    )

}


export default InputTodo