var Register = {

    cpf: function() {
        return $("#cpf").val();
    },

    username: function() {
        return $("#username").val();
    },

    email: function() {
        return $("#email").val();
    },

    password: function() {
        return $("#password").val();
    },

    registerCostumer: function() {
        var body = {
            "CPF": this.cpf(),
            "Username": this.username(),
            "Email": this.email(),
            "Password": this.password(),
        }

        Connection.requestToApi("costumer", body, "Text", "POST");
    }

};