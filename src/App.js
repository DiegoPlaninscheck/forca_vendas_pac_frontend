import './index.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Keycloak from 'keycloak-js';
import { httpClient } from './HttpClient';

import ProductItem from './components/ProductItem';
import ProductForm from './components/ProductForm';
import EditProductModal from './components/EditProductModal';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'master',
  clientId: 'react-client',
};

const kc = new Keycloak(keycloakConfig);

kc.init({
  onLoad: 'login-required',
  checkLoginIframe: true,
  pkceMethod: 'S256',
}).then((authenticated) => {
  if (!authenticated) {
    window.location.reload();
  }

  if (kc.token) {
    Cookies.set('JWT_TOKEN', kc.token);
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
  }

  localStorage.onTokenExpired = () => {
    console.log('Token expired');
  };
}).catch(() => {
  console.error('Authentication Failed');
});

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  const loadProducts = () => {
    const token = Cookies.get('JWT_TOKEN');
    httpClient.get('http://localhost:8081/products', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setProducts(res.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const insertProductOnDatabase = async (product) => {
    let response = { status: "", message: "" };
    const token = Cookies.get('JWT_TOKEN');
    await httpClient.post('http://localhost:8081/products', {
      color: product.color,
      name: product.name,
      size: product.size,
    }, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    }).then((res) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    }).catch((err) => {
      if (err.status == 403) {
        alert("You do not have access to create a product! - " + err.message);
      }

      response = {
        status: err.status,
        message: err.message
      }
    }).finally(() => {
      setLoading(false);
    });

    return response;
  }

  const addProduct = async (product) => {
    if (product && product.name != "" && product.color != "" && product.size != "") {
      const response = await insertProductOnDatabase(product);
      if (response.status != 403) {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
      }
    } else {
      alert("Product empty! Please fill all fields");
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleSaveProduct = async (updatedProduct) => {
    const response = await editProductOnDatabase(updatedProduct);
    if (response.status !== 403) {
      setIsEditing(false);
      setSelectedProduct(null);
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };


  const editProductOnDatabase = async (product) => {
    let response = { status: "", message: "" };
    const token = Cookies.get('JWT_TOKEN');

    await httpClient.put(`http://localhost:8081/products/${product.id}`, {
      color: product.color,
      name: product.name,
      size: product.size,
      id: product.id
    }, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    }).then((res) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    }).catch((err) => {
      if (err.status == 403) {
        alert("You do not have access to edit a product! - " + err.message);
      }

      response = {
        status: err.status,
        message: err.message
      }
    }).finally(() => {
      setLoading(false);
    });

    return response;
  };

  const removeProductFromDatabase = async (id) => {
    let response = { status: "", message: "" };
    const token = Cookies.get('JWT_TOKEN');

    await httpClient.delete(`http://localhost:8081/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setProducts(res.data);
    }).catch((err) => {
      if (err.status == 403) {
        alert("You do not have access to delete a product! - " + err.message);
      }

      response = {
        status: err.status,
        message: err.message
      }
    }).finally(() => {
      setLoading(false);
    });

    return response;
  };


  return (
    <div className="app-container">
      <button className="logout-button" onClick={() => kc.logout()}>
        Logout
      </button>

      <div className="card">
        <h1 className="title">Register Products</h1>

        <ProductForm onAdd={addProduct} />

        <div className="product-list">
          {loading ? (
            <p className="info-text">Loading Products...</p>
          ) : products.length === 0 ? (
            <p className="info-text">No Products found.</p>
          ) : (
            products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={() => handleEditClick(product)}
                onDelete={() => removeProductFromDatabase(product.id)}
              />
            ))
          )}
        </div>
        {isEditing && (
          <EditProductModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onSave={handleSaveProduct}
          />
        )}
      </div>
    </div>
  );
}

export default App;
