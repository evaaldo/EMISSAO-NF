var Connection = {
    requestToApi: async function(endpoint, body, devolve, method) {
        try {
            // Configuração básica da requisição
            var requestConfig = {
                method: method,
                headers: {
                    "Content-type": "application/json"
                }
            };

            if (body) {
                requestConfig.body = JSON.stringify(body);
            }

            var response = await fetch(`http://localhost:82/${endpoint}`, requestConfig);

            console.log(response);

            if (!response.ok) {
                return "Erro na requisição";
            }

            var responseHandlers = {
                "JSON": () => response.json(),
                "Text": () => response.text()
            };

            if (responseHandlers[devolve]) {
                return await responseHandlers[devolve]();
            } else {
                throw new Error("Erro na requisição");
            }
        } catch (e) {
            throw new Error(`Erro: ${e}`);
        }
    }
};
