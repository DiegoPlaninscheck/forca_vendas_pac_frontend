import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import RegisterModal from '../RegisterModal/RegisterModal'; 

function DataTableComponent(props) {
    // --- ESTADOS ---
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [products, setProducts] = useState([
        { ref: "1", color: "red", size: "10" },
        { ref: "2", color: "blue", size: "20" },
        { ref: "3", color: "yellow", size: "30" },
        { ref: "4", color: "green", size: "30" },
        { ref: "5", color: "black", size: "20" },
    ]);

    const [clients, setClients] = useState([
        { cnpj: "11.111.111/0001-11", razaosocial: "KLP CONFECÇÕES LTDA", nomefantasia: "ROSA URBANA" , inscricaoestadual: "123456789", endereco: "RUA A, 123, MASSARANDUBA, SC", observacoes: "CLIENTE FIXO" },
        { cnpj: "22.222.222/0001-22", razaosocial: "blue", nomefantasia: "20" , inscricaoestadual: "987654321", endereco: "Rua B, 456", observacoes: "Cliente novo" },
    ]);

    const [orders, setOrders] = useState([
        { id: "1", cliente: "red", cnpj: "10" , endereco: "Rua C, 789", qtdeprodutos: "5" },
        { id: "2", cliente: "blue", cnpj: "20" , endereco: "Avenida D, 101", qtdeprodutos: "10" },
    ]);

    const [approval, setApproval] = useState([
        { Referência: "1", COR: "red", TAMANHO: "10" , Quantidade: "50" },
        { Referência: "2", COR: "blue", TAMANHO: "20" , Quantidade: "30" },
        { Referência: "3", COR: "yellow", TAMANHO: "30" , Quantidade: "20" },
    ]);

    // --- FUNÇÕES DE AÇÃO GERAIS (Editar/Excluir) ---
    const openEditModal = (rowData) => {
        setSelectedRow(rowData);
        setModalVisible(true);
    };

    const deleteRow = (rowData) => {
        if (props.type === "product") {
            setProducts(products.filter(p => p.ref !== rowData.ref));
        } else if (props.type === "client") {
            setClients(clients.filter(c => c.cnpj !== rowData.cnpj));
        } else if (props.type === "order") {
            setOrders(orders.filter(o => o.id !== rowData.id));
        }
    };

    // --- FUNÇÕES DE APROVAÇÃO ---
    const aprovarPedido = (rowData) => {
        console.log("Aprovado:", rowData);
        alert(`Item ${rowData.Referência} Aprovado com sucesso!`);
        // Aqui você adicionaria a lógica para salvar no banco ou remover da lista
        setApproval(approval.filter(a => a.Referência !== rowData.Referência));
    };

    const negarPedido = (rowData) => {
        console.log("Negado:", rowData);
        alert(`Item ${rowData.Referência} Negado.`);
        // Remove da lista ao negar
        setApproval(approval.filter(a => a.Referência !== rowData.Referência));
    };

    // --- TEMPLATES ---

    // Template 1: Botões de Editar/Excluir (Para Produtos, Clientes, Pedidos)
    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <Button 
                    icon="pi pi-pencil" 
                    rounded text severity="info" 
                    onClick={() => openEditModal(rowData)} 
                    tooltip="Editar"
                />
                <Button 
                    icon="pi pi-trash" 
                    rounded text severity="danger" 
                    onClick={() => deleteRow(rowData)} 
                    tooltip="Excluir"
                />
            </div>
        );
    };

    // Template 2: Botões de Aprovar/Negar (Exclusivo para Tabela de Aprovação)
    const approvalBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <Button 
                    icon="pi pi-check" 
                    rounded text severity="success" 
                    onClick={() => aprovarPedido(rowData)} 
                    tooltip="Aprovar"
                    aria-label="Aprovar"
                />
                <Button 
                    icon="pi pi-times" 
                    rounded text severity="danger" 
                    onClick={() => negarPedido(rowData)} 
                    tooltip="Negar"
                    aria-label="Negar"
                />
            </div>
        );
    };

    // --- RENDERIZAÇÃO DAS TABELAS ---
    function Table({ type }) {
        if (type === "product") {
            return (
                <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="ref" header="REF" style={{ width: '20%' }}></Column>
                    <Column field="color" header="Cor" style={{ width: '25%' }}></Column>
                    <Column field="size" header="Tamanho" style={{ width: '25%' }}></Column>
                    <Column body={actionBodyTemplate} header="Ações" style={{ width: '10%', textAlign: 'center' }}></Column>
                </DataTable>
            );
        }
        
        if (type === "client") {
            return (
                <DataTable value={clients} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="cnpj" header="CNPJ" style={{ width: '15%' }}></Column>
                    <Column field="razaosocial" header="Razão Social" style={{ width: '20%' }}></Column>
                    <Column field="nomefantasia" header="Nome Fantasia" style={{ width: '20%' }}></Column>
                    <Column field="inscricaoestadual" header="Inscrição Est." style={{ width: '10%' }}></Column>
                    <Column field="endereco" header="Endereço" style={{ width: '20%' }}></Column>
                    <Column body={actionBodyTemplate} header="Ações" style={{ width: '10%', textAlign: 'center' }}></Column>
                </DataTable>
            );
        }

        if (type === "order") {
            return (
                <DataTable value={orders} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID" style={{ width: '10%' }}></Column>
                    <Column field="cliente" header="Cliente" style={{ width: '25%' }}></Column>
                    <Column field="cnpj" header="CNPJ" style={{ width: '25%' }}></Column>
                    <Column field="endereco" header="Endereço" style={{ width: '25%' }}></Column>
                    <Column field="qtdeprodutos" header="Qtd" style={{ width: '10%' }}></Column>
                    <Column body={actionBodyTemplate} header="Ações" style={{ width: '10%', textAlign: 'center' }}></Column>
                </DataTable>
            );
        }

        // Tabela de Aprovação (Approval) - Usando o novo template
        return (
            <DataTable value={approval} paginator rows={5} rowsPerPageOptions={[5,10,25]} tableStyle={{minWidth: '50rem'}}>
                <Column field="Referência" header="Referência" style={{width: '25%'}}></Column>
                <Column field="COR" header="COR" style={{width: '20%'}}></Column>
                <Column field="TAMANHO" header="TAMANHO" style={{width: '20%'}}></Column>
                <Column field="Quantidade" header="Qtd" style={{width: '15%'}}></Column>
                {/* Coluna específica de Aprovação/Negação */}
                <Column body={approvalBodyTemplate} header="Aprovação" style={{width: '20%', textAlign: 'center'}}></Column>
            </DataTable>
        );
    }

    return (
        <div>
            <Table type={props.type} />
            
            <RegisterModal 
                visible={modalVisible} 
                setVisible={setModalVisible} 
                type={props.type}
                selectedData={selectedRow}
            />
        </div>
    );
}

export default DataTableComponent;