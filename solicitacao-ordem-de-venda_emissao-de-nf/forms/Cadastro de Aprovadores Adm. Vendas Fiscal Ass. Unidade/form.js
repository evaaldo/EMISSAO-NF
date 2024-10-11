var Formulario = {
	
	inicializar: function() {
		this.verificarAtividade();
		this.verificarTodasOrdens();
		this.verificarTipoAprovador();
		this.inicializarAutocompleteAprovador();
	},
	
	autocomplete : [],
	
	habilitarAutocompleteTipoOrdem: function(){
		
		var $this = this;
		var cTipoOrdem = $("#tipoOrdem");
		
		if (cTipoOrdem.is("input[type=text]")) {
			
			var nTipoOrdem = cTipoOrdem.attr("name");
			var acTipoOrdem = $this.autocomplete[nTipoOrdem];
			
			cTipoOrdem.prop("readonly",false);
			
			if (undefined == acTipoOrdem || null == acTipoOrdem) {
				
				acTipoOrdem = FLUIGC.autocomplete(cTipoOrdem,{
					type: "autocomplete",
					displayKey: "tipoOrdem",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
					        var tiposOrdem = $this.obterTiposOrdem(q);
					        
					        $.each(tiposOrdem, function (i, tipoOrdem) {
					        	itens.push({
					        		tipoOrdem: tipoOrdem.tipoOrdem
				                });
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
				}).on("change",function(){
				});
			}
			
			$this.autocomplete[nTipoOrdem] = acTipoOrdem;
		}
	},
	
	desabilitarAutocompleteTipoOrdem: function(){
		
		var cTipoOrdem = $("#tipoOrdem");
		
		if (cTipoOrdem.is("input[type=text]")) {
			
			var nTipoOrdem = cTipoOrdem.attr("name");
			var acTipoOrdem = this.autocomplete[nTipoOrdem];
			
			cTipoOrdem.prop("readonly",true);
			
			if (undefined != acTipoOrdem && null != acTipoOrdem) {
				acTipoOrdem.destroy();
				this.autocomplete[nTipoOrdem] = null;
			}
		}
	},
	
	clickTodasOrdens: function(){
		this.verificarTodasOrdens();
	},
	
	verificarTodasOrdens: function(){
		
		var cTodasOrdens = $("#todasOrdens");
		
		if (cTodasOrdens.is(":checked")) {
			this.desabilitarAutocompleteTipoOrdem();
		} else {
			this.habilitarAutocompleteTipoOrdem();
		}
	},
	
	inicializarAutocompleteAprovador: function(){
		
		var $this = this;
		var cAprovador = $("#aprovador");
		var cCodigoAprovador = $("#codAprovador");
		var cMatricula = $("#matricula");
		
		if (cAprovador.is("input[type=text]:not(readonly)")) {
			
			FLUIGC.autocomplete(cAprovador,{
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
				} else if (vTipoAprovador == "usuario") {
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
	},
	
	changeAtividade: function(){
		this.verificarAtividade();
	},
	
	verificarAtividade: function(){
		
		var cAtividade = $("#atividade");
		var vAtividade = cAtividade.is("select") ? cAtividade.val() : cAtividade.html();
		var admVendas = "Adm. de Vendas";
		
		$('[data-atividade="' + admVendas + '"]').toggle(vAtividade == admVendas);
	},
	
	verificarTipoAprovador: function(){
		
		var cTipoAprovador = $("input[name=tipoAprovador]:checked");
		var vTipoAprovador = cTipoAprovador.val();
		
		$("#campo-matricula").toggle(vTipoAprovador == "usuario");
	},
	
	clickTipoAprovador: function(){
		this.verificarTipoAprovador();
	},
	
	obterTiposOrdem: function(tipoOrdem){
		return DatasetFactory.getDataset(
    		"DSCadastroProcessoContaDespesaTipoOrdem",
    		["tipoOrdem"],
        	[DatasetFactory.createConstraint("tipoOrdem",tipoOrdem,tipoOrdem,ConstraintType.MUST,true)],
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