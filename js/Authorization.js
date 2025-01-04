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
        var response = await Connection.requestToApi("auth", body, "JSON");

        console.log(response);

        return response;
    },

    saveToken: async function() {
        var response = await this.checkCostumer();
        var token = response.token;

        localStorage.setItem("token",token);
    },

    authCostumer: function() {
        this.saveToken();
    }

};