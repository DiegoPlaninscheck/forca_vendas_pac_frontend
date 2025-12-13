import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./RegisterModal.css";

function RegisterModal(props) {
    const [observacoes, setObs] = useState("");
    
    // Cliente
    const [CNPJ, setCNPJ ] = useState("");
    const [razaoSocial, setRazao] = useState("");
    const [nomeFantasia, setNome] = useState("");
    const [inscricaoEstadual, setInscricao] = useState("");
    const [ENDERECO, setENDERECO ] = useState("");
    
    // Produtos
    const [ref, setRef] = useState("");
    const [cor, setCor] = useState("");
    const [tamanho, setTamanho] = useState("");
    
    // Pedidos
    const [cliente, setCliente] = useState("");
    const [QtdProd, setQtd] = useState("");

    // --- EFEITO: CARREGAR DADOS ---
    useEffect(() => {
        if (props.visible) {
            if (props.selectedData && !props.isNewRecord) {
                // EDIÇÃO: Carregar dados existentes
                const data = props.selectedData;
                
                if (props.type === "product") {
                    setRef(data.ref || "");
                    setCor(data.color || data.cor || ""); 
                    setTamanho(data.size || data.tamanho || "");
                    setObs(data.observacoes || "");
                } else if (props.type === "client") {
                    setCNPJ(data.cnpj || "");
                    setRazao(data.razaosocial || "");
                    setNome(data.nomefantasia || "");
                    setInscricao(data.inscricaoestadual || "");
                    setENDERECO(data.endereco || "");
                    setObs(data.observacoes || "");
                } else if (props.type === "order") {
                    setCliente(data.cliente || "");
                    setQtd(data.qtdeprodutos || "");
                    setCNPJ(data.cnpj || "");
                    setENDERECO(data.endereco || "");
                }
            } else {
                // NOVO REGISTRO: Limpar todos os campos
                setRef(""); setCor(""); setTamanho(""); setObs("");
                setCNPJ(""); setRazao(""); setNome(""); setInscricao(""); setENDERECO("");
                setCliente(""); setQtd("");
            }
        } else if (!props.visible) {
            // Limpar tudo ao fechar
            setRef(""); setCor(""); setTamanho(""); setObs("");
            setCNPJ(""); setRazao(""); setNome(""); setInscricao(""); setENDERECO("");
            setCliente(""); setQtd("");
        }
    }, [props.selectedData, props.visible, props.type, props.isNewRecord]);

    const handleSave = () => {
        let dadosParaSalvar = {};

        // AQUI ESTÁ O SEGREDO: Montar o objeto com as chaves que a Tabela espera
        if(props.type === "product"){
            dadosParaSalvar = {
                ref: ref,
                color: cor,    // Tabela espera "color"
                size: tamanho, // Tabela espera "size"
                observacoes: observacoes
            };
        } else if(props.type === "client") {
            dadosParaSalvar = {
                cnpj: CNPJ,
                razaosocial: razaoSocial, // Tabela espera tudo minúsculo conforme seu state original
                nomefantasia: nomeFantasia,
                inscricaoestadual: inscricaoEstadual,
                endereco: ENDERECO,
                observacoes: observacoes
            };
        } else {
            // Pedido
            dadosParaSalvar = {
                cliente: cliente,
                qtdeprodutos: QtdProd,
                cnpj: CNPJ, // Caso seja editável no pedido
                endereco: ENDERECO
            };
        }
        
        console.log("Enviando dados salvos:", dadosParaSalvar);
        
        // Chama a função do pai para atualizar o estado
        if (props.onSave) {
            props.onSave(dadosParaSalvar);
        }
    };

    return (
        <Dialog
            visible={props.visible}
            onHide={() => props.setVisible(false)}
            closable
            style={{ width: "40vw" }}
            modal
            className="register-modal"
            header={
                props.isNewRecord ? (
                    props.type === "product" ? "Novo Produto" :
                    props.type === "client" ? "Novo Cliente":
                    "Novo Pedido"
                ) : (
                    props.type === "product" ? "Editar Produto" :
                    props.type === "client" ? "Editar Cliente":
                    "Editar Pedido"
                )
            }
        >
            <div className="register-content">
                
                {props.type === "product" ? ( 
                <div className="form-grid">
                    <div className="form-group">
                        <label>REF</label>
                        {/* REF é auto-gerado para novos produtos */}
                        <InputText value={ref} onChange={(e) => setRef(e.target.value)} className="input-field" disabled={props.isNewRecord}/>
                    </div>
                    <div className="form-group">
                        <label>Cor</label>
                        <InputText value={cor} onChange={(e) => setCor(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group">
                        <label>Tamanho</label>
                        <InputText value={tamanho} onChange={(e) => setTamanho(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group full-width">
                        <label>Observações</label>
                        <InputText value={observacoes} onChange={(e) => setObs(e.target.value)} className="input-field"/>
                    </div>
                </div>

                ) : props.type === "client" ? (
                <div className="form-grid">
                    <div className="form-group">
                        <label>CNPJ</label>
                        <InputText value={CNPJ} onChange={(e) => setCNPJ(e.target.value)} className="input-field" disabled={props.isNewRecord}/>
                    </div>
                    <div className="form-group">
                        <label>Razão Social</label>
                        <InputText value={razaoSocial} onChange={(e) => setRazao(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group">
                        <label>Nome Fantasia</label>
                        <InputText value={nomeFantasia} onChange={(e) => setNome(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group">
                        <label>Inscrição Estadual</label>
                        <InputText value={inscricaoEstadual} onChange={(e) => setInscricao(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group">
                        <label>Endereço</label>
                        <InputText value={ENDERECO} onChange={(e) => setENDERECO(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group full-width">
                        <label>Observações</label>
                        <InputText value={observacoes} onChange={(e) => setObs(e.target.value)} className="input-field"/>
                    </div>
                </div>
                ) : (
                <div className="form-grid">
                    <div className="form-group">
                        <label>Cliente</label>
                        <InputText value={cliente} onChange={(e) => setCliente(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group">
                        <label>Endereço</label>
                        <InputText value={ENDERECO} onChange={(e) => setENDERECO(e.target.value)} className="input-field"/>
                    </div>
                    <div className="form-group">
                        <label>Quantidade</label>
                        <InputText value={QtdProd} onChange={(e) => setQtd(e.target.value)} className="input-field"/>
                    </div>
                </div>
                )}
            
                <div className="footer" style={{marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                    <Button
                        label="CANCELAR" outlined severity="secondary"
                        onClick={() => props.setVisible(false)}
                    />
                    <Button
                        label="SALVAR" severity="success"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default RegisterModal;