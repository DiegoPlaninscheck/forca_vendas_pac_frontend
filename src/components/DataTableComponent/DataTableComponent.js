
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function DataTableComponent(props) {
    const [products, setProducts] = useState([
        { ref: "1", color: "red", size: "10" },
        { ref: "2", color: "blue", size: "20" },
        { ref: "3", color: "yellow", size: "30" },
        { ref: "4", color: "green", size: "30" },
        { ref: "5", color: "black", size: "20" },
        { ref: "6", color: "pink", size: "30" },
        { ref: "7", color: "purple", size: "10" },
        { ref: "8", color: "gray", size: "15" },
        { ref: "9", color: "brown", size: "10" },
        { ref: "10", color: "dark blue", size: "40" }
    ]);

    const [clients, setClients] = useState([
        { cnpj: "11.111.111/0001-11", razaosocial: "KLP CONFECÇÕES LTDA", nomefantasia: "ROSA URBANA" , inscricaoestadual: "123456789", endereco: "RUA A, 123, MASSARANDUBA, SC", observacoes: "CLIENTE FIXO" },
        { cnpj: "22.222.222/0001-22", razaosocial: "blue", nomefantasia: "20" , inscricaoestadual: "987654321", endereco: "Rua B, 456", observacoes: "Cliente novo" },
    ]);

    const [orders, setOrders] = useState([
        { id: "1", cliente: "red", cnpj: "10" , endereco: "Rua C, 789", qtdeprodutos: "5", editar: "edit" , excluir: "delete"},
        { id: "2", cliente: "blue", cnpj: "20" , endereco: "Avenida D, 101", qtdeprodutos: "10" , editar: "edit" , excluir: "delete"},
        { id: "3", cliente: "yellow", cnpj: "30" , endereco: "Travessa E, 202", qtdeprodutos: "15" , editar: "edit" , excluir: "delete"},
    ]);

    function Table(type) {
        type = type.type;

        return (
            type === "product" ? <div>
                <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="ref" header="REF" style={{ width: '33%' }}></Column>
                    <Column field="color" header="Color" style={{ width: '33%' }}></Column>
                    <Column field="size" header="Size" style={{ width: '33%' }}></Column>
                </DataTable>
            </div> : type === "client" ? <div>
                <DataTable value={clients} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="cnpj" header="CNPJ" style={{ width: '10%' }}></Column>
                    <Column field="razaosocial" header="Razão Social" style={{ width: '15%' }}></Column>
                    <Column field="nomefantasia" header="Nome Fantasia" style={{ width: '15%' }}></Column>
                    <Column field="inscricaoestadual" header="Inscrição Estadual" style={{ width: '10%' }}></Column>
                    <Column field="endereco" header="Endereço" style={{ width: '20%' }}></Column>
                    <Column field="observacoes" header="Observações" style={{ width: '20%' }}></Column>
                </DataTable>
            </div> : <div>
                <DataTable value={orders} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID" style={{ width: '10%' }}></Column>
                    <Column field="cliente" header="Cliente" style={{ width: '25%' }}></Column>
                    <Column field="cnpj" header="CNPJ" style={{ width: '25%' }}></Column>
                    <Column field="endereco" header="Endereço" style={{ width: '25%' }}></Column>
                    <Column field="qtdeprodutos" header="QTDE Produtos" style={{ width: '10%' }}></Column>
                    <Column field="editar" header=" " style={{ width: '2%' }}></Column>
                    <Column field="excluir" header="" style={{ width: '2%' }}></Column>
                </DataTable>
            </div>
        )
    }

    return (
        <Table type={props.type} />
    );
}

export default DataTableComponent;
