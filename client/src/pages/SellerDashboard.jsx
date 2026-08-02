import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [store, setStore] = useState({
  storeName: "",
  description: "",
  logo: "",
});
const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

data.append("name", formData.name);
data.append("description", formData.description);
data.append("price", formData.price);
data.append("category", formData.category);
data.append("stock", formData.stock);

if (image) {
  data.append("image", image);
}

await axios.post(
  "http://127.0.0.1:5000/api/products/add",
  data
);

      alert("Product Added Successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: "",
      });

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };
  const createStore = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:5000/api/store/create",
      store
    );

    alert("Store Created Successfully");

  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/api/products/delete/${id}`
      );

      alert("Product Deleted Successfully");

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async () => {
  try {
    await axios.put(
      `http://127.0.0.1:5000/api/products/update/${editProduct._id}`,
      editProduct
    );

    alert("Product Updated Successfully");

    setEditProduct(null);

    fetchProducts();

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="seller-dashboard">

      <button onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>

      <h1>Seller Dashboard</h1>
      <h2>Create Store Profile</h2>

<input
  placeholder="Store Name"
  value={store.storeName}
  onChange={(e) =>
    setStore({
      ...store,
      storeName: e.target.value
    })
  }
/>

<textarea
  placeholder="Store Description"
  value={store.description}
  onChange={(e) =>
    setStore({
      ...store,
      description: e.target.value
    })
  }
/>
<button onClick={createStore}>
  Create Store
</button>
<div className="dashboard-stats">
  <h3>Total Products: {products.length}</h3>
</div>
      <h2>Add New Product</h2>

      <form onSubmit={addProduct}>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>

        <input
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

      </form>


      <h2>My Products</h2>
{editProduct && (
  <div className="edit-box">

    <h2>Edit Product</h2>

    <input
      value={editProduct.name}
      onChange={(e) =>
        setEditProduct({
          ...editProduct,
          name: e.target.value
        })
      }
    />

    <input
      value={editProduct.price}
      onChange={(e) =>
        setEditProduct({
          ...editProduct,
          price: e.target.value
        })
      }
    />

    <input
      value={editProduct.category}
      onChange={(e) =>
        setEditProduct({
          ...editProduct,
          category: e.target.value
        })
      }
    />

    <input
      value={editProduct.stock}
      onChange={(e) =>
        setEditProduct({
          ...editProduct,
          stock: e.target.value
        })
      }
    />

    <textarea
      value={editProduct.description}
      onChange={(e) =>
        setEditProduct({
          ...editProduct,
          description: e.target.value
        })
      }
    />

    <button onClick={updateProduct}>
      Save Changes
    </button>

    <button onClick={() => setEditProduct(null)}>
      Cancel
    </button>

  </div>
)}
      {
  products.map((product) => (
   <div className="product-card" key={product._id}>

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <p>Category: {product.category}</p>

      <p>Stock: {product.stock}</p>
      {product.stock <= 2 && (
  <p style={{color:"red"}}>
    ⚠️ Low Stock
  </p>
)}
<p>Description: {product.description}</p>
      {product.image && (
        <img
  src={`http://127.0.0.1:5000/uploads/${product.image}`}
  alt={product.name}
  width="150"
/>
      )}
<div className="product-actions">

  <button 
  className="edit-btn"
  onClick={() => setEditProduct(product)}
>
  ✏️ Edit
</button>

  <button 
    className="delete-btn"
    onClick={() => deleteProduct(product._id)}
  >
    🗑️ Delete
  </button>

</div>

    </div>
  ))
}

    </div>
  );
}

export default SellerDashboard;