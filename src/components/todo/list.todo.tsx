import { useState } from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"


interface IProps {
    todoList: ITodo[],
    deleteTodo: (id: number) => void
}
const ListToDo = (props: IProps) => {
    const { todoList, deleteTodo } = props
    return (
        <>
            <FlatList
                data={todoList}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => deleteTodo(item.id)}
                        >
                            <Text style={{ fontSize: 60 }} key={item.id}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    )
}

export default ListToDo;