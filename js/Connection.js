var Connection = {

    requestToApi: async function(endpoint,body,devolve) {
        try {
            var response = await fetch(`http://localhost:82/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            var responseHandlers = {
                "JSON": () => response.json(),
                "Text": () => response.text()
            };

            if(responseHandlers[devolve]) {
                return await responseHandlers[devolve]();
            } else {
                throw new Error("Erro na requisição");
            }
        } catch (e) {
            throw new Error(`Erro: ${e}`);
        }        
    }    

};