// import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
// import { APP_COLOR } from "@/utils/constant";
// import { Image, Pressable, Text, View } from "react-native";
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useCurrentApp } from "@/context/app.context";



// const ItemQuantity = () => {
    
//     const { cart, setCart, product } = useCurrentApp();

//     const handlePressItem = (item: IProductId, action: "MINUS" | "PLUS") => {

//         if (product?.id) {
//             const total = action === "MINUS" ? -1 : 1;
//             // if (!cart[product?._id]) {
//             //     //chưa tồn tại cửa hàng => khởi tạo cửa hàng
//             //     cart[product._id] = {
//             //         sum: 0,
//             //         quantity: 0,
//             //         items: {}
//             //     }
//             // }

//             //xử lý sản phẩm
//             cart[product._id].sum = cart[product._id].sum + total * item.basePrice;
//             cart[product._id].quantity = cart[product._id].quantity + total;

//             //check sản phẩm đã từng thêm vào chưa
//             if (!cart[product._id].items[item._id]) {
//                 cart[product._id].items[item._id] = {
//                     data: menuItem,
//                     quantity: 0
//                 };
//             }

//             cart[product._id].items[item._id] = {
//                 data: menuItem,
//                 quantity: cart[product._id].items[item._id].quantity + total
//             };

//         }

//         console.log(cart)
//     }

//     return (
//         <View style={{
//             backgroundColor: "white",
//             gap: 10, flexDirection: "row", padding: 10
//         }}>
//             <View>
//                 <Image
//                     style={{ height: 100, width: 100 }}
//                     source={{ uri: `${getURLBaseBackend()}/images/${product?.image}` }} />
//             </View>
//             <View style={{ flex: 1, gap: 10 }}>
//                 <View><Text>{product?.name}</Text></View>
//                 <View><Text>{product?.description}</Text></View>
//                 <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
//                     <Text style={{ color: APP_COLOR.ORANGE }}>
//                         {currencyFormatter(product?.price)}
//                     </Text>
//                     <View
//                         style={{
//                             alignItems: "center",
//                             flexDirection: "row", gap: 3
//                         }}
//                     >
//                         <Pressable
//                             style={({ pressed }) => ({
//                                 opacity: pressed === true ? 0.5 : 1,
//                                 alignSelf: "flex-start", //fit-content
//                             })}
//                             onPress={() => handlePressItem(product as IProductId, "MINUS")}
//                         >
//                             <AntDesign name="minussquareo"
//                                 size={24} color={APP_COLOR.ORANGE}
//                             />
//                         </Pressable>
//                         <Text style={{
//                             minWidth: 25,
//                             textAlign: "center"
//                         }}>
//                             10
//                         </Text>
//                         <Pressable
//                             style={({ pressed }) => ({
//                                 opacity: pressed === true ? 0.5 : 1,
//                                 alignSelf: "flex-start", //fit-content
//                             })}
                           
//                             onPress={() =>  handlePressItem(product as IProductId, "PLUS")}>
//                             <AntDesign
//                                 name="plussquare"
//                                 size={24}
//                                 color={APP_COLOR.ORANGE}
//                             />
//                         </Pressable>
//                     </View>

//                 </View>
//             </View>
//         </View>
//     )
// }

// export default ItemQuantity;