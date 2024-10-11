function obterRetornoOrdemVenda(){
	
	var indices = hAPI.getChildrenIndexes("tbl1");
	var retorno = "ok";
	var retornouErro = false;
	
	for (var i = 0; i < indices.length; i++) {
		
		var processado = hAPI.getCardValue("processado___" + indices[i]);
		var ordemCriada = /^(Ordem Criada:)/.test(processado);
		var ordemPendente = processado == '' ? true : false;
		
		log.info('Integracao Hana >> processado >> ' + processado);
		
		log.info('Integracao Hana >> ordemCriada >> ' + ordemCriada);
		
		log.info('Integracao Hana >> ordemPendente >> ' + ordemPendente);


				
		if (!ordemCriada && !ordemPendente) {
			log.info('Integracao Hana >> erro >> ');

			retornouErro =  true;
			//break;
		}

		if(ordemPendente){
			retorno = "pendente";
			break;
		}

	}

	if(retornouErro && /^(ok)/.test(retorno) ) retorno = "erro";
	
	return retorno;
}