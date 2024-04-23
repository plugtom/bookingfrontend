import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8234/showproduct/${id}`,
        
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setProducts([]);
      }
    };
    
    fetchData(); // Call the fetchData function to execute it
  }, []); // Empty dependency array to run the effect only once

  returnreturn (
    <>
      <div>หนังสือทั้งหมด</div>
      <br />
      <hr/>
      <br />
      <div className="grid grid-cols-6 gap-4">
        {products.map(product => (
          <div key={product.id}>
            <img src={product.Product_img[0].url} alt="Product Image" width="200" height="100" />
            <div>{product.title}</div>
          </div>
        ))}
      </div>
    </>
  );
  
}
