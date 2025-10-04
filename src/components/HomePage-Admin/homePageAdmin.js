import React from 'react';
import SidebarFixed from '../sidebar/SidebarComponent'; // ajuste o caminho se necessário
import './AdmHome.css';

export default function HomePageAdmin() {
    return (
        <div className="admin-page">
            <SidebarFixed isAdmin={true}/>
        </div>
    );
}
