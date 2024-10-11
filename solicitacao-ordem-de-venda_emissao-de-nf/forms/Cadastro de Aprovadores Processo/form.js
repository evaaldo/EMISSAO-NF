var Formulario = {
	
	autocomplete: {},
	
	inicializar: function() {
		this.verificarTipoOrdem();
		this.verificarTipoAprovador();
		this.inicializarAutocompleteCentroEmissor();
		this.inicializarAutocompleteProcessos();
	},
	
	inicializarAutocompleteProcessos: function(){
		
		var $this = this;
		var cProcesso = $("#processo");
		
		if (cProcesso.is("input[type=text]:not([readonly])")) {
			
			var cIdFluxo = $("#idFluxo");
			var cTipoOrdem = $("#tipoOrdem");
			
			FLUIGC.autocomplete(cProcesso,{
				type: "autocomplete",
				displayKey: "processo",
				source:(function(){
					return function(q,cb){
						
						var itens = [];
				        var processos = $this.obterProcessos(q);
				        
				        $.each(processos, function (i, processo) {
				        	itens.push({
				        		processo: processo.processo,
				        		idFluxo: processo.idFluxo,
				        		tipoOrdem: processo.tipoOrdem
			                });
				        });
				        
				        cb(itens);
					}
				})()
					
			}).on("fluig.autocomplete.selected",function(event){
				
				cIdFluxo.val(event.item.idFluxo);
				cTipoOrdem.val(event.item.tipoOrdem);
				
				$this.limparCamposAprovadores();
				$this.verificarTipoOrdem();
				
			}).on("change",function(){
				
				if(cProcesso.val().trim() == ""){
				
					cIdFluxo.val("");
					cTipoOrdem.val("");
					
					$this.limparCamposAprovadores();
					$this.verificarTipoOrdem();
				}
			});
		}
	},
	
	limparCamposAprovadores: function(){
		$("#aprovador1,#codAprovador1").val("");
		$("#aprovadorTres,#codAprovadorTres").val("");
		$("#aprovadorRegional,#codAprovadorRegional").val("");
		$("#aprovadorGestaoAdmVendas,#codAprovadorGestaoAdmVendas").val("");
		$("#aprovadorTributario,#codAprovadorTributario").val("");
		$("#aprovadorZINFPositiveBrands,#codAprovadorZINFPositiveBrands").val("");
		$("#aprovadorZINFMarketing3C,#codAprovadorZINFMarketing3C").val("");
	},
	
	habilitarAutocompleteAprovador: function(cAprovador){
		
		var $this = this;
			
		if (cAprovador.is("input[type=text]")) {
			
			var nAprovador = cAprovador.attr("name");
			var acAprovador = this.autocomplete[nAprovador];
			
			cAprovador.prop("readonly",false);
			
			if (undefined == acAprovador || null == acAprovador) {
				
				var cCodigoAprovador = $(cAprovador.data("codigo-aprovador"));
				var cMatricula = $("#matricula");
				
				acAprovador = FLUIGC.autocomplete(cAprovador,{
					type: "autocomplete",
					displayKey: "nomeAprovador",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
							var cTipoAprovador = $("input[name=tipoAprovador]:checked");
							var vTipoAprovador = cTipoAprovador.val();
							var colunaCodigoAprovador,
								colunaNomeAprovador,
								aprovadores;
							
							if (vTipoAprovador == "usuario") {
								
								aprovadores = $this.obterUsuarios(q);
								colunaCodigoAprovador = "colleagueId";
								colunaNomeAprovador = "colleagueName";
								
							} else if (vTipoAprovador == "papel") {
								
								aprovadores = $this.obterPapeis(q);
								colunaCodigoAprovador = "roleId";
								colunaNomeAprovador = "roleDescription";
								
							} else if (vTipoAprovador == "grupo") {
								
								aprovadores = $this.obterGrupos(q);
								colunaCodigoAprovador = "groupId";
								colunaNomeAprovador = "groupDescription";
							}
							
							$.each(aprovadores, function (i, aprovador) {
					        	itens.push({
					        		codigoAprovador: aprovador[colunaCodigoAprovador],
					        		nomeAprovador: aprovador[colunaNomeAprovador]
				                });
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
					
					var codigoAprovador = event.item.codigoAprovador;
					var cTipoAprovador = $("[name=tipoAprovador]:checked");
					var vTipoAprovador = cTipoAprovador.val();
					
					if (vTipoAprovador == "papel") {
						codigoAprovador = "Pool:Role:" + codigoAprovador;
					} else if (vTipoAprovador == "grupo") {
						codigoAprovador = "Pool:Group:" + codigoAprovador;
					}  else if (vTipoAprovador == "usuario") {
						cMatricula.val(codigoAprovador);
					}
					
					cCodigoAprovador.val(codigoAprovador);
					
				}).on("change",function(){
					
					if(cAprovador.val().trim() == ""){
						cCodigoAprovador.val("");
						cMatricula.val("");
					}
				});
			}
			
			this.autocomplete[nAprovador] = acAprovador;
		}
	},
	
	desabilitarAutocompleteAprovador: function(cAprovador){
		
		if (cAprovador.is("input[type=text]")) {
			
			var nAprovador = cAprovador.attr("name");
			var acAprovador = this.autocomplete[nAprovador];
			
			cAprovador.prop("readonly",true);
			
			if (undefined != acAprovador && null != acAprovador) {
				acAprovador.destroy();
				this.autocomplete[nAprovador] = null;
			}
		}
	},
	
	inicializarAutocompleteCentroEmissor: function(){
		
		var $this = this;
		var cCentroEmissor = $("#centroEmissor");
		
		if (cCentroEmissor.is("input[type=text]:not([readonly])")) {
			
			FLUIGC.autocomplete(cCentroEmissor,{
				type: "autocomplete",
				displayKey: "descricaoCentroEmissor",
				source:(function(){
					return function(q,cb){
						
						var itens = [];
				        var centros = $this.obterCentros(q);
				        
				        $.each(centros, function (i, centro) {
				        	itens.push({
				        		descricaoCentroEmissor: centro.descricaoCentroEmissor
			                });
				        });
				        
				        cb(itens);
					}
				})()
					
			}).on("fluig.autocomplete.selected",function(event){
			}).on("change",function(){
			});
		}
	},
	
	selecionarTipoOrdem: function(){
		this.verificarTipoOrdem();
	},
	
	verificarTipoOrdem: function(){
		
		var cTipoOrdem = $("#tipoOrdem");
		var vTipoOrdem = (cTipoOrdem.is("input") ? cTipoOrdem.val() : cTipoOrdem.html()).trim();
		
		var cAprovador1 = $("#aprovador1");
		var cAprovadorTres = $("#aprovadorTres");
		var cAprovadorRegional = $("#aprovadorRegional");
		var cAprovadorGestaoAdmVendas = $("#aprovadorGestaoAdmVendas");
		var cAprovadorZINFPositiveBrands = $("#aprovadorZINFPositiveBrands");
		var cAprovadorZINFMarketing3C = $("#aprovadorZINFMarketing3C");
		var cAprovadorTributario = $("#aprovadorTributario");
		
		this.desabilitarAutocompleteAprovador(cAprovador1);
		this.desabilitarAutocompleteAprovador(cAprovadorTres);
		this.desabilitarAutocompleteAprovador(cAprovadorRegional);
		this.desabilitarAutocompleteAprovador(cAprovadorGestaoAdmVendas);
		this.desabilitarAutocompleteAprovador(cAprovadorZINFPositiveBrands);
		this.desabilitarAutocompleteAprovador(cAprovadorZINFMarketing3C);
		this.desabilitarAutocompleteAprovador(cAprovadorTributario);
		
		if (vTipoOrdem == "Y062") {
			
			this.habilitarAutocompleteAprovador(cAprovadorTres);
			this.habilitarAutocompleteAprovador(cAprovadorRegional);
			this.habilitarAutocompleteAprovador(cAprovadorGestaoAdmVendas);
			
		} else if (/^(Y006|Y029)$/.test(vTipoOrdem)) {
			
			this.habilitarAutocompleteAprovador(cAprovadorZINFPositiveBrands);
			this.habilitarAutocompleteAprovador(cAprovadorZINFMarketing3C);
						
		} else if (/^(Y024|Y025)$/.test(vTipoOrdem)) {
			
			this.habilitarAutocompleteAprovador(cAprovadorTributario);
			this.habilitarAutocompleteAprovador(cAprovador1);
			
		} else if (vTipoOrdem != "") {
			
			this.habilitarAutocompleteAprovador(cAprovador1);
		}
	},
	
	verificarTipoAprovador: function(){
		
		var cTipoAprovador = $("input[name=tipoAprovador]:checked");
		var vTipoAprovador = cTipoAprovador.val();
		
		$("#campo-matricula").toggle(vTipoAprovador == "usuario");
	},
	
	clickTipoAprovador: function(){
		this.verificarTipoAprovador();
	},
	
	obterProcessos: function(processo){
		return DatasetFactory.getDataset(
    		"DSCadastroProcessoContaDespesaTipoOrdem",
    		["processo","idFluxo","tipoOrdem"],
        	[DatasetFactory.createConstraint("processo",processo,processo,ConstraintType.MUST,true)],
        	null
        ).values;
	},
	
	obterCentros: function(descricaoCentro){
		return DatasetFactory.getDataset(
    		"DSCadastroCentroEmissorOrganizacaoVendaLocalNegocio",
    		["descricaoCentroEmissor"],
        	[DatasetFactory.createConstraint("descricaoCentroEmissor",descricaoCentro,descricaoCentro,ConstraintType.MUST,true)],
        	null
        ).values;
	},
	
	obterUsuarios: function(nome){
		return DatasetFactory.getDataset(
    		"colleague",
    		["colleagueId","colleagueName"],
        	[
        	 DatasetFactory.createConstraint("colleagueName",nome,nome,ConstraintType.MUST,true),
        	 DatasetFactory.createConstraint("sqlLimit",20,20,ConstraintType.MUST)
        	],
        	null
        ).values;
	},
	
	obterPapeis: function(papel){
		return DatasetFactory.getDataset(
    		"workflowRole",
    		["roleId","roleDescription"],
        	[
        	 DatasetFactory.createConstraint("roleDescription",papel,papel,ConstraintType.MUST,true),
        	 DatasetFactory.createConstraint("sqlLimit",20,20,ConstraintType.MUST)
        	],
        	null
        ).values;
	},
	
	obterGrupos: function(grupo){
		return DatasetFactory.getDataset(
    		"group",
    		["groupId","groupDescription"],
        	[
        	 DatasetFactory.createConstraint("groupDescription",grupo,grupo,ConstraintType.MUST,true),
        	 DatasetFactory.createConstraint("sqlLimit",20,20,ConstraintType.MUST)
        	],
        	null
        ).values;
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	Formulario.inicializar();
});