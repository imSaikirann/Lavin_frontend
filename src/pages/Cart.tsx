import { useEffect, useState } from "react"

const Cart = () => {
    const [cart, setCart] = useState<string[]>([]) 

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
          
            setCart(JSON.parse(storedCart))
        }
    }, []) 

  

  
    return (
        <div>
            Cart: {cart.length > 0 ? (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                "No items in the cart"
            )}
        </div>
    )
}

export default Cart
