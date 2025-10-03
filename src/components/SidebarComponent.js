import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema
import 'primereact/resources/primereact.min.css';                  // CSS PrimeReact
import 'primeicons/primeicons.css';                                // Ícones
import "./sidebar.css";

export default function SidebarComponent() {
    const [visible, setVisible] = useState(true);

    // Itens do menu
    const menuItems = [
        { label: 'Home', icon: 'pi pi-home', command: () => console.log('Home clicked') },
        { label: 'Perfil', icon: 'pi pi-user', command: () => console.log('Perfil clicked') },
        { label: 'Configurações', icon: 'pi pi-cog', command: () => console.log('Configurações clicked') },
        { label: 'Sair', icon: 'pi pi-sign-out', command: () => console.log('Sair clicked') },
    ];

    return (
        <div className="layout-sidebar">
            <div className="sidebar">
                <h3>Menu</h3>
                <Menu model={menuItems} />
            </div>
            <div className="content">
                <h1>Conteúdo principal</h1>
                <p>Aqui vai o restante da sua aplicação.</p>
            </div>
        </div>
    );
}