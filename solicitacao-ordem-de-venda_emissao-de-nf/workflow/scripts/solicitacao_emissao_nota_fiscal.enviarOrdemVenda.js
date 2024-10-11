function enviarOrdemVenda(){
	
	var separadorPaiFilho = "___";
	var tblMateriais = "tbl1";
	var prefixoCampoMaterial = tblMateriais + "_";
	var companyId = getValue("WKCompany");
	var fluigApi = fluigAPI.getAuthorizeClientService();
	//var numeroSolicitacao = hAPI.getCardValue("numeroSolicitacao");
	var numeroSolicitacao = getValue("WKNumProces");
	var nomeSolicitante = hAPI.getCardValue("nomeSolicitante");
	var codigoBPSolicitante = hAPI.getCardValue("codigoBPSolicitante");
	var centroEmissor = hAPI.getCardValue("codigoCentroEmissor");
	var organizacaoVendas = hAPI.getCardValue("codigoOrganizacaoVendas");
	var processo = hAPI.getCardValue("processo");
	var tipoOrdem = hAPI.getCardValue("tipoOrdem");
	var meioPagamento = hAPI.getCardValue("meioPagamento");
	var informacaoEntrega = hAPI.getCardValue("informacaoEntrega");
	var numeroPedidoCliente = hAPI.getCardValue("numeroPedidoCliente");
	var codigoBPMotorista = hAPI.getCardValue("codigoBPMotorista");
	var placa = hAPI.getCardValue("placa");
	var codigoTransportadora = hAPI.getCardValue("codigoTransportadora");
	var indicesMateriais = hAPI.getChildrenIndexes(tblMateriais);
	var fornecimentoCompleto = "X";
	var canalDistribuicao = "";
	var motivo = "";
	//var retiradaImediata = "";
	var prioridadeRemessa = "";
	
	var httpStatusSucesso = [
        java.net.HttpURLConnection.HTTP_ACCEPTED,
        java.net.HttpURLConnection.HTTP_OK
    ];
	
	var processoCodigoMotivo = {
		"Despesas c/ importação" : "S01",
		"Painéis e Outdoor" : "S02",
		"Premiação Campanha-Incentivos" : "S03",
		"Sustent da cultura Organizac" : "S04",
		"Programa de integração" : "S05",
		"Sorteio-Premio a Colaborador" : "S06",
		"Eventos Internos" : "S07",
		"PAT - Consumo Restaurante" : "S08",
		"Cursos, Congressos e Treina" : "S09",
		"Uniformes" : "S10",
		"Produtos consumo Interno" : "S11",
		"Lanches e refeições" : "S12",
		"Kit para Funcionários" : "S13",
		"Lanches e Refeições-Terceiros" : "S14",
		"Kit para Terceiros" : "S15"
	};

	//var mRetiradaImediata = {
	//	"Retirada Imediata" : "retirada",
	//	"Roteirizar" : "roteirizacao"
	//};
	
	//if (mRetiradaImediata.hasOwnProperty(informacaoEntrega)) {
	//	retiradaImediata = mRetiradaImediata[informacaoEntrega];
	//}
	
	if (informacaoEntrega == "Retirada Imediata") {
		prioridadeRemessa = "06";
	}
	
	if(/^(Y006|Y007|Y029)$/.test(tipoOrdem)){
		prioridadeRemessa = "02";
	}
	
	if(/^(Y008|Y011|Y029|Y030)$/.test(tipoOrdem)){
		prioridadeRemessa = "04";
	}
	
	if (meioPagamento != "") {
		meioPagamento = meioPagamento.substring(0,1);
	}
	
	if (numeroPedidoCliente == "") {
		numeroPedidoCliente = numeroSolicitacao;
	}
	
	if (tipoOrdem == "Y000" && processoCodigoMotivo.hasOwnProperty(processo)) {
		motivo = processoCodigoMotivo[processo];
	}
	
	//if (tipoOrdem == "Y006") {
	//	numeroSolicitacao = "ZINF " + numeroSolicitacao;
	//}
	
	var estruturaOrdemVenda = {};
	
	for (var i = 0, total = indicesMateriais.length; i < total; i++) {
		
		var sufixoCampoMaterial = separadorPaiFilho + indicesMateriais[i];
		var processado = hAPI.getCardValue("processado" + sufixoCampoMaterial);
		var ordemCriada = /^(Ordem Criada:)/.test(processado);
		
		if (ordemCriada) {
			continue;
		}
		
		var codigoBP = hAPI.getCardValue(prefixoCampoMaterial + "codigoBP" + sufixoCampoMaterial);
		var canalDistribuicao = hAPI.getCardValue(prefixoCampoMaterial + "canalDistribuicao" + sufixoCampoMaterial);
		
		if (!estruturaOrdemVenda.hasOwnProperty(canalDistribuicao)) {
			estruturaOrdemVenda[canalDistribuicao] = { "mercadorias" : {} };
		}
		
		if (!estruturaOrdemVenda[canalDistribuicao]["mercadorias"].hasOwnProperty(codigoBP)) {
			estruturaOrdemVenda[canalDistribuicao]["mercadorias"][codigoBP] = { "materiais" : {} };
		}
		
		estruturaOrdemVenda[canalDistribuicao]["mercadorias"][codigoBP]["materiais"][indicesMateriais[i]] = sufixoCampoMaterial; 
	}
	
	// Conforme definido em documentação é realizado um envio para cada canal de distribuição
	for (var canalDistribuicao in estruturaOrdemVenda) {
		
		var dadosOrdemVenda = {
			"numero" : String(numeroSolicitacao),
			"SOLICITANTE" : String(nomeSolicitante) + "-" + String(codigoBPSolicitante),
			"orgvenda" : String(organizacaoVendas),
			"tipo_de_ordem" : String(tipoOrdem),
			"meio_de_pagamento" : String(meioPagamento),
			"canal" : String(canalDistribuicao),
			//"retiradaimediata" : String(retiradaImediata),
			"retiradaimediata" : String(prioridadeRemessa),
			"num_pedido_cliente" : String(numeroPedidoCliente),
			"motivo" : String(motivo),
			"fornecimentoCompl": String(fornecimentoCompleto),
			"prioridadeRemessa" : String(prioridadeRemessa),
			"codigoBPMotorista" : String(codigoBPMotorista),
			"placa" : String(placa),
			"codigoTransportadora" : String(codigoTransportadora),
			"mercadorias" : []
		};
		
		var mercadorias = estruturaOrdemVenda[canalDistribuicao]["mercadorias"];
		
		for (var codigoBP in mercadorias) {
			
			var mercadoria = {
				"codigo_cliente" : String(codigoBP),
				"materiais" : []
			};
			
			var materiais = mercadorias[codigoBP]["materiais"];
			
			for (var indiceMaterial in materiais) {
				
				var sufixoCampoMaterial = materiais[indiceMaterial];
				var codigoMaterial = hAPI.getCardValue(prefixoCampoMaterial + "codigoMaterial" + sufixoCampoMaterial);
				var deposito = hAPI.getCardValue(prefixoCampoMaterial + "deposito" + sufixoCampoMaterial);
				var centroCusto = hAPI.getCardValue(prefixoCampoMaterial + "centroCusto" + sufixoCampoMaterial);
				var elementoPEP = hAPI.getCardValue(prefixoCampoMaterial + "elementoPEP" + sufixoCampoMaterial);
				var quantidade = hAPI.getCardValue(prefixoCampoMaterial + "quantidade" + sufixoCampoMaterial);
				var valorUnitario = hAPI.getCardValue(prefixoCampoMaterial + "valorUnitario" + sufixoCampoMaterial);
				var unidadeMedida = hAPI.getCardValue(prefixoCampoMaterial + "unidadeMedida" + sufixoCampoMaterial);
				
				if (valorUnitario != "") {
					valorUnitario = valorUnitario.replace(".","").replace(",",".");
				}
				
				var material = {
					"codigo_material" : String(codigoMaterial),
					"centro" : String(centroEmissor),
					"deposito" : String(deposito),
					"centro_de_custo" : String(centroCusto),
					"elementoPep" : String(elementoPEP),
					"quantidade" : String(quantidade),
					"valor_unitario" : String(valorUnitario),
					"unidadeMedida" : String(unidadeMedida),
					"ind" : String(indiceMaterial)
				}
				
				mercadoria.materiais.push(material);
			}
			
			dadosOrdemVenda.mercadorias.push(mercadoria);
		}
		
		var strDadosOrdemVenda = JSON.stringify(dadosOrdemVenda);
		log.info("JSON_ORDEM_VENDA_NF_FLUIG_SAP >>> " + strDadosOrdemVenda);
		
		var parametros = {
			companyId      : String(companyId),
			serviceCode    : "SAP_S4H_REST",
			endpoint       : "/fluig/EnviarOrdemVenda",
			method         : "post",
			timeoutService : "100",
			strParams      : strDadosOrdemVenda
		}
		
		var request = fluigApi.invokeService(JSON.stringify(parametros));
		var httpStatus = request.getHttpStatusResult();
		
		if (httpStatusSucesso.indexOf(httpStatus) == -1) {
			
			var response = request.getResult();
			var message = "";
			
			try {
				
				var docFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
				var docParser = docFactory.newDocumentBuilder();
				var inputSource = new org.xml.sax.InputSource();
				
				inputSource.setCharacterStream(new java.io.StringReader(response));
			    
			    var docResponse = docParser.parse(inputSource);
			    var bodyNodes = docResponse.getElementsByTagName("body").item(0).getChildNodes();
			    message = bodyNodes.item(1).getTextContent();
			    
			} catch (e) {
				
				message = String(response);
			}
			
			throw "Falha ao tentar enviar ordem de venda! \n HTTP Status: " + httpStatus + " - Message: " + message;
		}
	}
}