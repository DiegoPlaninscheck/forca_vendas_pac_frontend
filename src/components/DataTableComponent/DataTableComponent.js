import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import RegisterModal from '../RegisterModal/RegisterModal'; 

const DataTableComponent = forwardRef((props, ref) => {
    // --- ESTADOS ---
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [products, setProducts] = useState([
        { ref: "1", color: "red", size: "10", observacoes: "" },
        { ref: "2", color: "blue", size: "20", observacoes: "" },
        { ref: "3", color: "yellow", size: "30", observacoes: "" },
        { ref: "4", color: "green", size: "30", observacoes: "" },
        { ref: "5", color: "black", size: "20", observacoes: "" },
    ]);

    const [clients, setClients] = useState([
        { cnpj: "11.111.111/0001-11", razaosocial: "KLP CONFECÇÕES LTDA", nomefantasia: "ROSA URBANA" , inscricaoestadual: "123456789", endereco: "RUA A, 123, MASSARANDUBA, SC", observacoes: "CLIENTE FIXO" },
        { cnpj: "22.222.222/0001-22", razaosocial: "Cesar Confecção", nomefantasia: "Cs Confecção" , inscricaoestadual: "987654321", endereco: "Rua B, 456", observacoes: "Cliente novo" },
    ]);

    const [orders, setOrders] = useState([
        { id: "1", cliente: "KLP CONFECÇÕES LTDA", cnpj: "11.111.111/0001-11" , endereco: "Rua C, 789", qtdeprodutos: "5" },
        { id: "2", cliente: "Cesar Confecção", cnpj: "22.222.222/0001-22" , endereco: "Avenida D, 101", qtdeprodutos: "10" },
    ]);

    const [approval, setApproval] = useState([
        { Referência: "1", COR: "KLP CONFECÇÕES LTDA", TAMANHO: "red" , Quantidade: "50" },
        { Referência: "2", COR: "Cesar Confecção", TAMANHO: "blue" , Quantidade: "30" },
    ]);

    // --- FUNÇÕES DE AÇÃO ---
    const openEditModal = (rowData) => {
        setSelectedRow(rowData);
        setModalVisible(true);
    };

    // Função para abrir modal de novo registro
    const openNewModal = () => {
        setSelectedRow(null); // Sem dados selecionados = novo registro
        setModalVisible(true);
    };

    // Expor o método openNewModal para ser chamado via ref
    useImperativeHandle(ref, () => ({
        openNewModal
    }));

    // Função auxiliar para gerar próximo ID/REF com auto-increment
    const getNextId = () => {
        if (props.type === "product" && products.length > 0) {
            const maxRef = Math.max(...products.map(p => parseInt(p.ref) || 0));
            return (maxRef + 1).toString();
        } else if (props.type === "order" && orders.length > 0) {
            const maxId = Math.max(...orders.map(o => parseInt(o.id) || 0));
            return (maxId + 1).toString();
        }
        return "1";
    };

    // --- NOVO: FUNÇÃO PARA SALVAR A EDIÇÃO OU CRIAR NOVO ---
    const saveRow = (newData) => {
        if (props.type === "product") {
            if (selectedRow) {
                // EDITAR existente
                const updatedProducts = products.map(p => 
                    p.ref === selectedRow.ref ? newData : p
                );
                setProducts(updatedProducts);
            } else {
                // CRIAR novo com auto-increment
                const newProduct = {
                    ...newData,
                    ref: getNextId()
                };
                setProducts([...products, newProduct]);
            }
        } 
        else if (props.type === "client") {
            if (selectedRow) {
                // EDITAR existente
                const updatedClients = clients.map(c => 
                    c.cnpj === selectedRow.cnpj ? newData : c
                );
                setClients(updatedClients);
            } else {
                // CRIAR novo
                setClients([...clients, newData]);
            }
        } 
        else if (props.type === "order") {
            if (selectedRow) {
                // EDITAR existente
                const updatedOrders = orders.map(o => 
                    o.id === selectedRow.id ? { ...newData, id: selectedRow.id } : o
                );
                setOrders(updatedOrders);
            } else {
                // CRIAR novo com auto-increment
                const newOrder = {
                    ...newData,
                    id: getNextId()
                };
                setOrders([...orders, newOrder]);
            }
        }
        
        setModalVisible(false); // Fecha o modal
        setSelectedRow(null);   // Limpa a seleção
    };

    const deleteRow = (rowData) => {
        if (props.type === "product") {
            setProducts(products.filter(p => p.ref !== rowData.ref));
        } else if (props.type === "client") {
            setClients(clients.filter(c => c.cnpj !== rowData.cnpj));
        } else if (props.type === "order") {
            setOrders(orders.filter(o => o.id !== rowData.id));
        } else {
            setApproval(approval.filter(a => a.Referência !== rowData.Referência));
        }
    };

    // ... (Mantive o resto das funções de template e aprovação iguais) ...
    const aprovarPedido = (rowData) => setApproval(approval.filter(a => a.Referência !== rowData.Referência));
    const negarPedido = (rowData) => setApproval(approval.filter(a => a.Referência !== rowData.Referência));

    const actionBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => openEditModal(rowData)} tooltip="Editar"/>
                <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => deleteRow(rowData)} tooltip="Excluir"/>
            </div>
        );
    };

    const approvalBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <Button 
                    icon="pi pi-check" 
                    rounded text severity="success" 
                    onClick={() => {
                        alert("Pedido Aprovado!"); // Alerta ao clicar em aprovar
                        aprovarPedido(rowData);
                    }} 
                />
                <Button 
                    icon="pi pi-times" 
                    rounded text severity="danger" 
                    onClick={() => {
                        alert("Pedido Negado!"); // Alerta ao clicar em negar
                        negarPedido(rowData);
                    }} 
                />
            </div>
        );
    };

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
                    <Column field="inscricaoestadual" header="Insc. Est." style={{ width: '10%' }}></Column>
                    <Column field="endereco" header="Endereço" style={{ width: '20%' }}></Column>
                    <Column body={actionBodyTemplate} header="Ações" style={{ width: '10%', textAlign: 'center' }}></Column>
                </DataTable>
            );
        }
        if (type === "order") {
            return (
                <DataTable value={orders} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="REF" style={{ width: '10%' }}></Column>
                    <Column field="cliente" header="Cliente" style={{ width: '25%' }}></Column>
                    <Column field="cnpj" header="CNPJ" style={{ width: '25%' }}></Column>
                    <Column field="endereco" header="Endereço" style={{ width: '25%' }}></Column>
                    <Column field="qtdeprodutos" header="Qtd" style={{ width: '10%' }}></Column>
                    <Column body={actionBodyTemplate} header="Ações" style={{ width: '10%', textAlign: 'center' }}></Column>
                </DataTable>
            );
        }
        return (
            <DataTable value={approval} paginator rows={5} rowsPerPageOptions={[5,10,25]} tableStyle={{minWidth: '50rem'}}>
                <Column field="Referência" header="Ref" style={{width: '25%'}}></Column>
                <Column field="COR" header="Cliente" style={{width: '20%'}}></Column>
                <Column field="TAMANHO" header="Cor" style={{width: '20%'}}></Column>
                <Column field="Quantidade" header="Quantidade" style={{width: '15%'}}></Column>
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
                onSave={saveRow}
                isNewRecord={selectedRow === null}
            />
        </div>
    );
});

DataTableComponent.displayName = 'DataTableComponent';

export default DataTableComponent;