var AjusteCarga = {

	inicializar: function() {
		
		var cCentroEmitente = Campos.centroEmitente();
		var cCentroDestinatario = Campos.centroDestinatario();
		
		this.inicializarAutocomplete(cCentroEmitente);
		this.inicializarAutocomplete(cCentroDestinatario);
	},
	
	inicializarAutocomplete: function(cCentro){
		
		var $this = this;
		
		if (cCentro.is("input[type=text]:not([readonly])")) {
			
			FLUIGC.autocomplete(cCentro,{
				type: "autocomplete",
				displayKey: "descricaoCentroEmissor",
				source:(function(){
					return function(q,cb){
						
						var itens = [];
				        var centros = $this.pesquisarCentroEmissor(q);
				        
				        $.each(centros, function (i, centro) {
				        	itens.push({
			                	descricaoCentroEmissor: centro.descricaoCentroEmissor,
			                	centroEmissor: centro.centroEmissor,
			                	codigoOrganizacaoVenda: centro.codigoOrganizacaoVenda,
			                	organizacaoVenda: centro.organizacaoVenda,
			                	localNegocio: centro.localNegocio
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
	
	pesquisarCentroEmissor: function(descricaoCentroEmissor){
		return Datasets.getRows(
    		Datasets.cadastroCentroEmissor,
    		null,
        	[["descricaoCentroEmissor",descricaoCentroEmissor,"must",true]],
        	null
        );
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	AjusteCarga.inicializar();
});