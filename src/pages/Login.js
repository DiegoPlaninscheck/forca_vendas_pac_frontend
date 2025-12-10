import React, { useState, useRef } from 'react';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast'; // Importar Toast para mensagens de erro
import "./Login.css";

function Login() {
    // 1. Estados para armazenar os inputs
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const toast = useRef(null); // Referência para o Toast

    // 2. Função de Autenticação Mockada
    const handleLogin = () => {
        // DADOS MOCKADOS (Defina aqui seu usuário e senha de teste)
        const usuarioCorreto = "admin";
        const senhaCorreta = "123456";

        if (login === usuarioCorreto && senha === senhaCorreta) {
            // Sucesso: Redireciona
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado!' });
            
            // Pequeno delay para ver a mensagem de sucesso antes de mudar de página
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000);
        } else {
            // Erro: Mostra mensagem
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Login ou senha incorretos' });
        }
    };

    return (
        <div className="login-container">
            {/* Componente para exibir as mensagens flutuantes */}
            <Toast ref={toast} />

            <div className="login-card">
                <div className="login-left">
                    <h1 className="logo-text">
                        ROSA <br /> URBANA
                    </h1>
                </div>
                <div className="login-right">
                    <h2 className="welcome">Bem vindo</h2>

                    <label>Login</label>
                    <input 
                        type="text" 
                        value={login}
                        onChange={(e) => setLogin(e.target.value)} // Atualiza o estado ao digitar
                        placeholder="Digite: admin"
                    />

                    <label>Senha</label>
                    <input 
                        type="password" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} // Atualiza o estado ao digitar
                        placeholder="Digite: 123456"
                    />
                    
                    <Button
                        label="Login" 
                        severity="login" // Certifique-se que essa severity customizada existe no seu tema, senão use 'primary' ou deixe sem
                        className="login-button"
                        onClick={handleLogin} // Chama a função ao clicar
                    />

                    <div className="links">
                        <a href="#">Recuperar senha</a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;