var Processo = {

	inicializar: function(){
		this.inicializarAutocompleteProcesso();
		this.verificarProcesso();
		this.verificarInformacaoEntrega();
		this.toggleBotaoAnexoNotaFiscal();
	},
	
	changeInformacaoEntrega: function(){
		this.selecionarInformacaoEntrega();
		Transporte.montarListaResponsavelFrete();
	},
	
	idFluxo: function(){
		var cIdFluxo = Campos.idFluxo();
		return Campos.val(cIdFluxo);
	},
	
	atividadeGrupoTributario: function(){
		return Formulario.numState == 15;
	},
	
	preencherCamposProcesso: function(dadosProcesso){
		
		if (undefined != dadosProcesso.idFluxo && null != dadosProcesso.idFluxo) {
			var cIdFluxo = Campos.idFluxo();
			cIdFluxo.val(dadosProcesso.idFluxo);
		}
		
		if (undefined != dadosProcesso.areaAtendimento && null != dadosProcesso.areaAtendimento) {
			var cAtendimentoArea = Campos.atendimentoArea();
			cAtendimentoArea.val(dadosProcesso.areaAtendimento);
		}
		
		if (undefined != dadosProcesso.contaDespesa && null != dadosProcesso.contaDespesa) {
			var cContaDespesa = Campos.contaDespesa();
			cContaDespesa.val(dadosProcesso.contaDespesa);
		}
		
		if (undefined != dadosProcesso.tipoOrdem && null != dadosProcesso.tipoOrdem) {
			var cTipoOrdem = Campos.tipoOrdem();
			cTipoOrdem.val(dadosProcesso.tipoOrdem);
		}
	},
	
	limparCamposProcesso: function(){
		
		var cIdFluxo = Campos.idFluxo();
		var cAtendimentoArea = Campos.atendimentoArea();
		var cContaDespesa = Campos.contaDespesa();
		var cTipoOrdem = Campos.tipoOrdem();
		
		cIdFluxo.val("");
		cAtendimentoArea.val("");
		cContaDespesa.val("");
		cTipoOrdem.val("");
	},
	
	selecionarProcesso: function(dadosProcesso){
		
		this.preencherCamposProcesso({
			idFluxo : dadosProcesso.idFluxo,
			areaAtendimento : dadosProcesso.areaAtendimento,
			contaDespesa : dadosProcesso.contaDespesa,
			tipoOrdem : dadosProcesso.tipoOrdem
		});
		
		this.selecionarTipoOrdem(dadosProcesso.tipoOrdem);
		this.verificarProcesso();
		
		var cInformacaoEntrega = Campos.informacaoEntrega();
		Campos.habilitar(cInformacaoEntrega);
		
		if (dadosProcesso.idFluxo == "ADM03") {
			cInformacaoEntrega.val("Retirada Imediata");
			Campos.desabilitar(cInformacaoEntrega);
			this.verificarInformacaoEntrega();
		}
	},
	
	removerProcesso: function(){
		this.limparCamposProcesso();
		//this.limparCamposGestorImediato();
		this.verificarProcesso();
		Materiais.verificarProcesso();
		Campos.habilitar(Campos.informacaoEntrega());
	},

	verificarProcesso: function(){
		this.toggleCamposProcesso();
		this.verificarTipoOrdem();
		this.verificarContaDespesa();
		Materiais.verificarProcesso();
	},
	
	toggleCamposProcesso: function(){
		
		var idFluxo = this.idFluxo();
		var cInformacaoEntrega = Campos.informacaoEntrega();
		var cAdmVendasMovimentacao = Campos.admVendasMovimentacao();
		var cFiscalMovimentacao = Campos.fiscalMovimentacao();
		var cAdmVendasFiscalMovimentacao = Campos.admVendasFiscalMovimentacao();
		var optionAprovadoAdmVendasMovimentacao = $("option[value=Aprovado]",cAdmVendasMovimentacao);
		var optionExportarSapAdmVendasMovimentacao = $("option[value='Exportar SAP']",cAdmVendasMovimentacao);
		var optionEmitirNotaFiscalPlanoCargaAdmVendasMovimentacao = $("option[value='Emitir Nota Fiscal/Plano de Carga']",cAdmVendasMovimentacao);
		var optionAdmDeVendasAdmVendasMovimentacao = $("option[value='Adm. de Vendas']",cAdmVendasMovimentacao);
		var optionAprovadoFiscalMovimentacao = $("option[value=Aprovado]",cFiscalMovimentacao);
		var optionExportarSapFiscalMovimentacao = $("option[value='Exportar SAP']",cFiscalMovimentacao);
		var optionEmitirNotaFiscalPlanoCargaFiscalMovimentacao = $("option[value='Emitir Nota Fiscal/Plano de Carga']",cFiscalMovimentacao);
		var optionVaiGerarContabilizacaoFiscalMovimentacao = $("option[value='Vai Gerar Contabilização']",cFiscalMovimentacao);
		var optionAprovadoAdmVendasFiscalMovimentacao = $("option[value=Aprovado]",cAdmVendasFiscalMovimentacao);
		var optionCorrigirAdmVendasFiscalMovimentacao = $("option[value=Corrigir]",cAdmVendasFiscalMovimentacao);
		var FISC00 = /^(FISC00)$/.test(idFluxo);
		var ADM03 = /^(ADM03)$/.test(idFluxo);
		
		$("[data-painel=dadosAjusteCarga]").toggle(/^(ADM01|ADM02)$/.test(idFluxo));
		$("[data-painel=dadosNotasManuais]").toggle(/^(FISCOV00)$/.test(idFluxo));
		$("label[for=numeroPedidoCliente]").text(ADM03 ? "N° NFe do Operador Retorno" : "N° Pedido do Cliente (se necessário)");
		$("[data-btn-anexonotafiscal]").toggle(ADM03);
		
		optionAprovadoAdmVendasMovimentacao.toggle(/^(ADM01)$/.test(idFluxo));
		optionExportarSapAdmVendasMovimentacao.toggle(!ADM03);
		optionEmitirNotaFiscalPlanoCargaAdmVendasMovimentacao.toggle(!ADM03);
		optionAdmDeVendasAdmVendasMovimentacao.toggle(ADM03);
		optionAprovadoFiscalMovimentacao.toggle(FISC00);
		optionExportarSapFiscalMovimentacao.toggle(!FISC00);
		optionEmitirNotaFiscalPlanoCargaFiscalMovimentacao.toggle(!FISC00);
		optionVaiGerarContabilizacaoFiscalMovimentacao.toggle(FISC00);
		optionAprovadoAdmVendasFiscalMovimentacao.text(ADM03 ? "Aprovado" : "Liberado");
		optionCorrigirAdmVendasFiscalMovimentacao.toggle(ADM03);
		
		Fiscal.toggleBotaoAnexoRelatorioNF();
		
		Campos.habilitar(cInformacaoEntrega);
		
		if (ADM03) {
			Campos.desabilitar(cInformacaoEntrega);
		}
		
		//this.desabilitarAutocompleteGestorImediato();
		
		/*if (/^(ADMOV04|FISCOV00|FISCOV01|ADM01|ADM02)$/.test(idFluxo)) {
			//this.habilitarAutocompleteGestorImediato();
		}*/
	},
	
	inicializarAutocompleteProcesso: function(){
		
		var $this = this;
		var cProcesso = Campos.processo();
		
		if (cProcesso.is("input[type=text]:not([readonly])")) {
			
			FLUIGC.autocomplete(cProcesso,{
				type: "autocomplete",
				displayKey: "processo",
				source:(function(){
					return function(q,cb){
						
						var itens = [];
						var processos;
						var atividadeGrupoTributario = $this.atividadeGrupoTributario();
						
						if (atividadeGrupoTributario) {
							processos = $this.pesquisarProcessoGrupoTributario(q);
						} else {
							processos = $this.pesquisarProcesso(q);
						}
						
						var regexpTipoOrdem = new RegExp("^" + q + "$","i");
				        var regexpProcesso = new RegExp(q + ".*$","i");
				        
				        $.each(processos, function (i, processo) {
				        	if (regexpTipoOrdem.test(processo.tipoOrdem) || regexpProcesso.test(processo.processo)) {
				        		itens.push({
					        		processo: processo.processo,
					        		idFluxo: processo.idFluxo,
					        		areaAtendimento: processo.areaAtendimento,
					        		contaDespesa: processo.contaDespesa,
					        		tipoOrdem: processo.tipoOrdem
				                });
				        	}
				        });
				        
				        cb(itens);
					}
				})()
					
			}).on("fluig.autocomplete.selected",function(event){
				
				var dadosProcesso = event.item;
				
				$this.selecionarProcesso(dadosProcesso);
				
			}).on("change",function(){
				
				var processo = $(this).val().trim();
				
				if (processo == "") {
					$this.removerProcesso();
				}
			});
		}
	},
	
	pesquisarProcesso: function(pesquisa){
		
		var constraints = [];
		var cCodigoCentroEmissor = Campos.codigoCentroEmissor();
		var vCodigoCentroEmissor = Campos.val(cCodigoCentroEmissor);
		
		if (/^(2020|2003)$/.test(vCodigoCentroEmissor)) {
			constraints.push(["tipoOrdem","Y029","not"]);
			constraints.push(["tipoOrdem","Y030","not"]);
			constraints.push(["tipoOrdem","Y006","should"]);
			constraints.push(["tipoOrdem","Y007","should"]);
		} else {
			constraints.push(["processo",pesquisa,"should",true]);
			constraints.push(["tipoOrdem",pesquisa,"should",true]);
		}
		
		return Datasets.getRows(
    		Datasets.cadastroProcesso,
    		null,
    		constraints,
        	null
        );
	},
	
	pesquisarProcessoGrupoTributario: function(pesquisa){
		return Datasets.getRows(
    		Datasets.cadastroProcesso,
    		null,
    		[
    		 ["processo",pesquisa,"should",true],
    		 ["tipoOrdem","Y024","should"],
    		 ["tipoOrdem","Y025","should"]
    		],
        	null
        );
	},
	
	selecionarInformacaoEntrega: function(){
		this.verificarInformacaoEntrega();
	},
	
	verificarInformacaoEntrega: function(){
		this.toggleCamposInformacaoEntrega();
	},
	
	toggleCamposInformacaoEntrega: function(){
		
		var cInformacaoEntrega = Campos.informacaoEntrega();
		var vInformacaoEntrega = Campos.val(cInformacaoEntrega);
		
		$("[data-painel=dadosTransporte]").toggle(vInformacaoEntrega == "Retirada Imediata");
	},
	
	verificarTipoOrdem: function(){
		this.toggleCamposTipoOrdem();
	},
	
	toggleCamposTipoOrdem: function(){
		
		var cTipoOrdem = Campos.tipoOrdem();
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var vTipoOrdem = Campos.val(cTipoOrdem);
		var cAprovador1Movimentacao = Campos.aprovador1Movimentacao();
		var Z009 = vTipoOrdem == "Z009";
		var optionAprovadoAprovador1Movimentacao = $("option[value=Aprovado]",cAprovador1Movimentacao);
		var optionAdmDeVendasAprovador1Movimentacao = $("option[value='Adm. de Vendas']",cAprovador1Movimentacao);
		var optionFiscalAprovador1Movimentacao = $("option[value=Fiscal]",cAprovador1Movimentacao);
		
		$("[data-campo=meioPagamento]").toggle(/^(Z007|Z008|Z009|Z014|Z018|Z019)$/.test(vTipoOrdem));
		
		optionAprovadoAprovador1Movimentacao.toggle(!Z009);
		optionAdmDeVendasAprovador1Movimentacao.toggle(Z009);
		optionFiscalAprovador1Movimentacao.toggle(Z009);
		
		if (/^(Y006|Y029)$/.test(vTipoOrdem)) {
			$("[data-campo=aprovadorZinf]").show();
			Campos.desabilitar(cCodigoTransportadora);
		} else {
			$("[data-campo=aprovadorZinf]").hide();
			Campos.habilitar(cCodigoTransportadora);
		}
	},
	
	selecionarTipoOrdem: function(){
		
		var cTipoOrdem = Campos.tipoOrdem();
		var vTipoOrdem = Campos.val(cTipoOrdem);
		
		if (/^(Y006|Y029)$/.test(vTipoOrdem)) {
			
			var cCentroEmissor = Campos.codigoCentroEmissor();
			var vCentroEmissor = Campos.val(cCentroEmissor);
			var influenciador = this.obterDadosInfluenciador(vCentroEmissor);
			
			this.limparCamposInfluenciador("");
			
			if (null != influenciador) {
				
				this.preencherCamposInfluenciador({
					codigoTransportadora : influenciador.codigoBP,
					razaoSocialTransportadora : influenciador.razaoSocial,
					tipoTransporte : "Veículo de Transportadora"
				});

				this.desabilitarCamposInfluenciador();
				
			} else {
				Util.exibirAlerta({
					titulo: "Mensagem",
					mensagem: "O Centro Emissor não possui transportadora cadastrada.",
				});
			}
		}
	},

	desabilitarCamposInfluenciador: function(){
		var cTipoTransporte = Campos.tipoTransporte();
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var cResponsavelFrete = Campos.responsavelFrete();

		Campos.desabilitar(cTipoTransporte);
		Campos.desabilitar(cCodigoTransportadora);

		cResponsavelFrete.find('[value="SRF - Sem frete"]').remove();
		
	},
	
	obterDadosInfluenciador: function(centro){
		return Datasets.getRow(
			Datasets.hanaCadastroInfluenciadores,
			["codigoBP","razaoSocial"],
			[["centro",centro,"must"]],
			null
		);
	},
	
	preencherCamposInfluenciador: function(dadosInfluenciador){
		
		if (undefined != dadosInfluenciador.codigoTransportadora && null != dadosInfluenciador.codigoTransportadora) {
			var cCodigoTransportadora = Campos.codigoTransportadora();
			cCodigoTransportadora.val(dadosInfluenciador.codigoTransportadora);
		}
		
		if (undefined != dadosInfluenciador.razaoSocialTransportadora && null != dadosInfluenciador.razaoSocialTransportadora) {
			var cRazaoSocialTransportadora = Campos.razaoSocialTransportadora();
			cRazaoSocialTransportadora.val(dadosInfluenciador.razaoSocialTransportadora);
		}

		if (undefined != dadosInfluenciador.tipoTransporte && null != dadosInfluenciador.tipoTransporte) {
			var cTipoTransporte = Campos.tipoTransporte();
			cTipoTransporte.val(dadosInfluenciador.tipoTransporte);
		}		
	},
	
	limparCamposInfluenciador: function(){
		
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var cRazaoSocialTransportadora = Campos.razaoSocialTransportadora();
		var cTipoTransporte = Campos.tipoTransporte();
		
		cCodigoTransportadora.val("");
		cRazaoSocialTransportadora.val("");
		cTipoTransporte.val("");
	},
	
	verificarContaDespesa: function(){
		this.toggleCamposContaDespesa();
	},
	
	toggleCamposContaDespesa: function(){
		
		var cContaDespesa = Campos.contaDespesa();
		var vContaDespesa = Campos.val(cContaDespesa);
		var camposCentroCusto = $("[data-campo-" + Campos.tblMateriais + "=centroCusto]");
		var camposElementoPEP = $("[data-campo-" + Campos.tblMateriais + "=elementoPEP]");
		
		if (vContaDespesa != "") {
			camposCentroCusto.show();
			camposElementoPEP.show();
		} else {
			camposCentroCusto.hide();
			camposElementoPEP.hide();
		}
	},
	
	habilitarAutocompleteGestorImediato: function(){
		
		var $this = this;
		var cGestorImediato = Campos.gestorImediato();
		
		if (cGestorImediato.is("input[type=text]")) {
			
			var nGestorImediato = cGestorImediato.attr("name");
			var acGestorImediato = Campos.autocomplete[nGestorImediato];
			
			Campos.habilitar(cGestorImediato);
			
			if (undefined == acGestorImediato || null == acGestorImediato) {
				
				var cCodAprovadorGestorImediato = Campos.codAprovadorGestorImediato();
				
				acGestorImediato = FLUIGC.autocomplete(cGestorImediato,{
					type: "autocomplete",
					displayKey: "colleagueName",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
					        var gestores = $this.obterListaGestorImediato(q);
					        
					        $.each(gestores, function (i, gestor) {
					        	itens.push({
					        		colleagueName: gestor.colleagueName,
					        		colleagueId: gestor.colleagueId
				                });
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
					
					cCodAprovadorGestorImediato.val(event.item.colleagueId);
					
				}).on("change",function(){
					
					var vGestorImediato = Campos.val(cGestorImediato);
					
					if (vGestorImediato == "") {
						cCodAprovadorGestorImediato.val("");
					}
				});
			}
			
			Campos.autocomplete[nGestorImediato] = acGestorImediato;
		}
	},
	
	desabilitarAutocompleteGestorImediato: function(){
		
		var cGestorImediato = Campos.gestorImediato();
		
		if (cGestorImediato.is("input[type=text]")) {
			
			var nGestorImediato = cGestorImediato.attr("name");
			var acGestorImediato = Campos.autocomplete[nGestorImediato];
			
			Campos.desabilitar(cGestorImediato);
			
			if (undefined != acGestorImediato && null != acGestorImediato) {
				acGestorImediato.destroy();
				Campos.autocomplete[nGestorImediato] = null;
			}
		}
	},
	
	limparCamposGestorImediato: function(){
		
		var cGestorImediato = Campos.gestorImediato();
		var cCodAprovadorGestorImediato = Campos.codAprovadorGestorImediato();
		
		cGestorImediato.val("");
		cCodAprovadorGestorImediato.val("");
	},
	
	obterListaGestorImediato: function(nome){
		
		var cMatriculaSolicitante = Campos.matriculaSolicitante();
		var vMatriculaSolicitante = Campos.val(cMatriculaSolicitante);
		
		return Datasets.getRows(
    		"colleague",
    		["colleagueId","colleagueName"],
        	[
        	 ["colleagueName",nome,"must",true],
        	 ["colleagueId",vMatriculaSolicitante,"not"],
        	 ["sqlLimit",20,"must"]
        	],
        	null
        );
	},
	
	toggleBotaoAnexoNotaFiscal: function(){
		
		var formMode = Formulario.formMode;
		var numState = Formulario.numState;
		var idFluxo = this.idFluxo();
		
		$("[data-btn-anexonotafiscal]").toggle(idFluxo == "ADM03" && formMode != "VIEW" && /^(0|4|29)$/.test(numState));
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	setTimeout(function(){
		Processo.inicializar();
	},500);
});