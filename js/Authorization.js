var Authorization = {

    username: function() {
        return $("#username").val();
    },

    password: function() {
        return $("#password").val();
    },

    checkCostumer: async function() {
        var body = { 
            "Username": this.username(),
            "Password": this.password() 
        };
        var response = await Connection.requestToApi("auth", body, "JSON", "POST");

        return response;
    },

    saveToken: async function() {
        var response = await this.checkCostumer();
        var token = response.token;

        localStorage.setItem("token",token);

        return response;
    },

    authCostumer: async function() {
        var response = await this.saveToken();

        response == "Erro na requisição" ? alert("Login e/ou senha inválidos") : window.location.href = "http://127.0.0.1:5500/home.html";
    },

    redirectToLoginPage: function() {
        window.location.href = "http://127.0.0.1:5500/index.html";
    }

};