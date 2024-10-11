var Fiscal = {

	inicializar: function() {
		this.toggleBotaoAnexoRelatorioNF();
	},
	
	toggleBotaoAnexoRelatorioNF: function(){
		
		var formMode = Formulario.formMode;
		var numState = Formulario.numState;
		var idFluxo = Processo.idFluxo();
		
		$("[data-btn-anexorelatorionf]").toggle(idFluxo == "FISC00" && formMode != "VIEW" && numState == 36);
	},
}

document.addEventListener("DOMContentLoaded", function(event){
	Fiscal.inicializar();
});