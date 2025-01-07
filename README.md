<h1>Login - Autenticação JWT</h1>

<h4>✦ Resumo</h4>
<p>Uma tela de login criada para redirecionamento com base em consulta de usuário em banco de dados, geração de token JWT e autenticação do mesmo, guardando-o no localStorage</p>

<h4>✦ Ferramentas</h4>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>Javascript</li>
	<li>.NET 6</li>
	<li>Dapper</li>
	<li>SQL</li>
</ul>

<h4>✦ Endpoints</h4>
<ul>
    <li>"/auth" => POST - Verificar cliente e gerar token JWT</li>
    <li>"/auth/validate-token" => GET - Validar token informado pelo cliente</li>
    <li>"/costumer" => POST - Registrar cliente o banco de dados</li>
    <li>"/costumer" => GET - Buscar todos os clientes registrados no banco de dados</li>
</ul>

<h4>✦ Imagens do frontend</h4>

<ul>
    <li>Login: <br><img src="./img/Login.png"></img></li>
    <li>Register: <br><img src="./img/Register.png"></img></li>
    <li>Home: <br><img src="./img/Home.png"></img></li>
    <li>Unauthorized: <br><img src="./img/Unauthorized.png"></img></li>
</ul>