function displayFields(form,customHTML){

	var numState = getValue("WKNumState");
	var formMode = form.getFormMode();

	customHTML.append('<script type="text/javascript">');
	customHTML.append('Formulario.formMode = "' + formMode + '";');
	customHTML.append('Formulario.numState = "' + numState + '";');
	
	var paineisAtividades = {
		tributario : { id : "painelTributario", atividades : ["15"] },
		gestaoAdmVendas : { id : "painelGestaoAdmVendas", atividades : ["16"] },
		admVendasFiscal : { id : "painelAdmVendasFiscal", atividades : ["83","85"] },
		gerenteRegionalNegocio : { id : "painelGerenteRegionalNegocio", atividades : ["27"] },
		assistenteUnidade : { id : "painelAssistenteUnidade", atividades : ["91"] },
		admVendas : { id : "painelAdmVendas", atividades : ["29"] },
		fiscal : { id : "painelFiscal", atividades : ["36"] },
		//gestorImediato : { id : "painelGestorImediato", atividades : ["17"] },
		admVendasMDFe : { id : "painelAdmVendasMDFe", atividades : ["102"] },
		aprovador1 : { id : "painelAprovador1", atividades : ["18"] },
		creditoCobranca : { id : "painelCreditoCobranca", atividades : ["183"] },
		impressaoNF : { id : "painelImpressaoNF", atividades : ["190"] }
	}
	
	var atividadesCompletadas = String(form.getValue("atividadesCompletadas")).split(",");
	var modoVisualizacao = formMode == "VIEW";
	var verificarAtividadesCompletadas = function (haystack, arr) {
	    return arr.some(function (v) {
	        return haystack.indexOf(String(v)) >= 0;
	    });
	};
	
	for (var i in paineisAtividades) {
		
		form.setVisibleById(paineisAtividades[i]["id"], false);
		
		var atividadesPainel = paineisAtividades[i]["atividades"];
		var atividadeCompletada = verificarAtividadesCompletadas(atividadesCompletadas,atividadesPainel);
		
		if (atividadeCompletada || (!modoVisualizacao && atividadesPainel.indexOf(String(numState)) >= 0)) {
			form.setVisibleById(paineisAtividades[i]["id"], true);
		}
	}
	
	var separador = "___";
	var tblMateriais = "tbl1";
	var prefixo = tblMateriais + "_";
	var indicesMateriais = form.getChildrenIndexes(tblMateriais);
	
	for (var i = 0; i < indicesMateriais.length; i++) {
		
		var sufixo = separador + indicesMateriais[i];
		var processado = form.getValue("processado" + sufixo);
		var ordemCriada = /^(Ordem Criada:)/.test(processado);
		
		if (processado!= "" && !ordemCriada) {
			customHTML.append('$("#' + prefixo + 'ordemVendaRemessa' + sufixo + '").addClass("erro-sap");');
		}
	}
	
	customHTML.append('</script>');
	
}