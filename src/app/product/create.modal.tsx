import ItemSingle from "@/components/example/product/order/item.singer";
import React, { useState } from "react";

const CreateModalPage = () => {

    const [selectedVariant, setSelectedVariant] = useState<IVariants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const title = "Mua ngay"
    const handlePressItem = (action: "MINUS" | "PLUS") => {
        if (action === "MINUS" && quantity === 1) return;
        const total = action === "MINUS" ? -1 : 1;
        setQuantity((pevQuantity: number) => pevQuantity + total)
    };

    console.log("check selectedVariant", selectedVariant)

    const handleAddCart = () => {
        alert("me")
    }
    return (
        <>
            <ItemSingle
                quantity={quantity}
                handlePressItem={handlePressItem}
                title={title}
                handleAddCart={handleAddCart}
                onVariantChange={setSelectedVariant}
            />
        </>
    );
};

export default CreateModalPage;
