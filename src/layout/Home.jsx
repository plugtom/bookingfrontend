import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8234/showproduct/`, // Corrected endpoint
        );
        setProducts(response.data.products);
        console.log(products)
      } catch (error) {
        console.error("Error fetching data: ", error);
        setProducts([]);
      }
    };
    
    fetchData();
  }, []);


  const showProductDetails = (product) => {
    navigate(`/showproductsFull/${product.id}`);
  };

  return (
    <div className='bg-white'>
      <div>หนังสือทั้งหมด</div>
      <br />
      <hr/>
      <br />
      <div className="grid grid-cols-6 gap-4">
        {products.map(product => (
          <button key={product.id} onClick={() => showProductDetails(product)}>
            <img src={product.Product_img[0].url} alt="Product Image" width="200" height="100" />
            <div>{product.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
