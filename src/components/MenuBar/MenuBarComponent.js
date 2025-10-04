import React from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";

import "./MenuBarComponent.css";

function MenuBarComponent() {
    const items = [
        { label: "Incluir", command: () => console.log("Incluir") },
        { label: "Alterar", command: () => console.log("Alterar") },
        { label: "Visualizar", command: () => console.log("Visualizar") },
        { label: "Excluir", command: () => console.log("Excluir") }
    ];

    const start = (
        <h1 className="text-white font-semibold text-base">Cadastro de Produtos</h1>
    );

    const end = (
        <Avatar
            label="RU"
            shape="circle"
            size="large"
            style={{
                width: "50px",
                height: "50px",
                fontSize: "18px",
                background: "white",
                color: "#d32f2f",
                fontWeight: "bold"
            }}
        />
    );

    return (
        <div>
            <Menubar
                model={items}
                start={start}
                end={end}
                className="bg-red-600 border-none flex justify-between items-center"
            />
        </div>
    );
}

export default MenuBarComponent;
