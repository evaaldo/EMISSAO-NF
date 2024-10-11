var CentroEmissor = {
		
	inicializar: function(){
		this.inicializarAutocompleteCentroEmissor();
	},
	
	centroSelecionado: null,
	
	preencherCamposCentroEmissor: function(dadosCentroEmissor){
		
		if (undefined != dadosCentroEmissor.centroEmissor && null != dadosCentroEmissor.centroEmissor) {
			var cCodigoCentroEmissor = Campos.codigoCentroEmissor();
			cCodigoCentroEmissor.val(dadosCentroEmissor.centroEmissor);
		}
		
		if (undefined != dadosCentroEmissor.codigoOrganizacaoVenda && null != dadosCentroEmissor.codigoOrganizacaoVenda) {
			var cCodigoOrganizacaoVendas = Campos.codigoOrganizacaoVendas();
			cCodigoOrganizacaoVendas.val(dadosCentroEmissor.codigoOrganizacaoVenda);
		}
		
		if (undefined != dadosCentroEmissor.organizacaoVenda && null != dadosCentroEmissor.organizacaoVenda) {
			var cOrganizacaoVendas = Campos.organizacaoVendas();
			cOrganizacaoVendas.val(dadosCentroEmissor.organizacaoVenda);
		}
		
		if (undefined != dadosCentroEmissor.localNegocio && null != dadosCentroEmissor.localNegocio) {
			var cLocalNegocio = Campos.localNegocio();
			cLocalNegocio.val(dadosCentroEmissor.localNegocio);
		}
	},
	
	limparCamposCentroEmissor: function(){
		
		var cCodigoCentroEmissor = Campos.codigoCentroEmissor();
		var cCodigoOrganizacaoVendas = Campos.codigoOrganizacaoVendas();
		var cOrganizacaoVendas = Campos.organizacaoVendas();
		var cLocalNegocio = Campos.localNegocio();
		
		cCodigoCentroEmissor.val("");
		cCodigoOrganizacaoVendas.val("");
		cOrganizacaoVendas.val("");
		cLocalNegocio.val("");
	},
	
	selecionarCentroEmissor: function(dadosCentro){
		var centro = {
            descricaoCentroEmissor : dadosCentro.descricaoCentroEmissor,
			centroEmissor : dadosCentro.centroEmissor,
			codigoOrganizacaoVenda : dadosCentro.codigoOrganizacaoVenda,
			organizacaoVenda : dadosCentro.organizacaoVenda,
			localNegocio : dadosCentro.localNegocio
		}
		this.preencherCamposCentroEmissor(centro);
		this.centroSelecionado = centro;
	},
	
	removerCentroEmissor: function(){
		this.limparCamposCentroEmissor();
		this.centroSelecionado = null;
	},
	
	inicializarAutocompleteCentroEmissor: function(){
		
		var $this = this;
		var cIdentificacaoCentroEmissor = Campos.identificacaoCentroEmissor();
		
		if (cIdentificacaoCentroEmissor.is("input[type=text]:not([readonly])")) {
			
			FLUIGC.autocomplete(cIdentificacaoCentroEmissor,{
				type: "autocomplete",
				displayKey: "descricaoCentroEmissor",
				source:(function(){
					return function(q,cb){
						
						var itens = [];
				        var centros = $this.pesquisarCentroEmissor(q);
				        var regexpCod = new RegExp("^" + q + ".*$");
				        var regexpDesc = new RegExp(q + ".*$","i");
				        
				        $.each(centros, function (i, centro) {
				        	if (regexpCod.test(centro.centroEmissor) || regexpDesc.test(centro.descricaoCentroEmissor)) {
				        		itens.push({
				                	descricaoCentroEmissor: centro.descricaoCentroEmissor,
				                	centroEmissor: centro.centroEmissor,
				                	codigoOrganizacaoVenda: centro.codigoOrganizacaoVenda,
				                	organizacaoVenda: centro.organizacaoVenda,
				                	localNegocio: centro.localNegocio
				                });
				        	}
				        });
				        
				        cb(itens);
					}
				})()
					
			}).on("fluig.autocomplete.selected",function(event){
				
				var dadosCentroEmissor = event.item;
				
				$this.selecionarCentroEmissor(dadosCentroEmissor);
				
			}).on("change",function(event){
				
				var identificacaoCentroEmissor = $(this).val();
				var centroSelecionado = $this.centroSelecionado;
				var centroValido = false;
				
				if (null != centroSelecionado) {
					var regex = new RegExp("^(" + centroSelecionado.centroEmissor + "|" + centroSelecionado.descricaoCentroEmissor + ")$");
					centroValido = regex.test(identificacaoCentroEmissor); 
				}
				
				if (null == centroSelecionado || identificacaoCentroEmissor.trim() == "" || !centroValido) {
					$this.removerCentroEmissor();
				}
			});
		}
	},
	
	pesquisarCentroEmissor: function(pesquisa){
		return Datasets.getRows(
    		Datasets.cadastroCentroEmissor,
    		null,
        	[
        	 ["centroEmissor",pesquisa,"should",true],
        	 ["descricaoCentroEmissor",pesquisa,"should",true]
        	],
        	null
        );
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	CentroEmissor.inicializar();
});