var Materiais = {

	inicializar: function() {
		this.inicializarTodasLinhas();
		this.toggleBotoes();
	},
	
	changeCodigoBP: function(cCodigoBP){
		this.verificarCodigoBP(cCodigoBP);
	},
	
	changeCanalDistribuicao: function(cCanalDistribuicao){
		this.selecionarCanalDistribuicao(cCanalDistribuicao);
	},
	
	changeCodigoMaterial: function(cCodigoMaterial){
		this.verificarCodigoMaterial(cCodigoMaterial);
	},
	
	changeQuantidade: function(cQuantidade){
		var indice = Campos.indice(cQuantidade)
		this.calcularSubtotal(indice);
		this.calcularPesoBrutoTotal();
		this.calcularPesoLiquidoTotal();
	},
	
	changeValorUnitario: function(cValorUnitario){
		var indice = Campos.indice(cValorUnitario)
		this.calcularSubtotal(indice);
	},
	
	changePesoBruto: function(){
		this.calcularPesoBrutoTotal();
	},
	
	changePesoLiquido: function(){
		this.calcularPesoLiquidoTotal();
	},
	
	changeCentroCusto: function(cCentroCusto){
		var indice = Campos.indice(cCentroCusto);
		this.verificarCentroCusto(indice);
	},
	
	changeElementoPEP: function(cElementoPEP){
		var indice = Campos.indice(cElementoPEP);
		this.verificarElementoPEP(indice);
	},
	
	changeUnidadeMedida: function(cUnidadeMedida){
		var indice = Campos.indice(cUnidadeMedida)
		this.calcularValorUnitario(indice);
		this.calcularSubtotal(indice);
	},
	
	inicializarTodasLinhas: function(){
		
		var $this = this;
		var linhas = this.obterTodasLinhas();
		
		this.verificarOrdensRemessa();
		this.verificarProcesso();
		
		$.each(linhas, function(){
			
			var indice = Campos.indice($(this));
			
			$this.montarListaCanalDistribuicaoBP(indice);
			$this.montarListaUnidadeMedidaMaterial(indice);
			$this.habilitarAutocompleteDescricaoMaterial(indice);
			$this.habilitarAutocompleteDepositoMaterial(indice);
			$this.verificarCentroCusto(indice);
			$this.verificarElementoPEP(indice);
			$this.verificarOrdemVendaRemessa(indice);
			$this.verificarTipoOrdem(indice);
			$this.verificarProcesso(indice);
			$this.aplicarRegraCodigoMaterial(indice);
		});
	},
	
	adicionarLinha: function() {
		
		var indice = wdkAddChild(Campos.tblMateriais);
		var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
		var cQuantidade = Campos.materiais.quantidade(indice);
		var cLote = Campos.materiais.lote(indice);
		var cPesoBruto = Campos.materiais.pesoBruto(indice);
		var cPesoLiquido = Campos.materiais.pesoLiquido(indice);
		var cPrecoCusto = Campos.materiais.precoCusto(indice);
		var cValorUnitario = Campos.materiais.valorUnitario(indice);
		var cSubtotal = Campos.materiais.subtotal(indice);
		var cNfeDeReferencia = Campos.materiais.nfeDeReferencia(indice);
		
		this.habilitarAutocompleteDescricaoMaterial(indice);
		this.habilitarAutocompleteDepositoMaterial(indice);
		this.verificarTipoOrdem(indice);
		this.verificarOrdensRemessa();
		this.verificarProcesso();
		
		MaskEvent.initMask([
			cCodigoMaterial,
			cQuantidade,
			cLote,
			cPesoBruto,
			cPesoLiquido,
			cPrecoCusto,
			cValorUnitario,
			cSubtotal,
			cNfeDeReferencia
		]);
		
		return indice;
	},
	
	obterTodasLinhas: function(disabled){
		
		var seletorDisabled = disabled === true ? "" : ":not([disabled])";
		var tagCheckbox = "[data-campo-" + Campos.tblMateriais + "=checkbox]:visible" + seletorDisabled;
		var tagTabela = "table[tablename=" + Campos.tblMateriais + "] tbody";
		
		return $(tagCheckbox,tagTabela);
	},
	
	obterLinhasSelecionadas: function(){
		
		var tagCheckbox = "[data-campo-" + Campos.tblMateriais + "=checkbox]:visible:checked:not([disabled])";
		var tagTabela = "table[tablename=" + Campos.tblMateriais + "] tbody";
		
		return $(tagCheckbox,tagTabela);
	},
	
	removerLinhas: function(){
		
		var $this = this;
		var linhasSelecionadas = this.obterLinhasSelecionadas();
		
		if (linhasSelecionadas.length > 0) {
			
			FLUIGC.message.confirm({
	    		message  : "Deseja remover as informações?",
	    		title    : "Remover",
	    		labelYes : "Remover",
	    		labelNo  : "Cancelar"
	    	}, function(result, el, ev) {
	    		
	    		if (result) {
	    			
	    			$.each(linhasSelecionadas,function(){
	    				
	    				var tagTr = $(this).closest("tr")[0];
	    				
	    				fnWdkRemoveChild(tagTr);
	    			});
	    			
	    			$this.calcularValorTotal();
	    			$this.calcularPesoBrutoTotal();
	    			$this.calcularPesoLiquidoTotal();
	    			$this.verificarOrdensRemessa();
	    			$this.verificarSelecionarTodos();
	    		}
	    	});
		}
	},
	
	editarLinhas: function(){
		
		var $this = this;
		var linhasSelecionadas = this.obterLinhasSelecionadas();
		
		$.each(linhasSelecionadas,function(){
			
			var indice = Campos.indice($(this));
			var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
			var cDescricaoMaterial = Campos.materiais.descricaoMaterial(indice);
			var cPesoLiquido = Campos.materiais.pesoLiquido(indice);
			var cCentroCusto = Campos.materiais.centroCusto(indice);
			var cElementoPEP = Campos.materiais.elementoPEP(indice);
			
			$this.habilitarAutocompleteDescricaoMaterial(indice);
			
			Campos.habilitar(cCodigoMaterial);
			Campos.habilitar(cDescricaoMaterial);
			Campos.habilitar(cPesoLiquido);
			Campos.habilitar(cCentroCusto);
			Campos.habilitar(cElementoPEP);
		});
	},
	
	toggleBotoes: function(){
		
		var formMode = Formulario.formMode;
		var numState = Formulario.numState;
		
		$("[data-btn-materiais]").toggle(formMode != "VIEW" && /^(0|4|29|36)$/.test(numState));
	},
	
	verificarCodigoBP: function(cCodigoBP){
		
		var indice = Campos.indice(cCodigoBP);
		var vCodigoBP = Campos.val(cCodigoBP);
		
		this.limparCamposBP(indice);
		cCodigoBP.val(vCodigoBP);
		
		if (vCodigoBP != "") {
			
			var dadosBP = BP.obterDadosClientePorCodigo(vCodigoBP);
			
			if (null != dadosBP) {
				
				this.preencherCamposBP({
					razaoSocial : dadosBP.razaoSocial,
					estado : dadosBP.estado
				}, indice);
			}
		}
	},
	
	preencherCamposBP: function(dadosBP,indice){
		
		if (undefined != dadosBP.razaoSocial && null != dadosBP.razaoSocial) {
			var cRazaoSocial = Campos.materiais.nomeRazaoSocial(indice);
			cRazaoSocial.val(dadosBP.razaoSocial);
		}
		
		if (undefined != dadosBP.estado && null != dadosBP.estado) {
			var cUf = Campos.materiais.uf(indice);
			cUf.val(dadosBP.estado);
		}
		
		this.montarListaCanalDistribuicaoBP(indice);
	},
	
	limparCamposBP: function(indice) {
		
		var cRazaoSocial = Campos.materiais.nomeRazaoSocial(indice);
		var cUf = Campos.materiais.uf(indice);
		var cCanalDistribuicao = Campos.materiais.canalDistribuicao(indice);
		var cDescCanalDistribuicao = Campos.materiais.descCanalDistribuicao(indice);
		var cSetorAtividade = Campos.materiais.setorAtividade(indice);
		
		cRazaoSocial.val("");
		cUf.val("");
		cCanalDistribuicao.empty().append($("<option/>"));
		cDescCanalDistribuicao.val("");
		cSetorAtividade.val("");
	},
	
	montarListaCanalDistribuicaoBP: function(indice){
		
		var cCodigoBP = Campos.materiais.codigoBP(indice);
		var cCanalDistribuicao = Campos.materiais.canalDistribuicao(indice);
		var vCodigoBP = Campos.val(cCodigoBP);
		var vCanalDistribuicaoSelecionado = Campos.val(cCanalDistribuicao);
		var dadosOrganizacaoVendaBP = BP.obterDadosOrganizacaoVendaBP(vCodigoBP);
		
		cCanalDistribuicao.empty().append($("<option/>"));
		
		$.each(dadosOrganizacaoVendaBP, function(i, linhaOrganizacaoVendaBP) {
			
			var canalDistribuicao = linhaOrganizacaoVendaBP.canalDistribuicao;
			var setorAtividades = linhaOrganizacaoVendaBP.setorAtividades;
			var tagOption = $("<option/>").val(canalDistribuicao).text(canalDistribuicao).data("setorAtividade",setorAtividades);
			
			if (canalDistribuicao == vCanalDistribuicaoSelecionado) {
				tagOption.prop("selected",true);
			}
			
			cCanalDistribuicao.append(tagOption);
		});
	},
	
	selecionarCanalDistribuicao: function(cCanalDistribuicao){
		
		var indice = Campos.indice(cCanalDistribuicao);
		var vCanalDistribuicao = Campos.val(cCanalDistribuicao);
		var cDescCanalDistribuicao = Campos.materiais.descCanalDistribuicao(indice);
		var cSetorAtividade = Campos.materiais.setorAtividade(indice);
		
		cSetorAtividade.val("");
		cDescCanalDistribuicao.val("");
		
		if (vCanalDistribuicao != "") {
			
			var cadastroCanalDistribuicao = BP.obterDescricaoCanalDistribuicao(vCanalDistribuicao);
			
			if (null != cadastroCanalDistribuicao) {
				cDescCanalDistribuicao.val(cadastroCanalDistribuicao.descricaoCanalDistribuicao);
			}
			
			cSetorAtividade.val($("option:selected",cCanalDistribuicao).data("setorAtividade"));
		}
	},
	
	selecionarDeposito: function(deposito,indice){
		
		var cDescDeposito = Campos.materiais.descDeposito(indice);
		var cadastroDeposito = Material.obterDescricaoDeposito(deposito);
		
		cDescDeposito.val("");
		
		if (null != cadastroDeposito) {
			cDescDeposito.val(cadastroDeposito.descricaoDeposito);
		}
	},
	
	verificarCodigoMaterial: function(cCodigoMaterial){
		
		var indice = Campos.indice(cCodigoMaterial);
		var vCodigoMaterial = Campos.val(cCodigoMaterial);
		
		this.removerMaterial(indice);
		cCodigoMaterial.val(vCodigoMaterial);
		
		if (vCodigoMaterial != "") {
			
			var material = Material.obterDadosMaterial(vCodigoMaterial);
			
			if (null != material) {
				
				this.selecionarMaterial({
					tipoMaterial : material.tipoMaterial,
					descricaoMaterial : material.item,
					unidadeMedida: material.unidadeMedida,
					pesoBruto : material.pesoBruto,
					pesoLiquido : material.pesoLiquido,
					precoCusto : material.preco,
					valorUnitario : material.preco
				}, indice);
			}
		}
	},
	
	selecionarMaterial: function(dadosMaterial,indice){
		this.preencherDadosMaterial(dadosMaterial,indice);
		this.verificarTipoOrdem(indice);
		this.aplicarRegraCodigoMaterial(indice);
		this.calcularPesoBrutoTotal();
		this.calcularPesoLiquidoTotal();
	},
	
	preencherDadosMaterial: function(dadosMaterial,indice){
		
		if (undefined != dadosMaterial.codigoMaterial && null != dadosMaterial.codigoMaterial) {
			var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
			cCodigoMaterial.val(parseInt(dadosMaterial.codigoMaterial));
			Campos.desabilitar(cCodigoMaterial);
		}
		
		if (undefined != dadosMaterial.tipoMaterial && null != dadosMaterial.tipoMaterial) {
			var cTipoMaterial = Campos.materiais.tipoMaterial(indice);
			cTipoMaterial.val(dadosMaterial.tipoMaterial);
		}
		
		if (undefined != dadosMaterial.descricaoMaterial && null != dadosMaterial.descricaoMaterial) {
			var cDescricaoMaterial = Campos.materiais.descricaoMaterial(indice);
			cDescricaoMaterial.val(dadosMaterial.descricaoMaterial);
			this.desabilitarAutocompleteDescricaoMaterial(indice);
		}
		
		if (undefined != dadosMaterial.pesoBruto && null != dadosMaterial.pesoBruto) {
			var cPesoBruto = Campos.materiais.pesoBruto(indice);
			cPesoBruto.val(dadosMaterial.pesoBruto.replace(".",","));
		}
		
		if (undefined != dadosMaterial.pesoLiquido && null != dadosMaterial.pesoLiquido) {
			var cPesoLiquido = Campos.materiais.pesoLiquido(indice);
			cPesoLiquido.val(dadosMaterial.pesoLiquido.replace(".",","));
		}
		
		//if (undefined != dadosMaterial.valorUnitario && null != dadosMaterial.valorUnitario) {
		//	var tipoOrdem = Campos.val(Campos.tipoOrdem());
		//	var cValorUnitario = Campos.materiais.valorUnitario(indice);
		//	cValorUnitario.val(tipoOrdem == "Z009" ? "" : dadosMaterial.valorUnitario.replace(".",","));
		//}
		
		if (undefined != dadosMaterial.precoCusto && null != dadosMaterial.precoCusto) {
			var cPrecoCusto = Campos.materiais.precoCusto(indice);
			cPrecoCusto.val(dadosMaterial.precoCusto.replace(".",","));
		}
		
		if (undefined != dadosMaterial.unidadeMedida && null != dadosMaterial.unidadeMedida) {
			var cUnidadeMedidaBasica = Campos.materiais.unidadeMedidaBasica(indice);
			cUnidadeMedidaBasica.val(dadosMaterial.unidadeMedida);
		}
		
		this.montarListaUnidadeMedidaMaterial(indice);
	},
	
	removerMaterial: function(indice){
		
		this.limparDadosMaterial(indice);
		this.calcularValorTotal();
		this.calcularPesoBrutoTotal();
		this.calcularPesoLiquidoTotal();
	},
	
	limparDadosMaterial: function(indice){
		
		var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
		var cTipoMaterial = Campos.materiais.tipoMaterial(indice);
		var cDescricaoMaterial = Campos.materiais.descricaoMaterial(indice);
		var cQuantidade = Campos.materiais.quantidade(indice);
		var cLote = Campos.materiais.lote(indice);
		var cUnidadeMedida = Campos.materiais.unidadeMedida(indice);
		var cUnidadeMedidaBasica = Campos.materiais.unidadeMedidaBasica(indice);
		var cDeposito = Campos.materiais.deposito(indice);
		var cDescDeposito = Campos.materiais.descDeposito(indice);
		var cPesoBruto = Campos.materiais.pesoBruto(indice);
		var cPesoLiquido = Campos.materiais.pesoLiquido(indice);
		var cPrecoCusto = Campos.materiais.precoCusto(indice);
		var cValorUnitario = Campos.materiais.valorUnitario(indice);
		var cSubtotal = Campos.materiais.subtotal(indice);
		
		cCodigoMaterial.val("");
		cTipoMaterial.val("");
		cDescricaoMaterial.val("");
		cQuantidade.val("");
		cLote.val("");
		cUnidadeMedida.empty().append($("<option/>"));
		cUnidadeMedidaBasica.val("");
		cDeposito.val("");
		cDescDeposito.val("");
		cPesoBruto.val("");
		cPesoLiquido.val("");
		cPrecoCusto.val("");
		cValorUnitario.val("");
		cSubtotal.val("");
		
		Campos.habilitar(cCodigoMaterial);
		this.habilitarAutocompleteDescricaoMaterial(indice);
	},
	
	montarListaUnidadeMedidaMaterial: function(indice){
		
		var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
		var cUnidadeMedida = Campos.materiais.unidadeMedida(indice);
		var vCodigoMaterial = Campos.val(cCodigoMaterial);
		var vUnidadeMedidaSelecionada = Campos.val(cUnidadeMedida);
		var dadosUnidadeMedidaMaterial = Material.obterDadosUnidadeMedidaMaterial(vCodigoMaterial);
		
		cUnidadeMedida.empty().append($("<option/>"));
		
		if (null != dadosUnidadeMedidaMaterial) {
			
			$.each(dadosUnidadeMedidaMaterial, function(i, linhaUnidadeMedida) {
				
				var unidadeMedida = linhaUnidadeMedida.unidadeMedida;
				var contador = linhaUnidadeMedida.contador;
				var tagOption = $("<option/>").val(unidadeMedida).text(unidadeMedida).data("contador",contador);
				
				if (unidadeMedida == vUnidadeMedidaSelecionada) {
					tagOption.prop("selected",true);
				}
				
				cUnidadeMedida.append(tagOption);
			});
			
		} else {
			
			var cUnidadeMedidaBasica = Campos.materiais.unidadeMedidaBasica(indice);
			var vUnidadeMedidaBasica = Campos.val(cUnidadeMedidaBasica);
			
			var unidadeMedidaMeterial = Material.obterUnidadeMedidaMaterial(vCodigoMaterial,vUnidadeMedidaBasica);
			var contador = unidadeMedidaMeterial.contador;
			
			var tagOption = $("<option/>").val(vUnidadeMedidaBasica).text(vUnidadeMedidaBasica).data("contador",contador);
			
			if (vUnidadeMedidaBasica == vUnidadeMedidaSelecionada) {
				tagOption.prop("selected",true);
			}
			
			cUnidadeMedida.append(tagOption);
		}
	},
	
	habilitarAutocompleteDescricaoMaterial: function(indice){
		
		var $this = this;
		var cDescricaoMaterial = Campos.materiais.descricaoMaterial(indice);
		
		if (cDescricaoMaterial.is("input[type=text]")) {
			
			var nDescricaoMaterial = cDescricaoMaterial.attr("name");
			var acDescricaoMaterial = Campos.autocomplete[nDescricaoMaterial];
			
			Campos.habilitar(cDescricaoMaterial);
			
			if (undefined == acDescricaoMaterial || null == acDescricaoMaterial) {
				
				acDescricaoMaterial = FLUIGC.autocomplete(cDescricaoMaterial,{
					type: "autocomplete",
					displayKey: "descricaoMaterial",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
					        var materiais = Material.pesquisarDescricaoMaterial(q);
					        
					        $.each(materiais, function (i, material) {
					        	itens.push({
					        		codigoMaterial: material.codigoMaterial,
					        		descricaoMaterial: material.item			        		
				                });
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
					
					var material = event.item;
					var codigoMaterial = material.codigoMaterial;
					var dadosMaterial = Material.obterDadosMaterial(codigoMaterial);
					
					$this.selecionarMaterial({
						codigoMaterial: dadosMaterial.codigoMaterial,
						tipoMaterial: dadosMaterial.tipoMaterial,
						unidadeMedida: dadosMaterial.unidadeMedida,
						pesoBruto : dadosMaterial.pesoBruto,
						pesoLiquido : dadosMaterial.pesoLiquido,
						precoCusto : dadosMaterial.preco,
						valorUnitario : dadosMaterial.preco
					}, indice);
					
				}).on("change",function(){
					
					var descricaoMaterial = $(this).val().trim();
					
					if (descricaoMaterial == "") {
						$this.removerMaterial(indice);
					}
				});
			}
			
			Campos.autocomplete[nDescricaoMaterial] = acDescricaoMaterial;
		}
	},
	
	desabilitarAutocompleteDescricaoMaterial: function(indice){
		
		var cDescricaoMaterial = Campos.materiais.descricaoMaterial(indice);
		
		if (cDescricaoMaterial.is("input[type=text]")) {
			
			var nDescricaoMaterial = cDescricaoMaterial.attr("name");
			var acDescricaoMaterial = Campos.autocomplete[nDescricaoMaterial];
			
			Campos.desabilitar(cDescricaoMaterial);
			
			if (undefined != acDescricaoMaterial && null != acDescricaoMaterial) {
				acDescricaoMaterial.destroy();
				Campos.autocomplete[nDescricaoMaterial] = null;
			}
		}
	},
	
	habilitarAutocompleteDepositoMaterial: function(indice){
		
		var $this = this;
		var cDeposito = Campos.materiais.deposito(indice);
		
		if (cDeposito.is("input[type=text]")) {
			
			var nDeposito = cDeposito.attr("name");
			var acDeposito = Campos.autocomplete[nDeposito];
			
			Campos.habilitar(cDeposito);
			
			if (undefined == acDeposito || null == acDeposito) {
				
				acDeposito = FLUIGC.autocomplete(cDeposito,{
					type: "autocomplete",
					displayKey: "deposito",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
							var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
							var vCodigoMaterial = Campos.val(cCodigoMaterial);
					        var depositos = Material.pesquisarDepositoMaterial(vCodigoMaterial,q);
					        var incluidos = [];
					        
					        $.each(depositos, function (i, deposito) {
					        	if (incluidos.indexOf(deposito.deposito) == -1) {
					        		itens.push({
						        		deposito: deposito.deposito
					                });
					        	} 
					        	incluidos.push(deposito.deposito);
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
					
					var deposito = event.item.deposito;
					
					$this.selecionarDeposito(deposito,indice);
					
				}).on("change",function(){
					
					var deposito = $(this).val().trim();
					var cDescDeposito = Campos.materiais.descDeposito(indice);
					
					if (deposito == "") {
						cDescDeposito.val("");
					}
				});
			}
			
			Campos.autocomplete[nDeposito] = acDeposito;
		}
	},
	
	desabilitarAutocompleteDepositoMaterial: function(indice){
		
		var cDeposito = Campos.materiais.deposito(indice);
		
		if (cDeposito.is("input[type=text]")) {
			
			var nDeposito = cDeposito.attr("name");
			var acDeposito = Campos.autocomplete[nDeposito];
			
			Campos.desabilitar(cDeposito);
			
			if (undefined != acDeposito && null != acDeposito) {
				acDeposito.destroy();
				Campos.autocomplete[nDeposito] = null;
			}
		}
	},
	
	verificarCentroCusto: function(indice){
		
		var cCentroCusto = Campos.materiais.centroCusto(indice);
		var cElementoPEP = Campos.materiais.elementoPEP(indice);
		var vCentroCusto = Campos.val(cCentroCusto);
		
		if (vCentroCusto != "") {
			Campos.desabilitar(cElementoPEP);
		} else {
			Campos.habilitar(cElementoPEP);
		}
	},
	
	verificarElementoPEP: function(indice){
		
		var cElementoPEP = Campos.materiais.elementoPEP(indice);
		var cCentroCusto = Campos.materiais.centroCusto(indice);
		var vElementoPEP = $(cElementoPEP).val().trim();
		
		if (vElementoPEP != "") {
			Campos.desabilitar(cCentroCusto);
		} else {
			Campos.habilitar(cCentroCusto);
		}
	},
	
	verificarOrdemVendaRemessa: function(indice){
		
		var cOrdemVendaRemessa = Campos.materiais.ordemVendaRemessa(indice);
		var vOrdemVendaRemessa = Campos.val(cOrdemVendaRemessa);
		var ordemCriada = /^(Ordem Criada:)/.test(vOrdemVendaRemessa);
		
		if (vOrdemVendaRemessa != "" && ordemCriada) {
			this.desabilitarLinha(indice);
		}
	},
	
	verificarOrdensRemessa: function(){
		
		
		var $this = this;
		var linhas = this.obterTodasLinhas();
		var cAdmVendasMovimentacao = Campos.admVendasMovimentacao();
		var optExportarSap = $("option[value='Exportar SAP']",cAdmVendasMovimentacao);
		var optEmitirNotaFiscalPlanoCarga = $("option[value='Emitir Nota Fiscal/Plano de Carga']",cAdmVendasMovimentacao);
		var exportarSap = false;
		
		for (var i = 0; i < linhas.length; i++) {
			
			var indice = Campos.indice($(linhas[i]));
			var cOrdemVendaRemessa = Campos.materiais.ordemVendaRemessa(indice);
			var vOrdemVendaRemessa = Campos.val(cOrdemVendaRemessa);
			var ordemCriada = /^(Ordem Criada:)/.test(vOrdemVendaRemessa);
			
			if (!ordemCriada) {
				exportarSap = true;
				break;
			}
		}
		
		if (Processo.idFluxo() != "ADM03") {
			if (exportarSap) {
				optExportarSap.show();
				optEmitirNotaFiscalPlanoCarga.hide();
			} else {
				optExportarSap.hide();
				optEmitirNotaFiscalPlanoCarga.show();
			}
		}
	},
	
	verificarTipoOrdem: function(indice){
		
		var cTipoOrdem = Campos.tipoOrdem();
		var cValorUnitario = Campos.materiais.valorUnitario(indice);
		var vTipoOrdem = Campos.val(cTipoOrdem);
		
		if (/^(Y062|Y064|Y065|Y067|Y068|Y072|Y073|Y075|Z007|Z008|Z009|Z014|Z018|Z019|Z020|Z021|Z023)$/.test(vTipoOrdem)) {
			Campos.habilitar(cValorUnitario);
		} else {
			Campos.desabilitar(cValorUnitario);
		}
	},
	
	verificarProcesso: function(){
		
		var idFluxo = Processo.idFluxo();
		var ADM03 = idFluxo == "ADM03";
		var campos = ["lote","centroCusto","elementoPEP","precoCusto","valorUnitario"];
		
		campos.forEach(function(campo){
			$("[data-campo-tbl1=" + campo + "]").toggle(!ADM03);
		});
		
		$("[data-campo-tbl1=ordemVendaRemessa]").toggle(!ADM03);
		$("[data-campo-tbl1=nfeDeReferencia]").toggle(ADM03);
	},
	
	aplicarRegraCodigoMaterial: function(indice){
		
		var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
		var cValorUnitario = Campos.materiais.valorUnitario(indice);
		var vCodigoMaterial = Campos.val(cCodigoMaterial);
		
		// Solicitação do chamado 1504957
		if (vCodigoMaterial == "6006499") {
			Campos.habilitar(cValorUnitario);
		}
	},
	
	desabilitarLinha: function(indice){
		Campos.desabilitar(Campos.materiais.checkbox(indice));
		Campos.desabilitar(Campos.materiais.codigoBP(indice));
		Campos.desabilitar(Campos.materiais.canalDistribuicao(indice));
		Campos.desabilitar(Campos.materiais.codigoMaterial(indice));
		Campos.desabilitar(Campos.materiais.quantidade(indice));
		Campos.desabilitar(Campos.materiais.unidadeMedida(indice));
		Campos.desabilitar(Campos.materiais.deposito(indice));
		Campos.desabilitar(Campos.materiais.lote(indice));
		Campos.desabilitar(Campos.materiais.pesoBruto(indice));
		Campos.desabilitar(Campos.materiais.centroCusto(indice));
		Campos.desabilitar(Campos.materiais.elementoPEP(indice));
		Campos.desabilitar(Campos.materiais.precoCusto(indice));
		Campos.desabilitar(Campos.materiais.valorUnitario(indice));
		this.desabilitarAutocompleteDescricaoMaterial(indice);
		this.desabilitarAutocompleteDepositoMaterial(indice);
	},
	
	calcularSubtotal: function(indice){
		
		var cQuantidade = Campos.materiais.quantidade(indice);
		var cValorUnitario = Campos.materiais.valorUnitario(indice);
		var cSubtotal = Campos.materiais.subtotal(indice);
		var vQuantidade = Campos.val(cQuantidade);
		var vValorUnitario = Campos.val(cValorUnitario);
		var quantidade = parseInt(vQuantidade);
		var valorUnitario = parseFloat(vValorUnitario.replace(".","").replace(",","."));
		
		quantidade = !isNaN(quantidade) ? quantidade : 0;
		valorUnitario = !isNaN(valorUnitario) ? valorUnitario : 0;
		
		var subtotal = quantidade * valorUnitario;
		
		cSubtotal.val(subtotal.toFixed(2).replace(".",","));
		
		this.calcularValorTotal();
	},
	
	calcularValorTotal: function(){
		
		var linhas = this.obterTodasLinhas(true);
		var cValorTotal = Campos.materiais.valorTotal();
		var valorTotal = 0;
		
		$.each(linhas, function(){
			
			var indice = Campos.indice($(this));
			var cSubtotal = Campos.materiais.subtotal(indice);
			var vSubtotal = Campos.val(cSubtotal);
			var subtotal = parseFloat(vSubtotal.replace(".","").replace(",","."));
			
			valorTotal += !isNaN(subtotal) ? subtotal : 0;
		});
		
		cValorTotal.val(valorTotal.toFixed(2).replace(".",","));
	},
	
	calcularPesoBrutoTotal: function(){
		
		var cPesoBrutoTotal = Campos.materiais.pesoBrutoTotal();
		var pesoBrutoTotal = 0;
		var linhas = this.obterTodasLinhas(true);
		
		$.each(linhas, function(){
			
			var indice = Campos.indice($(this));
			var cPesoBruto = Campos.materiais.pesoBruto(indice);
			var cQuantidade = Campos.materiais.quantidade(indice);
			var vPesoBruto = Campos.val(cPesoBruto);
			var vQuantidade = Campos.val(cQuantidade);
			var pesoBruto = parseFloat(vPesoBruto.replace(".","").replace(",","."));
			var quantidade = parseInt(vQuantidade);
			var pesoBrutoTotalLinha = !isNaN(pesoBruto) ? pesoBruto : 0;
			
			quantidade = !isNaN(quantidade) ? quantidade : 0;
			pesoBrutoTotal += quantidade * pesoBrutoTotalLinha;
		});
		
		cPesoBrutoTotal.val(pesoBrutoTotal.toFixed(3).replace(".",","));
	},
	
	calcularPesoLiquidoTotal: function(){
		
		var cPesoLiquidoTotal = Campos.materiais.pesoLiquidoTotal();
		var pesoLiquidoTotal = 0;
		var linhas = this.obterTodasLinhas(true);
		
		$.each(linhas, function(){
			
			var indice = Campos.indice($(this));
			var cPesoLiquido = Campos.materiais.pesoLiquido(indice);
			var cQuantidade = Campos.materiais.quantidade(indice);
			var vPesoLiquido = Campos.val(cPesoLiquido);
			var vQuantidade = Campos.val(cQuantidade);
			var pesoLiquido = parseFloat(vPesoLiquido.replace(".","").replace(",","."));
			var quantidade = parseInt(vQuantidade);
			var pesoLiquidoTotalLinha = !isNaN(pesoLiquido) ? pesoLiquido : 0;
			
			quantidade = !isNaN(quantidade) ? quantidade : 0;
			pesoLiquidoTotal += quantidade * pesoLiquidoTotalLinha;
		});
		
		cPesoLiquidoTotal.val(pesoLiquidoTotal.toFixed(3).replace(".",","));
	},
	
	calcularValorUnitario: function(indice){
		
		var cUnidadeMedida = Campos.materiais.unidadeMedida(indice);
		var cTipoOrdem = Campos.tipoOrdem();
		var cPrecoCusto = Campos.materiais.precoCusto(indice);
		var cValorUnitario = Campos.materiais.valorUnitario(indice);
		var vPrecoCusto = Campos.val(cPrecoCusto);
		var vTipoOrdem = Campos.val(cTipoOrdem);
		
		var valorUnitario = 0;
		var contador = parseFloat(cUnidadeMedida.find("option:selected").data("contador"));
		var precoCusto = parseFloat(vPrecoCusto.replace(".","").replace(",","."));
		
		if (!isNaN(precoCusto) && !isNaN(contador)) {
			valorUnitario = precoCusto * contador;
		}
		
		cValorUnitario.val(vTipoOrdem == "Z009" ? "" : valorUnitario.toFixed(2).replace(".",","));
	},
	
	exibirImportacaoPlanilha: function(){
		$("[data-importacao-planilha]").show();
	},
	
	importarPlanilha: function(){
		
		var cImportacaoPlanilha = Campos.materiais.importacaoPlanilha();
		var vImportacaoPlanilha = Campos.val(cImportacaoPlanilha);
		
		if (vImportacaoPlanilha != "") {
			
			var dadosImportacao = vImportacaoPlanilha.split("\n");
			
			if (dadosImportacao.length > 0) {
				
				var camposPlanilha = Campos.planilha;
				var colunasImportacao = dadosImportacao[0].split("\t");
				var colunasModeloPlanila = Object.keys(camposPlanilha).map(function(item){
					return camposPlanilha[item];
				});
				var colunas = Util.arrayIntersection(colunasModeloPlanila,colunasImportacao);
				
				if (colunas.length > 0) {
					
					var $this = this;
					var loader = Util.loader($("[data-importacao-planilha]").parent().parent());
					
					loader.show();
					
					setTimeout(function(){
						
						for (var i = 1; i < dadosImportacao.length; i++) {
							
							var dadosLinha = dadosImportacao[i].split("\t");
							var indice = $this.adicionarLinha();
							
							for (var c in colunas) {
								
								var coluna = colunas[c];
								var vColuna = dadosLinha[c];
								
								if (coluna == camposPlanilha.codigoBP) {
									
									var cCodigoBP = Campos.materiais.codigoBP(indice);
									cCodigoBP.val(vColuna);
									
									$this.verificarCodigoBP(cCodigoBP);
									
								} else if (coluna == camposPlanilha.canalDistribuicao) {
									
									var cCanalDistribuicao = Campos.materiais.canalDistribuicao(indice);
									cCanalDistribuicao.val(vColuna);
									
									$this.selecionarCanalDistribuicao(cCanalDistribuicao);
									
								} else if (coluna == camposPlanilha.codigoMaterial) {
									
									var cCodigoMaterial = Campos.materiais.codigoMaterial(indice);
									cCodigoMaterial.val(vColuna);
									
									$this.verificarCodigoMaterial(cCodigoMaterial);
									
								} else if (coluna == camposPlanilha.quantidade) {
									
									var cQuantidade = Campos.materiais.quantidade(indice);
									cQuantidade.val(vColuna);
									
									$this.calcularSubtotal(indice);
									
								} else if (coluna == camposPlanilha.unidadeMedida) {
									
									var cUnidadeMedida = Campos.materiais.unidadeMedida(indice);
									cUnidadeMedida.val(vColuna);
									
								} else if (coluna == camposPlanilha.deposito) {
									
									var cDeposito = Campos.materiais.deposito(indice);
									cDeposito.val(vColuna);
									
									$this.selecionarDeposito(vColuna,indice);
									
								} else if (coluna == camposPlanilha.lote) {
									
									var cLote = Campos.materiais.lote(indice);
									cLote.val(vColuna);
									
								} else if (coluna == camposPlanilha.pesoBruto) {
									
									var cPesoBruto = Campos.materiais.pesoBruto(indice);
									cPesoBruto.val(vColuna);
									
								} else if (coluna == camposPlanilha.centroCusto) {
									
									var cCentroCusto = Campos.materiais.centroCusto(indice);
									cCentroCusto.val(vColuna);
									
									$this.verificarCentroCusto(indice);
									
								} else if (coluna == camposPlanilha.elementoPEP) {
									
									var cElementoPEP = Campos.materiais.elementoPEP(indice);
									cElementoPEP.val(vColuna);
									
									$this.verificarElementoPEP(indice);
									
								} else if (coluna == camposPlanilha.valorUnitario) {
									
									var tipoOrdem = Campos.val(Campos.tipoOrdem());
									var cValorUnitario = Campos.materiais.valorUnitario(indice);
									
									cValorUnitario.val(tipoOrdem == "Z009" ? "" : vColuna);
									
									$this.calcularSubtotal(indice);
								}
							}
							
							if (colunas.indexOf(camposPlanilha.valorUnitario) == -1) {
								$this.calcularValorUnitario(indice);
								$this.calcularSubtotal(indice);
							}
						}
						
						$this.calcularPesoBrutoTotal();
						$this.calcularPesoLiquidoTotal();
						
						cImportacaoPlanilha.val("");
						loader.hide();
						
					},500);
				}
			}
		}
	},
	
	exportar: function() {
		
	    var linhas = this.obterTodasLinhas(true);
	    
	    if (linhas.length > 0) {
	    	
	    	var seletor = "#tbl-exportar";
	    	var colunas = ["CÓDIGO DO MATERIAL", "DESCRIÇÃO", "LOTE", "DEPOSITO", "QTD", "VALOR UNITÁRIO", "SUBTOTAL"];
		    var dados = [];

		    $.each(linhas, function(){
		    	
				var indice = Campos.indice($(this));
				
				dados.push([
		            Campos.val(Campos.materiais.codigoMaterial(indice)),
		            Campos.val(Campos.materiais.descricaoMaterial(indice)),
		            Campos.val(Campos.materiais.lote(indice)),
		            Campos.val(Campos.materiais.deposito(indice)),
		            Campos.val(Campos.materiais.quantidade(indice)),
		            Campos.val(Campos.materiais.valorUnitario(indice)),
		            Campos.val(Campos.materiais.subtotal(indice))
	            ]);
			});
		    
		    var $table = $("<table/>");
		    var $caption = $("<caption/>").html("Exportar");
		    var $thead = $("<thead/>");
		    var $theadTr = $("<tr/>");
		    var $tbody = $("<tbody/>");
		    
		    for (var i = 0; i < colunas.length; i++) {
		    	
		    	var $theadTrTh = $("<th/>").html(colunas[i]);
		    	
		    	$theadTr.append($theadTrTh);
		    }
		    
		    $thead.append($theadTr);

		    for (var i = 0; i < dados.length; i++) {
		    	
		    	var $tbodyTr = $("<tr/>");
		        
		    	for (var j = 0; j < dados[i].length; j++) {
		    		
		        	var $tbodyTrTd = $("<td/>").html(dados[i][j]);
		        	
		        	$tbodyTr.append($tbodyTrTd);
		        }
		    	
		        $tbody.append($tbodyTr);
		    }
		    
		    $table.append($caption)
		          .append($thead)
		          .append($tbody)
		          .appendTo(seletor);
		    
		    $(seletor).tableExport({
		        type: 'excel',
		        escape: 'false'
		    });

		    $(seletor).empty();
	    }
	},
	
	selecionarTodos: function() {
		
		var cSelecionarTodos = Campos.selecionarTodos();
		
		$(Campos.materiais.seletorItens()).prop("checked",cSelecionarTodos.is(":checked"));
	},
	
	verificarSelecionarTodos: function() {
		
		var todosItens = $(Campos.materiais.seletorItens());
		var itensSelecionados = $(Campos.materiais.seletorItens() + ":checked");
		
		Campos.selecionarTodos().prop("checked",todosItens.length > 0 && itensSelecionados.length == todosItens.length);
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	setTimeout(function(){
		Materiais.inicializar();
	},1000);
});