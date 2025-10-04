import React from 'react';
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './sidebar.css';

export default function SidebarFixed({ isAdmin = false }) {
    // Itens do grupo "Cadastro"
    const cadastroItems = [
        { label: 'Clientes', icon: 'pi pi-user', command: () => console.log('Clientes clicked') },
        { label: 'Pedidos', icon: 'pi pi-shopping-cart', command: () => console.log('Pedidos clicked') },
    ];

    // Se for admin, adiciona Produtos
    if (isAdmin) {
        cadastroItems.push({ label: 'Produtos', icon: 'pi pi-box', command: () => console.log('Produtos clicked') });
    }

    // Itens do grupo "Pedidos"
    const pedidosItems = [
        { label: 'Aprovação de Pedidos', icon: 'pi pi-check', command: () => console.log('Aprovação clicked') },
    ];

    return (
        <div className="layout-container">
            <div className="layout-body">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-header">
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
                        {/* Grupo Cadastro */}
                        <div className="menu-group">
                            <h4>Cadastro</h4>
                            <Menu model={cadastroItems} className="custom-menu" />
                        </div>

                        {/* Grupo Pedidos */}
                        <div className="menu-group">
                            <h4>Pedidos</h4>
                            <Menu model={pedidosItems} className="custom-menu" />
                        </div>
                    </div>
                </div>

                {/* --- CONTEÚDO PRINCIPAL ATUALIZADO --- */}
                <div className="content">
                    {/* Novo logo "ROSA URBANA" inserido aqui */}
                    <div className="logo-container">
                        <span>ROSA</span>
                        <span>URBANA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}