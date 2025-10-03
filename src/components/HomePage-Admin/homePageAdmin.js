import React from 'react';
import Sidebar from './Sidebar'; // Importa o componente visual que criamos

export default function SuaPagina() {
    // Simulação do tipo de usuário logado.
    // Mude para 'representante' para ver o menu extra sumir!
    const userType = 'admin';

    // 1. Defina os menus base que todos os usuários veem.
    const menuBase = [
        {
            title: 'Cadastro',
            items: [
                { label: 'Clientes', icon: 'pi pi-user', command: () => console.log('Clientes clicked') },
                { label: 'Pedidos', icon: 'pi pi-shopping-cart', command: () => console.log('Pedidos clicked') },
            ]
        }
    ];

    // 2. A lógica principal: se o usuário for 'admin', adicione o item extra.
    if (userType === 'admin') {
        menuBase.push({
            title: 'Administração',
            items: [
                // Este é o item que só o admin pode ver
                { label: 'Aprovação de Pedidos', icon: 'pi pi-check', command: () => console.log('Aprovação clicked') },
            ]
        });
    }

    // 3. Chame o componente Sidebar e passe a lista de menus final e o conteúdo da página.
    return (
        <Sidebar menuGroups={menuBase}>
            {/* O conteúdo da sua página específica vai aqui */}
            <h1>Conteúdo principal</h1>
            <p>Aqui vai o restante da sua aplicação.</p>
            <p>Nível de acesso: <strong>{userType}</strong></p>
        </Sidebar>
    );
}