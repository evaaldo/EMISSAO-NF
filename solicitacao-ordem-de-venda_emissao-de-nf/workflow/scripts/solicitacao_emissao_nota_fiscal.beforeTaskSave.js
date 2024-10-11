function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var numState = getValue("WKNumState");
	var idFluxo = hAPI.getCardValue("idFluxo");
	var tipoOrdem = hAPI.getCardValue("tipoOrdem");
	var anexos = hAPI.listAttachments();
	var totalAnexos = anexos.size();
	var anexado;
	
	if (/^(Y024|Y025)$/.test(tipoOrdem) && totalAnexos < 1) {
		throw "Por favor, anexar a documentação para análise tributária.";
	}
	
	if (/^(0|4|29)$/.test(numState) && idFluxo == "ADM03") {
		
		var regex = new RegExp("Nota Fiscal","i");
		anexado = false;
		
		for (var i = 0; i < totalAnexos; i++) {
			if (regex.test(anexos.get(i).getDocumentDescription())) {
				anexado = true;
				break;
	        }
		}
		
		if (!anexado) {
			throw "Obrigatório o anexo da Nota Fiscal.";
		}
		
	} else if (numState == 36 && idFluxo == "FISC00") {
		
		var regex = new RegExp("Relatório NF","i");
		anexado = false;
		
		for (var i = 0; i < totalAnexos; i++) {
			if (regex.test(anexos.get(i).getDocumentDescription())) {
				anexado = true;
				break;
	        }
		}
		
		if (!anexado) {
			throw "Obrigatório o anexo do Relatório NF.";
		}
	}
}