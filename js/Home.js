var Home = {

    verifyToken: async function() {
        var endpointWithToken = "auth/validate-token/" + localStorage.getItem("token");

        var response = await Connection.requestToApi(endpointWithToken, "", "Text", "GET");

        if(response !== "Token válido")
        {
            window.location.href = "http://127.0.0.1:5500/unauthorized.html"
        }
    }

}

document.addEventListener("DOMContentLoaded", function() {
    if(window.location.href == "http://127.0.0.1:5500/home.html")
        Home.verifyToken();
});