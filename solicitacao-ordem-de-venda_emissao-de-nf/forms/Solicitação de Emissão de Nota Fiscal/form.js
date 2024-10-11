var Formulario = {

	formMode: null,
	numState: null,

	inicializar: function() {
		if (this.formMode == "ADD") {
			this.preencherCamposSolicitacao();
		}
	},
	
	nomeSolicitante: function(){
		return parent.WCMAPI.getUser();
	},
	
	codigoSolicitante: function(){
		return parent.WCMAPI.getUserCode();
	},
	
	preencherCamposSolicitacao: function(){
		
		var matriculaSolicitante = this.codigoSolicitante();
		var nomeSolicitante = this.nomeSolicitante();
		var dadosBPSolicitante = BP.obterDadosSolicitantePorMatricula(matriculaSolicitante);
		var dataSolicitacao = Util.formatarData(new Date());
		var cNomeSolicitante = Campos.nomeSolicitante(); 
		var cMatriculaSolicitante = Campos.matriculaSolicitante();
		var cCodigoBPSolicitante = Campos.codigoBPSolicitante();
		var cDataSolicitacao = Campos.dataSolicitacao();
		
		cMatriculaSolicitante.val(matriculaSolicitante);
		cNomeSolicitante.val(nomeSolicitante);
		cDataSolicitacao.val(dataSolicitacao);
		
		if (null != dadosBPSolicitante) {
			cCodigoBPSolicitante.val(dadosBPSolicitante.codigoParceiro);
		}
	},
	
	abrirAbaAnexo: function(botao){
		JSInterface.showCamera($(botao).data("nomeanexo"));
		parent.document.getElementById("tab-attachments").click();
	}
}

var beforeSendValidate = function(numState, nextState) {
    $("#nextState").val(nextState);

    var camposIncorretos = [];

	// Verifica se os campos com classe "obrigatorio" estão preenchidos. Caso não, é adicionado HTML de erro e classe "has-validator-error".
    $("form").find('.obrigatorio').each(function() {
        var id = $(this).attr("id");

		if(id.includes("___") && !id.includes("_tbl1")) {
			Validator.verificarValidacoes($(this), id);
		}
    });

	// Verifica se existe algum campo com a classe "has-validator-error". Caso sim, é adicionado ao array de campos incorretos.
    $("form").find("input, select, textarea").each(function() {
        if ($(this).hasClass("has-validator-error")) {
            var inputId = $(this).attr("id");

            camposIncorretos.push(inputId);
        }
    });

    if (camposIncorretos.length > 0) {
		for (let i = camposIncorretos.length - 1; i >= 0; i--) {
			let campo = camposIncorretos[i];
			// Verifica se o campo é elemento PEP ou CC
			if (campo.includes("tbl1_elementoPEP___") || campo.includes("tbl1_centroCusto___")) {
				let indice = campo.split("___")[1];
				
				// Verifica se o campo elemento PEP ou o campo CC está preenchido
				if ($("#tbl1_elementoPEP___" + indice).val() != "" || $("#tbl1_centroCusto___" + indice).val() != "") {
					// Caso algum esteja preenchido, remove o erro de ambos
					if($("#" + campo).val() == "") {
						Validator.removerErro($("#" + campo))
						camposIncorretos.splice(i, 1);
					}
				}
			}
		}
	
		if (camposIncorretos.length > 0) {
			Util.alertaAmigavelHTML("error", "Campos incorretos", "Revise os campos que apresentam erro em sua estrutura");
			return false;
		}
	}
	
};


document.addEventListener("DOMContentLoaded", function(event){
	Formulario.inicializar();
});