import { useEffect, useState } from "react"
import axios from "axios";
const Cart = () => {
    const [cart, setCart] = useState<string[]>([]) 

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
          
            setCart(JSON.parse(storedCart))
        }
    }, []) 

    const fetchData = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const s3Url = import.meta.env.VITE_S3_URL; 
        try {
            const response = await axios.get<{ data: Products[]}>(`${apiUrl}/api/v1/products/getProducts`);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
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
