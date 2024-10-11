function afterProcessFinish(processId){
	
	var numState = getValue("WKNumState");
	var nextState = hAPI.getCardValue("nextState");
	
	if (/^(48|54|58|62|66|70|74|98|100)$/.test(nextState)) {
		try {
			notificarSolicitacaoReprovada();
		} catch(e) {
			throw "Não foi possível enviar a notificação.";
		}
	}
}