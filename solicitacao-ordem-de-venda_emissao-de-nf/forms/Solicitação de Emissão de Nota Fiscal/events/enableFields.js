function enableFields(form){

	var numState = getValue("WKNumState");
	var formMode = form.getFormMode();
	var separadorPaiFilho = "___";
	var tblMateriais = "tbl1";
	var tblNotasManuais = "tbl2";

	// Desabilitar todosos campos do formulário
	(function(f){
		var i = f.getCardData().keySet().iterator();
		while (i.hasNext()) {
			f.setEnabled(i.next(), false);
		}
	})(form);
	
	var camposMateriais = function(){
		
		var camposMateriais = ["importacaoPlanilha","pesoBrutoTotal","pesoLiquidoTotal","valorTotal","observacao","selecionarTodos"];
		var camposLinhasTblMateriais = ["checkbox","codigoBP","canalDistribuicao","descCanalDistribuicao","setorAtividade","nomeRazaoSocial","uf","codigoMaterial","tipoMaterial","descricaoMaterial","quantidade","unidadeMedida","unidadeMedidaBasica","deposito","descDeposito","lote","pesoBruto","pesoLiquido","centroCusto","elementoPEP","precoCusto","valorUnitario","subtotal","ordemVendaRemessa","nfeDeReferencia"];
		var indexesTblMateriais = form.getChildrenIndexes(tblMateriais);
		
		for (var i = 0; i < indexesTblMateriais.length; i++) {
			for (var j in camposLinhasTblMateriais) {
				camposMateriais.push(camposLinhasTblMateriais[j] + separadorPaiFilho + indexesTblMateriais[i]);
			}
		}
		
		return camposMateriais.concat(camposLinhasTblMateriais).map(function(item) { return tblMateriais + "_" + item; });
	}
	
	var camposNotasManuais = function(){
		
		var camposNotasManuais = ["condicaoMaterial","notasManuaisObservacao","numeroDocumentoBaixaEstoque","numeroDocumentoBaixaReserva","numeroNFReferencia"];
		var camposLinhasTblNotasManuais = ["numDocBaixaEstoque","numDocBaixaReserva","numNFReferencia"];
		var indexesTblNotasManuais = form.getChildrenIndexes(tblNotasManuais);
		
		for (var i = 0; i < indexesTblNotasManuais.length; i++) {
			for (var j in camposLinhasTblNotasManuais) {
				camposNotasManuais.push(tblNotasManuais + "_" + camposLinhasTblNotasManuais[j] + separadorPaiFilho + indexesTblNotasManuais[i]);
			}
		}
		
		return camposNotasManuais.concat(camposLinhasTblNotasManuais.map(function(item) { return tblNotasManuais + "_" + item; }));
	}

	var camposHabilitados = [];
	
	if (/^(0|4|29|36)$/.test(numState)) {
		
		var campos = {
			cabecalho : ["identificacaoCentroEmissor","codigoCentroEmissor","codigoOrganizacaoVendas","organizacaoVendas","localNegocio"],
			processo : ["processo","idFluxo","atendimentoArea","informacaoEntrega","numeroPedidoCliente",/*"gestorImediato","codAprovadorGestorImediato",*/"meioPagamento","contaDespesa","tipoOrdem","aprovadorZinf"],
			transporte : ["tipoTransporte","responsavelFrete","condicaoExpedicao","placa","tipoVeiculo","categoriaEquipamento","codigoTransportadora","razaoSocialTransportadora","matriculaMotorista","codigoBPMotorista","nomeMotorista"],
			ajusteCarga : ["centroEmitente","centroDestinatario","nfeReferencia","numeroPedidoSAP","ajusteCargaObservacao"],
			notasManuais : camposNotasManuais(),
			materiais : camposMateriais()
		}
		
		camposHabilitados = campos.cabecalho.concat(
			campos.processo,
			campos.transporte,
			campos.ajusteCarga,
			campos.notasManuais,
			campos.materiais
		);
		
		if (numState == 29) {
			
			camposHabilitados.push(
				"admVendasMovimentacao",
				"admVendasObservacao"
			);
			
		} else if (numState == 36) {
			
			camposHabilitados.push(
				"fiscalMovimentacao",
				"fiscalObservacao"
			);
		}
		
	} else if (numState == 15) {
		
		camposHabilitados.push(
			"tributarioMovimentacao",
			"processo",
			"idFluxo",
			"areaAtendimento",
			"contaDespesa",
			"tipoOrdem",
			"tributarioObservacao"
		);
		
	} else if (numState == 16) {
		
		camposHabilitados.push(
			"gestaoAdmVendasMovimentacao",
			"aprovadorTres",
			"aprovadorRegional",
			"codAprovadorTres",
			"codAprovadorRegional",
			"gestaoAdmVendasObservacao"
		);
		
	} else if (numState == 27) {
		
		camposHabilitados.push(
			"gerenteRegNegocioMovimentacao",
			"gerenteRegNegocioObservacao"
		);
		
	} else if (numState == 17) {
		
		camposHabilitados.push(
			"gestorImediatoMovimentacao",
			"gestorImediatoObservacao"
		);
		
	} else if (numState == 18) {
		
		camposHabilitados.push(
			"aprovador1Movimentacao",
			"aprovador1Observacao"
		);
		
	} else if (numState == 102) {
		
		camposHabilitados.push(
			"admVendasMdfeMovimentacao",
			"admVendasMdfeObservacao"
		);
		
	} else if (/^(83|85)$/.test(numState)) {
		
		camposHabilitados.push(
			"admVendasFiscalMovimentacao",
			"planoCarga",
			"notaFiscal",
			"documentoEntrada",
			"numeroRemessaOV",
			"admVendasFiscalObservacao"
		);
		
	} else if (numState == 91) {
		
		camposHabilitados.push(
			"assistenteUnidadeMovimentacao",
			"assistenteUnidadeObservacao"
		);
		
	} else if (numState == 183) {
		
		camposHabilitados.push(
			"creditoCobrancaMovimentacao",
			"numeroDocumentoContabilizacao",
			"creditoCobrancaObservacao"
		);
		
	} else if (numState == 190) {
		
		camposHabilitados.push(
			"impressaoNFMovimentacao",
			"impressaoNFObservacao"
		);
	}
	
	if (formMode == "ADD") {
		camposHabilitados.push(
			"nomeSolicitante",
			"matriculaSolicitante",
			"codigoBPSolicitante",
			"dataSolicitacao"
		);
	}
	
	camposHabilitados.push("nextState","usuarioapifluig");
	
	for (var i in camposHabilitados) {
		form.setEnabled(camposHabilitados[i], true);
	}
}