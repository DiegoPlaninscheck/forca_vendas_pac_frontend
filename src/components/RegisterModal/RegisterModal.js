import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./RegisterModal.css";

function RegisterModal(props) {
    const [ref, setRef] = useState("");
    const [cor, setCor] = useState("");
    const [tamanho, setTamanho] = useState("");

    const handleSave = () => {
        const produto = { ref, cor, tamanho };
        console.log("Produto salvo:", produto);
        props.setVisible(false);
    };

    return (
        <Dialog
            visible={props.visible}
            onHide={() => props.setVisible(false)}
            closable
            style={{ width: "40vw" }}
            modal
            className="register-modal"
        >
            <div className="register-content">
                <h3 className="title">Inclusão de Produtos</h3>

                <div className="form-grid">
                    <div className="form-group">
                        <label>REF</label>
                        <InputText
                            value={ref}
                            onChange={(e) => setRef(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <label>COR</label>
                        <InputText
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            className="input-field"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>TAMANHO</label>
                        <InputText
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="footer">
                    <Button
                        label="SALVAR"
                        className="save-button"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default RegisterModal;
