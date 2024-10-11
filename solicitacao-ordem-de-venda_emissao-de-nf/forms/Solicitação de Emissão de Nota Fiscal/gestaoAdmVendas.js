var GestaoAdmVendas = {

	inicializar: function() {
		this.verificarAprovadores();
	},
	
	habilitarAutocompleteAprovadorTres: function(){
		
		var $this = this;
		var cAprovadorTres = Campos.aprovadorTres();
		
		if (cAprovadorTres.is("input[type=text]")) {
			
			var nAprovadorTres = cAprovadorTres.attr("name");
			var acAprovadorTres = Campos.autocomplete[nAprovadorTres];
			
			Campos.habilitar(cAprovadorTres);
			
			if (undefined == acAprovadorTres || null == acAprovadorTres) {
				
				var cCodAprovadorTres = Campos.codAprovadorTres();
				
				acAprovadorTres = FLUIGC.autocomplete(cAprovadorTres,{
					type: "autocomplete",
					displayKey: "aprovadorTres",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
					        var aprovadores = $this.obterAprovadoresTres(q);
					        
					        $.each(aprovadores, function (i, aprovador) {
					        	itens.push({
					        		aprovadorTres: aprovador.aprovadorTres,
					        		codAprovadorTres: aprovador.codAprovadorTres
				                });
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
					
					$this.selecionarAprovadorTres({
						codAprovadorTres: event.item.codAprovadorTres
					});
					
				}).on("change",function(){
					
					var vAprovadorTres = Campos.val(cAprovadorTres);
					
					if (vAprovadorTres == "") {
						$this.removerAprovadorTres();
					}
				});
			}
			
			Campos.autocomplete[nAprovadorTres] = acAprovadorTres;
		}
	},
	
	habilitarAutocompleteAprovadorRegional: function(){
		
		var $this = this;
		var cAprovadorRegional = Campos.aprovadorRegional();
		
		if (cAprovadorRegional.is("input[type=text]")) {
			
			var nAprovadorRegional = cAprovadorRegional.attr("name");
			var acAprovadorRegional = Campos.autocomplete[nAprovadorRegional];
			
			Campos.habilitar(cAprovadorRegional);
			
			if (undefined == acAprovadorRegional || null == acAprovadorRegional) {
				
				var cCodAprovadorRegional = Campos.codAprovadorRegional();
				
				acAprovadorRegional = FLUIGC.autocomplete(cAprovadorRegional,{
					type: "autocomplete",
					displayKey: "aprovadorRegional",
					source:(function(){
						return function(q,cb){
							
							var itens = [];
					        var aprovadores = $this.obterAprovadoresRegional(q);
					        
					        $.each(aprovadores, function (i, aprovador) {
					        	itens.push({
					        		aprovadorRegional: aprovador.aprovadorRegional,
					        		codAprovadorRegional: aprovador.codAprovadorRegional
				                });
					        });
					        
					        cb(itens);
						}
					})()
						
				}).on("fluig.autocomplete.selected",function(event){
					
					$this.selecionarAprovadorRegional({
						codAprovadorRegional: event.item.codAprovadorRegional
					});
					
				}).on("change",function(){
					
					var vAprovadorRegional = Campos.val(cAprovadorRegional);
					
					if (vAprovadorRegional == "") {
						$this.removerAprovadorRegional();
					}
				});
			}
			
			Campos.autocomplete[nAprovadorRegional] = acAprovadorRegional;
		}
	},
	
	desabilitarAutocompleteAprovadorTres: function(){
		
		var cAprovadorTres = Campos.aprovadorTres();
		
		if (cAprovadorTres.is("input[type=text]")) {
			
			var nAprovadorTres = cAprovadorTres.attr("name");
			var acAprovadorTres = Campos.autocomplete[nAprovadorTres];
			
			Campos.desabilitar(cAprovadorTres);
			
			if (undefined != acAprovadorTres && null != acAprovadorTres) {
				acAprovadorTres.destroy();
				Campos.autocomplete[nAprovadorTres] = null;
			}
		}
	},
	
	desabilitarAutocompleteAprovadorRegional: function(){
		
		var cAprovadorRegional = Campos.aprovadorRegional();
		
		if (cAprovadorRegional.is("input[type=text]")) {
			
			var nAprovadorRegional = cAprovadorRegional.attr("name");
			var acAprovadorRegional = Campos.autocomplete[nAprovadorRegional];
			
			Campos.desabilitar(cAprovadorRegional);
			
			if (undefined != acAprovadorRegional && null != acAprovadorRegional) {
				acAprovadorRegional.destroy();
				Campos.autocomplete[nAprovadorRegional] = null;
			}
		}
	},
	
	selecionarAprovadorTres: function(dadosAprovadorTres){
		this.preencherCamposAprovadorTres(dadosAprovadorTres);
		this.removerAprovadorRegional();
	},
	
	selecionarAprovadorRegional: function(dadosAprovadorRegional){
		this.preencherCamposAprovadorRegional(dadosAprovadorRegional);
		this.removerAprovadorTres();
	},
	
	preencherCamposAprovadorTres: function(dadosAprovadorTres){
		
		if (undefined != dadosAprovadorTres.codAprovadorTres && null != dadosAprovadorTres.codAprovadorTres) {
			var cCodAprovadorTres = Campos.codAprovadorTres();
			cCodAprovadorTres.val(dadosAprovadorTres.codAprovadorTres);
		}
	},
	
	preencherCamposAprovadorRegional: function(dadosAprovadorRegional){
		
		if (undefined != dadosAprovadorRegional.codAprovadorRegional && null != dadosAprovadorRegional.codAprovadorRegional) {
			var cCodAprovadorRegional = Campos.codAprovadorRegional();
			cCodAprovadorRegional.val(dadosAprovadorRegional.codAprovadorRegional);
		}
	},
	
	removerAprovadorTres: function(){
		this.limparCamposAprovadorTres();
		this.verificarAprovadores();
	},
	
	removerAprovadorRegional: function(){
		this.limparCamposAprovadorRegional();
		this.verificarAprovadores();
	},
	
	limparCamposAprovadorTres: function(){
		
		var cAprovadorTres = Campos.aprovadorTres();
		var cCodAprovadorTres = Campos.codAprovadorTres();
		
		cAprovadorTres.val("");
		cCodAprovadorTres.val("");
	},
	
	limparCamposAprovadorRegional: function(){
		
		var cAprovadorRegional = Campos.aprovadorRegional();
		var cCodAprovadorRegional = Campos.codAprovadorRegional();
		
		cAprovadorRegional.val("");
		cCodAprovadorRegional.val("");
	},
	
	verificarAprovadores: function(){
		
		var cAprovadorTres = Campos.aprovadorTres();
		var cAprovadorRegional = Campos.aprovadorRegional();
		var vAprovadorTres = Campos.val(cAprovadorTres);
		var vAprovadorRegional = Campos.val(cAprovadorRegional);
		
		if (vAprovadorTres == "" && vAprovadorRegional == "") {
			
			this.habilitarAutocompleteAprovadorTres();
			this.habilitarAutocompleteAprovadorRegional();
			
		} else if (vAprovadorTres != "") {
			
			this.habilitarAutocompleteAprovadorTres();
			this.desabilitarAutocompleteAprovadorRegional();
			
		} else if (vAprovadorRegional != ""){
			
			this.habilitarAutocompleteAprovadorRegional();
			this.desabilitarAutocompleteAprovadorTres();
		}
	},
	
	obterAprovadoresTres: function(aprovadorTres){
		return this.obterAprovadores({
			campoNomeAprovador: "aprovadorTres",
			campoCodigoAprovador: "codAprovadorTres",
			nomeAprovador: aprovadorTres
		});
	},
	
	obterAprovadoresRegional: function(aprovadorRegional){
		return this.obterAprovadores({
			campoNomeAprovador: "aprovadorRegional",
			campoCodigoAprovador: "codAprovadorRegional",
			nomeAprovador: aprovadorRegional
		});
	},
	
	obterAprovadores: function(parametros){
		
		var cCodigoCentroEmissor = Campos.codigoCentroEmissor();
		var cTipoOrdem = Campos.tipoOrdem();
		var vCodigoCentroEmissor = Campos.val(cCodigoCentroEmissor);
		var vTipoOrdem = Campos.val(cTipoOrdem);
		
		return Datasets.getRows(
    		Datasets.cadastroAprovadoresProcesso,
    		[parametros.campoNomeAprovador,parametros.campoCodigoAprovador],
        	[
        	 ["centroEmissor",vCodigoCentroEmissor,"must"],
        	 ["tipoOrdem",vTipoOrdem,"must"],
        	 [parametros.campoNomeAprovador,parametros.nomeAprovador,"must",true],
        	 ["sqlLimit",20,"must"]
        	],
        	null
        );
	},
}

document.addEventListener("DOMContentLoaded", function(event){
	GestaoAdmVendas.inicializar();
});