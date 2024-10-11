var Material = {
	
	tratarCodigoMaterial: function(codigoMaterial){
		return codigoMaterial.padStart(18,"0");
	},
	
	obterDadosMaterial: function(codigoMaterial){
		
		var material = Datasets.getRow(
			Datasets.hanaDadosGeraisMateriais,
			["codigoMaterial","tipoMaterial","item","unidadeMedida","pesoBruto","pesoLiquido"],
			[["codigoMaterial",this.tratarCodigoMaterial(codigoMaterial),"must"]],
			null
		);
		
		if (null != material) {
			
			var codigoMaterial = material.codigoMaterial;
			var avaliacaoMaterial = this.obterDadosAvaliacaoMaterial(codigoMaterial);
			
			material["preco"] = null != avaliacaoMaterial ? avaliacaoMaterial.preco : "";
		}
		
		return material;
	},
	
	obterDadosAvaliacaoMaterial: function(codigoMaterial){
		var vCentro = Campos.val(Campos.codigoCentroEmissor());

		return Datasets.getRow(
			Datasets.hanaAvaliacaoMateriais,
			null,
			[
				["codigoMaterial",this.tratarCodigoMaterial(codigoMaterial),"must"],
				["centro",vCentro,"must"]
			],
			null
		);
	},
	
	pesquisarDescricaoMaterial: function(descricaoMaterial){
		
		return Datasets.getRows(
			Datasets.hanaDadosGeraisMateriais,
			["codigoMaterial","item"],
			[
			 ["item",descricaoMaterial,"must",true],
			 ["sqlLimit",20,"must"]
			],
			null
		);
	},
	
	obterDadosCentroMaterial: function(codigoMaterial){
		return Datasets.getRows(
			Datasets.hanaCentroMateriais,
			null,
			[["codigoMaterial",this.tratarCodigoMaterial(codigoMaterial),"must"]],
			null
		);
	},
	
	pesquisarDepositoMaterial: function(codigoMaterial,deposito){
		
		return Datasets.getRows(
			Datasets.hanaCentroMateriais,
			["deposito"],
			[
			 ["codigoMaterial",this.tratarCodigoMaterial(codigoMaterial),"must"],
			 ["deposito",deposito,"must",true],
			 ["sqlLimit",20,"must"]
			],
			null
		);
	},
	
	obterDadosUnidadeMedidaMaterial: function(codigoMaterial){
		var unidadesMedida = Datasets.getRows(
			Datasets.hanaUnidMedidaMateriais,
			null,
			[
			 ["codigoMaterial",this.tratarCodigoMaterial(codigoMaterial),"must"]
			],
			null
		);
		
		if (null != unidadesMedida) {
			unidadesMedida = unidadesMedida.filter(function(item){
				return null != item.ean;
			});
		}
		
		return unidadesMedida.length > 0 ? unidadesMedida : null;
	},
	
	obterUnidadeMedidaMaterial: function(codigoMaterial,unidadeMedida){
		return Datasets.getRow(
			Datasets.hanaUnidMedidaMateriais,
			null,
			[
			 ["codigoMaterial",this.tratarCodigoMaterial(codigoMaterial),"must"],
			 ["unidadeMedida",unidadeMedida,"must"]
			],
			null
		);
	},
	
	obterDescricaoDeposito: function(deposito){
		
		return Datasets.getRow(
			Datasets.cadastroDeposito,
			null,
			[["deposito",deposito,"must"]],
			null
		);
	},
}