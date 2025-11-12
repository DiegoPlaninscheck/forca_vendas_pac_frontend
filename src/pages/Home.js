// Home.jsx
import '../index.css';
import { useEffect, useState } from 'react';
import SidebarComponent from '../components/SidebarComponent/SidebarComponent';
import Cookies from 'js-cookie';
import Keycloak from 'keycloak-js';
import { httpClient } from '../HttpClient';

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

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="app-container">
      <SidebarComponent isAdmin={true} kc={kc} />
    </div>
  );
}

export default Home;
