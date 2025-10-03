import React from 'react';
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './HomePage-User/sidebar.css';

// O componente agora recebe as "instruções" (props) de fora
export default function Sidebar({ menuGroups, children }) {

    return (
        <div className="layout-container">
            <div className="layout-body">
                {/* Sidebar vermelha */}
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
                        {/* Renderiza dinamicamente qualquer grupo de menu que for recebido */}
                        {menuGroups && menuGroups.map((group, index) => (
                            <div className="menu-group" key={index}>
                                <h4>{group.title}</h4>
                                <Menu model={group.items} className="custom-menu" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Renderiza o conteúdo da página que for recebido */}
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}