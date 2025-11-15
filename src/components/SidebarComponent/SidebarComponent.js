// SidebarComponent.jsx
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './sidebar.css';

import Cookies from 'js-cookie';

export default function SidebarFixed({ isAdmin = false, kc }) {
    const cadastroItems = [
        { label: 'Clientes', icon: 'pi pi-user', command: () => window.location.href = '/register/client' },
        { label: 'Pedidos', icon: 'pi pi-shopping-cart', command: () => window.location.href = '/register/order' },
    ];

    if (isAdmin) {
        cadastroItems.push({ label: 'Produtos', icon: 'pi pi-box', command: () => { window.location.href = '/register/product' } });
    }

    const pedidosItems = [
        { label: 'Aprovação de Pedidos', icon: 'pi pi-check', command: () => {window.location.href = '/approval'} },
    ];

    const logout = () => {
        Cookies.remove("JWT_TOKEN");
        if (kc) {
            kc.logout({ redirectUri: "http://localhost:3000/" });
        } else {
            console.warn('Keycloak não encontrado, redirecionando manualmente...');
            window.location.href = '/login';
        }
    };

    return (
        <div className="layout-container">
            <div className="layout-body">
                <div className="sidebar">
                    <div className="sidebar-header" onClick={logout}>
                        <i className="pi pi-arrow-left"></i>
                        <span>Sair</span>
                    </div>

                    <div className="sidebar-profile">
                        <div className="profile-logo">
                            <span>RU®</span>
                        </div>
                        <span className="profile-name">Olá Representante</span>
                    </div>

                    <div className="menu-container">
                        <div className="menu-group">
                            <h4>Cadastro</h4>
                            <Menu model={cadastroItems} className="custom-menu" />
                        </div>

                        <div className="menu-group">
                            <h4>Pedidos</h4>
                            <Menu model={pedidosItems} className="custom-menu" />
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="logo-container">
                        <span>ROSA</span>
                        <span>URBANA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
