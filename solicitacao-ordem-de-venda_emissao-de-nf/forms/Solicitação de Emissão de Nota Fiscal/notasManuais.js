var NotasManuais = {

	inicializar: function() {
		this.toggleBotoes();
	},
	
	adicionarLinha: function() {
		wdkAddChild(Campos.tblNotasManuais);
	},
	
	toggleBotoes: function(){
		
		var formMode = Formulario.formMode;
		var numState = Formulario.numState;
		
		$("[data-btn-notasmanuais]").toggle(formMode != "VIEW" && /^(0|4|29|36)$/.test(numState));
	},
	
	removerLinha: function(linha){
		
		FLUIGC.message.confirm({
    		message  : "Deseja remover as informações?",
    		title    : "Remover",
    		labelYes : "Remover",
    		labelNo  : "Cancelar"
    	}, function(result, el, ev) {
    		
    		if (result) {
				fnWdkRemoveChild(linha);
    		}
    	});
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	setTimeout(function(){
		NotasManuais.inicializar();
	},1000);
});