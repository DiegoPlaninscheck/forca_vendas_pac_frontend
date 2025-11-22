import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./RegisterModal.css";

function RegisterModal(props) {
    const [observacoes, setObs] = useState("");
    const [CNPJ, setCNPJ ] = useState("");
    const [ENDERECO, setENDERECO ] = useState("");
    //Produtos
    const [ref, setRef] = useState("");
    const [cor, setCor] = useState("");
    const [tamanho, setTamanho] = useState("");
    //Clientes
    const [razaoSocial, setRazao] = useState("");
    const [nomeFantasia, setNome] = useState("");
    const [inscricaoEstadual, setInscricao] = useState("");
    //Pedidos
    const [cliente, setCliente] = useState("");
    const [QtdProd, setQtd] = useState("");

    const handleSave = () => {
        let dadosParaSalvar = {};

        if(props.type === "product"){
            dadosParaSalvar = {
                tipo: "Produto",
                ref: ref,
                cor: cor,
                tamanho: tamanho,
                observacoes: observacoes
            };
        }else if(props.type === "client") {
            dadosParaSalvar = {
                tipo:"Cliente",
                cnpj: CNPJ,
                razaoSocial: razaoSocial,
                nomeFantasia: nomeFantasia,
                endereco: ENDERECO,
                observacoes: observacoes
            };
        }else{
            dadosParaSalvar = {
                tipo:"Pedido",
                cliente: cliente,
                Qtd: QtdProd
            };
        }
        console.log("Salvando todos os dados cadastrados", dadosParaSalvar);

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
            <div className="title-box">
                <h3 className="title">
                    {props.type === "product" ? "Cadastro de Produtos" :
                    props.type === "client" ? "Cadastro de Clientes":
                    "Cadastro de Pedidos"}
                </h3>
            </div>
            <div className="register-content">
                
                {props.type === "product" ? ( 
                
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
                        <label>Cor</label>
                        <InputText
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Tamanho</label>
                        <InputText
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Observações</label>
                        <InputText
                            value={observacoes}
                            onChange={(e) => setObs(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>

                ) : props.type === "client" ? (
                <div className="form-grid">
                    <div className="form-group">
                        <label>CNPJ</label>
                        <InputText
                            value={CNPJ}
                            onChange={(e) => setCNPJ(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Razão Social</label>
                        <InputText
                            value={razaoSocial}
                            onChange={(e) => setRazao(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Nome Fantasia</label>
                        <InputText
                            value={nomeFantasia}
                            onChange={(e) => setNome(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Inscriçã Estadual</label>
                        <InputText
                            value={inscricaoEstadual}
                            onChange={(e) => setInscricao(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Endereço</label>
                        <InputText
                            value={ENDERECO}
                            onChange={(e) => setENDERECO(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Observações</label>
                        <InputText
                            value={observacoes}
                            onChange={(e) => setObs(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
                ) : (
                <div className="form-grid">
                    <div className="form-group">
                        <label>Referência</label>
                        <InputText
                            value = {ref}
                            onChange={(e) => setRef(e.target.value)}                        
                            className="input-field"
                       />
                    </div>
                    <div className="form-group">
                        <label>Cor</label>
                        <InputText
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Tamanho</label>
                        <InputText
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantidade</label>
                        <InputText
                            value={QtdProd}
                            onChange={(e) => setQtd(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
                )}
            
                <div className="footer">
                    <Button
                        label="CANCELAR" outlined severity="secondary"
                        className="cancel-button"
                        onClick={() => props.setVisible(false)}
                    />
                    <Button
                        label="SALVAR" severity="success"
                        className="save-button"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default RegisterModal;
