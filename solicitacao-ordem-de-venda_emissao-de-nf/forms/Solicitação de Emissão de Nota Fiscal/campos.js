/**
 * Facilitar o mapeamento e a manipulação de campos do formulário
 */
var Campos = {
		
	separador : "___",
	tblMateriais : "tbl1",
	tblNotasManuais : "tbl2",

	dataSolicitacao : function(){ return $("#dataSolicitacao"); },
	nomeSolicitante : function(){ return $("#nomeSolicitante"); }, 
	matriculaSolicitante : function(){ return $("#matriculaSolicitante"); },
	codigoBPSolicitante : function(){ return $("#codigoBPSolicitante"); },
	placa : function(){ return $("#placa"); },
	tipoVeiculo : function(){ return $("#tipoVeiculo"); },
	categoriaEquipamento : function(){ return $("#categoriaEquipamento"); },
	matriculaMotorista : function(){ return $("#matriculaMotorista"); },
	codigoBPMotorista : function(){ return $("#codigoBPMotorista"); },
	nomeMotorista : function(){ return $("#nomeMotorista"); },
	tipoTransporte : function(){ return $("#tipoTransporte"); },
	responsavelFrete : function(){ return $("#responsavelFrete"); },
	codigoTransportadora : function(){ return $("#codigoTransportadora"); },
	razaoSocialTransportadora : function(){ return $("#razaoSocialTransportadora"); },
	codigoCentroEmissor : function(){ return $("#codigoCentroEmissor"); },
	identificacaoCentroEmissor: function(){ return $("#identificacaoCentroEmissor"); },
	codigoOrganizacaoVendas : function(){ return $("#codigoOrganizacaoVendas"); },
	organizacaoVendas : function(){ return $("#organizacaoVendas"); },
	localNegocio : function(){ return $("#localNegocio"); },
	processo : function(){ return $("#processo"); },
	idFluxo : function(){ return $("#idFluxo"); },
	atendimentoArea : function(){ return $("#atendimentoArea"); },
	contaDespesa : function(){ return $("#contaDespesa"); },
	tipoOrdem : function(){ return $("#tipoOrdem"); },
	//gestorImediato : function(){ return $("#gestorImediato"); },
	//codAprovadorGestorImediato : function(){ return $("#codAprovadorGestorImediato"); },
	informacaoEntrega : function(){ return $("#informacaoEntrega"); },
	centroEmitente: function(){ return $("#centroEmitente"); },
	centroDestinatario: function(){ return $("#centroDestinatario"); },
	aprovadorTres: function(){ return $("#aprovadorTres"); },
	aprovadorRegional: function(){ return $("#aprovadorRegional"); },
	codAprovadorTres: function(){ return $("#codAprovadorTres"); },
	codAprovadorRegional: function(){ return $("#codAprovadorRegional"); },
	fiscalMovimentacao: function(){ return $("#fiscalMovimentacao"); },
	admVendasMovimentacao: function(){ return $("#admVendasMovimentacao"); },
	admVendasFiscalMovimentacao: function(){ return $("#admVendasFiscalMovimentacao"); },
	aprovador1Movimentacao: function(){ return $("#aprovador1Movimentacao"); },
	selecionarTodos: function(){ return $("#" + Campos.tblMateriais + "_selecionarTodos"); },
	
	materiais: {
		seletorItens: function() { return "[data-campo-" + Campos.tblMateriais + "=checkbox]:visible"; },
		_prefixo: function() { return Campos.tblMateriais + "_"; },
		_separador: function() { return Campos.separador; },
		checkbox: function(indice){ return $("#" + this._prefixo() + "checkbox" + this._separador() + indice); },
		codigoBP: function(indice){ return $("#" + this._prefixo() + "codigoBP" + this._separador() + indice); },
		canalDistribuicao: function(indice){ return $("#" + this._prefixo() + "canalDistribuicao" + this._separador() + indice); },
		descCanalDistribuicao: function(indice){ return $("#" + this._prefixo() + "descCanalDistribuicao" + this._separador() + indice); },
		setorAtividade: function(indice){ return $("#" + this._prefixo() + "setorAtividade" + this._separador() + indice);},
		nomeRazaoSocial: function(indice){ return $("#" + this._prefixo() + "nomeRazaoSocial" + this._separador() + indice); },
		uf: function(indice){ return $("#" + this._prefixo() + "uf" + this._separador() + indice); },
		codigoMaterial: function(indice){ return $("#" + this._prefixo() + "codigoMaterial" + this._separador() + indice); },
		tipoMaterial: function(indice){ return $("#" + this._prefixo() + "tipoMaterial" + this._separador() + indice); },
		descricaoMaterial: function(indice){ return $("#" + this._prefixo() + "descricaoMaterial" + this._separador() + indice); },
		unidadeMedida: function(indice){ return $("#" + this._prefixo() + "unidadeMedida" + this._separador() + indice); },
		unidadeMedidaBasica: function(indice){ return $("#" + this._prefixo() + "unidadeMedidaBasica" + this._separador() + indice); },
		deposito: function(indice){ return $("#" + this._prefixo() + "deposito" + this._separador() + indice); },
		descDeposito: function(indice){ return $("#" + this._prefixo() + "descDeposito" + this._separador() + indice); },
		valorUnitario: function(indice){ return $("#" + this._prefixo() + "valorUnitario" + this._separador() + indice); },
		precoCusto: function(indice){ return $("#" + this._prefixo() + "precoCusto" + this._separador() + indice); },
		pesoBruto: function(indice){ return $("#" + this._prefixo() + "pesoBruto" + this._separador() + indice); },
		pesoLiquido: function(indice){ return $("#" + this._prefixo() + "pesoLiquido" + this._separador() + indice); },
		quantidade: function(indice){ return $("#" + this._prefixo() + "quantidade" + this._separador() + indice); },
		lote: function(indice){ return $("#" + this._prefixo() + "lote" + this._separador() + indice); },
		subtotal: function(indice){ return $("#" + this._prefixo() + "subtotal" + this._separador() + indice); },
		centroCusto: function(indice){ return $("#" + this._prefixo() + "centroCusto" + this._separador() + indice); },
		elementoPEP: function(indice){ return $("#" +this._prefixo() + "elementoPEP" + this._separador() + indice); },
		ordemVendaRemessa: function(indice){ return $("#" +this._prefixo() + "ordemVendaRemessa" + this._separador() + indice); },
		nfeDeReferencia: function(indice){ return $("#" +this._prefixo() + "nfeDeReferencia" + this._separador() + indice); },
		valorTotal: function(){ return $("#" + this._prefixo() + "valorTotal"); },
		pesoBrutoTotal: function(){ return $("#" + this._prefixo() + "pesoBrutoTotal"); },
		pesoLiquidoTotal: function(){ return $("#" + this._prefixo() + "pesoLiquidoTotal"); },
		importacaoPlanilha: function(){ return $("#" + this._prefixo() + "importacaoPlanilha"); }
	},
	
	planilha: {
		codigoBP : "Código do BP",
		canalDistribuicao : "Canal Distribuição",
		codigoMaterial : "Código Material",
		quantidade : "Quantidade",
		unidadeMedida : "Unidade de Medida",
		deposito : "Depósito",
		lote : "Lote",
		pesoBruto : "Peso Bruto",
		centroCusto : "Centro de Custo",
		elementoPEP : "Elemento PEP",
		valorUnitario : "Valor Unitário"
	},
	
	autocomplete: {
	},
	
	indice: function(campo){
		return campo.attr("name").split(this.separador)[1];		
	},
	
	habilitar: function(campo){
		campo.removeAttr("tabindex");
		campo.removeAttr("aria-disabled");
        if (campo.is("input[type=text],textarea")) {
			campo.prop("readonly",false);
        } else if (campo.is("select")) {
        	campo.removeClass("desabilitado");
        	campo.unbind("mousedown").mousedown(function(){
				return true;
			});
			campo.unbind("keydown").keydown(function(){
				return true;
			});
		} else if (campo.is("input[type=checkbox]")) {
			campo.prop("disabled",false);
		}
	},
	
	desabilitar: function(campo){
		campo.attr("tabindex",-1);
		campo.attr("aria-disabled",true);
        if (campo.is("input[type=text],textarea")) {
			campo.prop("readonly",true);
		} else if (campo.is("select")) {
			campo.addClass("desabilitado");
			campo.unbind("mousedown").mousedown(function(){
				return false;
			});
			campo.unbind("keydown").keydown(function(){
				return false;
			});
		} else if (campo.is("input[type=checkbox]")) {
			campo.prop("disabled",true);
		}
	},
	
	val: function(campo){
		return campo.is("input[type=text],input[type=hidden],select,textarea") ? (null != campo.val() ? campo.val().trim() : "") : campo.html();
	}
}