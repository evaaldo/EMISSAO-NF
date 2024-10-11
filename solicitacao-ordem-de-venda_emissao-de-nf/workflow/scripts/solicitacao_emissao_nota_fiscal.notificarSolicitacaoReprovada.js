function notificarSolicitacaoReprovada(notificarSolicitacaoReprovada){
	
	var usuario = getValue("WKUser");
	var numeroSolicitacao = String(getValue("WKNumProces"));
	var assunto = "Solicitação de Ordem de Venda REPROVADA";
	var nomeSolicitante = hAPI.getCardValue("nomeSolicitante");
	var matriculaSolicitante = hAPI.getCardValue("matriculaSolicitante");
	var parametros = new java.util.HashMap();
	var destinatarios = new java.util.ArrayList();

	parametros.put("subject", assunto);
    parametros.put("nomeSolicitante", nomeSolicitante);
    parametros.put("numeroSolicitacao", numeroSolicitacao);
    destinatarios.add(matriculaSolicitante);
    
	notifier.notify(
		usuario,
        "ordemVendaSolicitacaoReprovada",
        parametros,
        destinatarios,
        "text/html"
    );
}