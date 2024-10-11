var Formulario = {
	
	verificarCodigoBP: function(){
	
		var campos = {
			codigoBP : $("#codigoBP"),
			razaoSocial : $("#razaoSocial"),
			tipoPn : $("#tipoPn")
		}
		
		var codigoParceiro = campos.codigoBP.val().trim();
		
		campos.razaoSocial.val("");
		campos.tipoPn.val("");
		
		if (codigoParceiro != "") {
			
			codigoParceiro = codigoParceiro.padStart(10,"0");
			
			var dsDadosBasicos = DatasetFactory.getDataset(
				"Hana_ConsultarBP",
				["razaoSocial","tipoPn"],
				[
				 	DatasetFactory.createConstraint("TipoBP","Transportadora",tipoPn,ConstraintType.MUST),
				    DatasetFactory.createConstraint("codigoParceiro",codigoParceiro,codigoParceiro,ConstraintType.MUST)
				],
				null
			).values;
			
			if (undefined != dsDadosBasicos && dsDadosBasicos.length > 0) {
				
				var dadosBasicos = dsDadosBasicos[0];
				
				campos.razaoSocial.val(dadosBasicos.razaoSocial);
				campos.tipoPn.val(dadosBasicos.tipoPn);
				
			} else {
				campos.codigoBP.val("");
			}
		}
	}
}