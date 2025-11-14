import "./Login.css";

function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-left">
                    <h1 className="logo-text">
                        ROSA <br /> URBANA
                    </h1>
                </div>
                <div className="login-right">
                    <h2 className="welcome">Bem vindo</h2>

                    <label>Login</label>
                    <input type="text" />

                    <label>Senha</label>
                    <input type="password" />

                    <div className="links">
                        <a href="#">Recuperar senha</a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;
