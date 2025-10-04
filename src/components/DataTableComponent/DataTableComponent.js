
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { CustomerService } from './service/CustomerService';

function DataTableComponent() {
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

    // useEffect(() => {
    //     CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    // }, []);

    return (
        <div>
            <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="ref" header="REF" style={{ width: '33%' }}></Column>
                <Column field="color" header="Color" style={{ width: '33%' }}></Column>
                <Column field="size" header="Size" style={{ width: '33%' }}></Column>
            </DataTable>
        </div>
    );
}

export default DataTableComponent;
