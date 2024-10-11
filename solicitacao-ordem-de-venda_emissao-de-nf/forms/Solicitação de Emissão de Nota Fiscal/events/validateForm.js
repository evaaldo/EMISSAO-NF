function validateForm(form){
	
	var numState = getValue("WKNumState");
	var nextState = form.getValue("nextState");
	var formMode = form.getFormMode();
	var separadorPaiFilho = "___";
	var tblMateriais = "tbl1";
	var tblNotasManuais = "tbl2";
	var idFluxo = form.getValue("idFluxo");
	var tipoOrdem = form.getValue("tipoOrdem");
	var contaDespesa = form.getValue("contaDespesa");
	var codigoCentroEmissor = form.getValue("codigoCentroEmissor");
	var descricaoMovimentacao = "Selecione a opção de movimentação";
	var descricaoObservacao = "Observação";
	var descricaoNumNFReferencia = "Nº Nota Fiscal Referência";
	var ADM03 = idFluxo == "ADM03";
	
	var mensagem = (function(descricao,detalhe){
		return java.lang.String.format("<strong>%s</strong><br/><br/>%s<br/><br/>",descricao,detalhe);
	});
	
	var validarCamposObrigatorios = (function(campos){
		var invalidados = [];
		for (var campo in campos) {
			if (null == form.getValue(campo) || form.getValue(campo).trim() == "") {
				invalidados.push(" - " + campos[campo]);
			}
		}
		
		if (invalidados.length > 0) {
			throw mensagem('Campos obrigatórios não informados.',invalidados.join("<br/>"));
		}
	});
	
	var validacoes = [validarCamposObrigatorios];
	var camposObrigatorios = {};
	
	if (formMode == "MOD" && form.getValue("numeroSolicitacao") == "") {
		camposObrigatorios["numeroSolicitacao"] = "N° Solicitação";
	}
	
	if (formMode == "ADD" || /^(4|29|36)$/.test(numState)) {
		
		// camposObrigatorios["codigoBPSolicitante"] = "Código BP Solicitante";
		camposObrigatorios["identificacaoCentroEmissor"] = "Identificar o Centro do Emissor";
		camposObrigatorios["codigoCentroEmissor"] = "Centro Emissor";
		camposObrigatorios["organizacaoVendas"] = "Org. de Vendas";
		camposObrigatorios["localNegocio"] = "Local de Negócio";
        camposObrigatorios["processo"] = "Processo";
        camposObrigatorios["atendimentoArea"] = "Atendimento pela Área";
		camposObrigatorios["informacaoEntrega"] = "Informação para Entrega";
        //camposObrigatorios["tipoOrdem"] = "Tipo de Ordem";
		
		if (/^(Y006|Y007)$/.test(tipoOrdem)) {
			validacoes.push((function(){
				if (!/^(2020|2003)$/.test(codigoCentroEmissor)) {
					throw mensagem('Tipo de Ordem e Centro Emissor.',' - Tipo de Ordem Y006 e Y007 PODE SER cadastrado somente para o centro correspondente ao E-comerce - 2020 e 2003.');
				}
			}));
		} else if (/^(Y029|Y030)$/.test(tipoOrdem)) {
			validacoes.push((function(){
				if (/^(2020|2003)$/.test(codigoCentroEmissor)) {
					throw mensagem('Tipo de Ordem e Centro Emissor.',' - Tipo de Ordem Y029 e Y030 NÃO PODER SER cadastrado para o centro correspondente ao E-comerce - 2020 e 2003.');
				}
			}));
		}
		
        if (/^(Y006|Y029)$/.test(tipoOrdem)) {
        	// Label original: Aprovador ZINF
        	camposObrigatorios["aprovadorZinf"] = "Aprovador O.V INFLUENCIADOR";
        }
        
        if (/^(ADMOV05|ADM03)$/.test(idFluxo) || tipoOrdem == "Y062") {
        	var labelNumeroPedidoCliente = ADM03 ? "N° NFe do Operador Retorno" : "Nº Pedido do Cliente (se necessário)"
			camposObrigatorios["numeroPedidoCliente"] = labelNumeroPedidoCliente;
		}
        if (/^(ADMOV04|FISCOV00|FISCOV01|ADM01|ADM02)$/.test(idFluxo)) {
        	//camposObrigatorios["gestorImediato"] = "Gestor Imediato";
        }
        if (/^(Z007|Z008|Z009|Z014|Z018|Z019)$/.test(tipoOrdem)) {
			camposObrigatorios["meioPagamento"] = "Meio de Pagamento";
		}
		
		if (form.getValue("informacaoEntrega") == "Retirada Imediata") {
			camposObrigatorios["tipoTransporte"] = "Tipo de Transporte";
			camposObrigatorios["responsavelFrete"] = "Responsável pelo Frete";
			camposObrigatorios["condicaoExpedicao"] = "Condição de Expedição";
			
			var tipoTransporte = form.getValue("tipoTransporte");
			var responsavelSemFrete = form.getValue("responsavelFrete") == "SRF - Sem Frete";
			
			if (tipoTransporte == "Veículo Frota Própria" && !responsavelSemFrete) {
				camposObrigatorios["placa"] = "Placa";
				camposObrigatorios["codigoTransportadora"] = "Cód. Transportadora";
				camposObrigatorios["razaoSocialTransportadora"] = "Transportadora";
				camposObrigatorios["matriculaMotorista"] = "Matrícula Motorista";
				camposObrigatorios["codigoBPMotorista"] = "Cód. BP Motorista";
			} else if (tipoTransporte == "Veículo de Transportadora" && !responsavelSemFrete) {
				camposObrigatorios["codigoTransportadora"] = "Cód. Transportadora";
				camposObrigatorios["razaoSocialTransportadora"] = "Transportadora";
			}
			
			if (!responsavelSemFrete) {
				camposObrigatorios["codigoTransportadora"] = "Cód. Transportadora";
				camposObrigatorios["razaoSocialTransportadora"] = "Transportadora";
			}
		}
		
		var indexesTblMateriais = form.getChildrenIndexes(tblMateriais);
		
		validacoes.push((function(){
			if (indexesTblMateriais.length < 1) {
				throw mensagem('Dados do Parceiro de Negócio e Materiais - Despesas.',' - Pelo menos uma linha deve ser preenchida.');
			}
		}));
		
		var camposObrigatoriosTblMateriais = {
			"codigoBP" : "Código BP",
			"canalDistribuicao" : "Canal Dist.",
			"setorAtividade" : "Setor Ativ.",
			"nomeRazaoSocial" : "Nome/Razão Social",
			"uf" : "UF",
			"codigoMaterial" : "Cód. Material",
			"descricaoMaterial" : "Desc. Material",
			"quantidade" : "Qtde.",
			"unidadeMedida" : "Und. Medida",
			"pesoBruto" : "Peso Bruto",
			"pesoLiquido" : "Peso Líquido",
			//"precoCusto" : "Preço de Custo",
			"valorUnitario" : "Valor Unit. R$",
			"subtotal" : "Subtotal"
		}
		
		if (!/^(Z008|Z009)$/.test(tipoOrdem)) {
		    camposObrigatoriosTblMateriais["deposito"] = "Depósito";
		}
		
		if (!ADM03) {
			camposObrigatoriosTblMateriais["precoCusto"] = "Preço de Custo";
		}
		
		var prefixoCampoMaterial = tblMateriais + "_";
		
		for (var i = 0, linha = 1; i < indexesTblMateriais.length; i++, linha++) {
			
			var sufixoCampoMaterial = separadorPaiFilho + indexesTblMateriais[i];
			
			for (var campoMaterial in camposObrigatoriosTblMateriais) {
				camposObrigatorios[prefixoCampoMaterial + campoMaterial + sufixoCampoMaterial] = camposObrigatoriosTblMateriais[campoMaterial] + " na linha #" + linha;
			}
			
			var tipoMaterial = form.getValue(prefixoCampoMaterial + "tipoMaterial" + sufixoCampoMaterial);
			
			if (/^(ROH|ZROH|ZGRV)$/.test(tipoMaterial)) {
				camposObrigatorios[prefixoCampoMaterial + "lote" + sufixoCampoMaterial] = "Lote na linha #" + linha;
			}
			
			var centroCusto = form.getValue(prefixoCampoMaterial + "centroCusto" + sufixoCampoMaterial);
			var elementoPEP = form.getValue(prefixoCampoMaterial + "elementoPEP" + sufixoCampoMaterial);
			
			validacoes.push((function(){
				if (contaDespesa != "" && centroCusto == "" && elementoPEP == "") {
					throw mensagem('Dados do Parceiro de Negócio e Materiais - Despesas.',' - Obrigatório o preenchimento do Centro de Custo ou Elemento PEP.');
				}
			}));
		}
		
		if (/^(ADM01|ADM02)$/.test(idFluxo)) {
			camposObrigatorios["centroEmitente"] = "Centro Emitente";
			camposObrigatorios["centroDestinatario"] = "Centro Destinatário";
			camposObrigatorios["nfeReferencia"] = "NF-e Referência";
			camposObrigatorios["numeroPedidoSAP"] = "Nº Pedido SAP";
		}
		
		if (idFluxo == "FISCOV00") {
			
			var indexesTblNotasManuais = form.getChildrenIndexes(tblNotasManuais);
			
			camposObrigatorios["condicaoMaterial"] = "Condição Material";
			camposObrigatorios["numeroNFReferencia"] = descricaoNumNFReferencia;
			
			for (var i = 0; i < indexesTblNotasManuais.length; i++) {
				camposObrigatorios[tblNotasManuais + "_numNFReferencia" + separadorPaiFilho + indexesTblNotasManuais[i]] = descricaoNumNFReferencia;
			}
		}
		
		if (numState == 29) {
			
			camposObrigatorios["admVendasMovimentacao"] = descricaoMovimentacao;
			
			if (/^(Corrigir|Reprovado)$/.test(form.getValue("admVendasMovimentacao"))) {
				camposObrigatorios["admVendasObservacao"] = descricaoObservacao;
			}
			
		} else if (numState == 36) {
			
			camposObrigatorios["fiscalMovimentacao"] = descricaoMovimentacao;
			
			if (/^(Corrigir|Reprovado)$/.test(form.getValue("fiscalMovimentacao"))) {
				camposObrigatorios["fiscalObservacao"] = descricaoObservacao;
			}
		} 
		
	} else if (numState == 15) {
		
		camposObrigatorios["tributarioMovimentacao"] = descricaoMovimentacao;
		
		if (/^(Corrigir|Reprovado)$/.test(form.getValue("tributarioMovimentacao"))) {
			camposObrigatorios["tributarioObservacao"] = descricaoObservacao;
		}
		
	} else if (numState == 16) {
		
		camposObrigatorios["gestaoAdmVendasMovimentacao"] = descricaoMovimentacao;
		
		validacoes.push((function(){
			if (form.getValue("aprovadorRegional").trim() == "" && form.getValue("aprovadorTres").trim() == "") {
				throw mensagem('Aprovador Três/Regional',' - Apenas um dos campos é obrigatório.');
			}
		}));
		
		if (/^(Corrigir|Reprovado)$/.test(form.getValue("gestaoAdmVendasMovimentacao"))) {
			camposObrigatorios["gestaoAdmVendasObservacao"] = descricaoObservacao;
		}
		
	} else if (numState == 27) {
		
		camposObrigatorios["gerenteRegNegocioMovimentacao"] = descricaoMovimentacao;
		
		if (/^(Corrigir|Reprovado)$/.test(form.getValue("gerenteRegNegocioMovimentacao"))) {
			camposObrigatorios["gerenteRegNegocioObservacao"] = descricaoObservacao;
		}
		
	} else if (numState == 17) {
		
		camposObrigatorios["gestorImediatoMovimentacao"] = descricaoMovimentacao;
		
		if (/^(Corrigir|Reprovado)$/.test(form.getValue("gestorImediatoMovimentacao"))) {
			camposObrigatorios["gestorImediatoObservacao"] = descricaoObservacao;
		}
		
	} else if (numState == 18) {
		
		camposObrigatorios["aprovador1Movimentacao"] = descricaoMovimentacao;
		
		if (/^(Corrigir|Reprovado)$/.test(form.getValue("aprovador1Movimentacao"))) {
			camposObrigatorios["aprovador1Observacao"] = descricaoObservacao;
		}
		
	} else if (/^(83|85)$/.test(numState)) {
		
		camposObrigatorios["admVendasFiscalMovimentacao"] = descricaoMovimentacao;
		
		if (ADM03 && /^(Aprovado)$/.test(form.getValue("admVendasFiscalMovimentacao"))) {
			
			camposObrigatorios["planoCarga"] = "Ordem de Frete";
			camposObrigatorios["notaFiscal"] = "DocNum";
			
		} else {
			
			if (/^(K|J)$/.test(form.getValue("categoriaEquipamento"))) {
				camposObrigatorios["numeroRemessaOV"] = "Nº Remessa da OV";
			}
		}
		
		if (/^(Reprovado)$/.test(form.getValue("admVendasFiscalMovimentacao"))) {
			camposObrigatorios["admVendasFiscalObservacao"] = descricaoObservacao;
		}
		
	} else if (numState == 91) {
		
		camposObrigatorios["assistenteUnidadeMovimentacao"] = descricaoMovimentacao;
		
	} else if (numState == 102) {
		
		camposObrigatorios["admVendasMdfeMovimentacao"] = descricaoMovimentacao;
		
	} else if (numState == 183) {
		
		camposObrigatorios["creditoCobrancaMovimentacao"] = descricaoMovimentacao;
		camposObrigatorios["numeroDocumentoContabilizacao"] = "N° Documento Contabilização";
		
	} else if (numState == 190) {
		
		camposObrigatorios["impressaoNFMovimentacao"] = descricaoMovimentacao;
	}
	
	for (var i = 0; i < validacoes.length; i++) {
		var validar = validacoes[i];
		validar(i == 0 ? camposObrigatorios : null);
	}
}