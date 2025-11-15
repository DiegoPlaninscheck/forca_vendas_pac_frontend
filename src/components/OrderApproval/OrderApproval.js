import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './OrderApproval.css'; // Importando o CSS
import DataTableComponent from '../DataTableComponent/DataTableComponent';

export default function OrderApproval() {

    // Funções de clique para os botões principais
    const handleCancelar = () => {
        console.log("Pedido Cancelado");
    };

    const handleNegar = () => {
        console.log("Pedido Negado");
    };

    const handleAprovar = () => {
        console.log("Pedido Aprovado");
    };

    
   

    return (
        <div className="approval-screen">
            {/* 2. Cabeçalho de Informações (A parte vermelha) */}
            <div className="info-header">

            <h1 className="p-menubar-start">
                <span className="icon-circle" onClick={() => window.location.href = '/home'}>
                    <i className="pi pi-home"></i>
                </span>
                Aprovação de Pedidos
            </h1>
        
            </div>

            {/* 3. Sua Tabela de Dados */}
            <div className="table-container">
                <DataTableComponent />
            </div>

        </div>
    );
}
