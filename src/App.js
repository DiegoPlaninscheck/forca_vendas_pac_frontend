import './index.css';
import { httpClient } from "./HttpClient";
import Cookies from 'js-cookie';
import ProductItem from "./components/ProductItem";
import ProductForm from "./components/ProductForm";

import Keycloak from 'keycloak-js';
import { useEffect, useState } from 'react';

let initOptions = {
  url: "http://localhost:8080",
  realm: "master",
  clientId: "react-client"
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  }

  console.info("Authenticated");
  console.info("auth", auth);
  console.info("Keycloak", kc);
  console.info("Access Token", kc.token);

  if (kc.token && kc.token != "") {
    Cookies.set("JWT_TOKEN", kc.token)
  }

  httpClient.defaults.headers.common["Authorization"] = `Bearer ${kc.token}`;

  localStorage.onTokenExpired = () => {
    console.log("token expired");
  }
}, () => {
  console.error("Authentication Failed");
})

function App() {

  useEffect(() => {
    const token = Cookies.get("JWT_TOKEN")
    httpClient.get("http://localhost:8081/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setProducts(res.data);
    });
  }, [])

  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const editProduct = (id) => {
    const name = prompt('Novo nome:');
    const color = prompt('Nova cor:');
    const size = prompt('Novo tamanho:');
    setProducts(products.map(p => p.id === id ? { ...p, name, color, size } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Produtos</h1>
      <ProductForm onAdd={addProduct} />
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={() => editProduct(product.id)}
          onDelete={() => deleteProduct(product.id)}
        />
      ))}
    </div>
  );
}

export default App;

