var BP = {

	tipoBP : {
		Colaborador : "Colaborador",
		Motorista : "Motorista",
		Transportadora : "Transportadora",
		Cliente : "Cliente"
	},
	
	tratarCodigoBP: function(codigoBP){
		return codigoBP.padStart(10,"0");
	},
	
	obterDadosBPPorCodigo: function(codigoBP,tipoBP,mostrarDetalhes){
		
		var constraints = [["TipoBP",tipoBP,"must"]];
		
		if (null != mostrarDetalhes && mostrarDetalhes) {
			constraints.push(["MostrarBPDetalhes",true,"must"]);
		}
		
		constraints.push(["codigoParceiro",this.tratarCodigoBP(codigoBP),"must"]);
		
		return Datasets.getRow(Datasets.hanaConsultarBP,null,constraints,null);
	},
	
	obterDadosOrganizacaoVendaBP: function(codigoBP){
		
		return Datasets.getRows(
			Datasets.hanaConsultarBP,
			null,
			[
			 	["TipoBP","BPAreaDeVendas","must"],
			    ["codigoParceiro",this.tratarCodigoBP(codigoBP),"must"]
			],
			null
		);
	},
	
	obterIdentificacaoBPPorMatricula: function(matricula){
		
		return Datasets.getRow(
			Datasets.hanaConsultarBP,
			["codigoParceiro"],
			[
			 	["TipoBP","BPIdentificacao","must"],
			    ["tipoIdentificacao","MATRIC","must"],
			    ["valorIdentificacao",matricula,"must"],
			],
			null
		);
	},
	
	obterMatriculaBPPorCodigo: function(codigoBP){
		
		return Datasets.getRow(
			Datasets.hanaConsultarBP,
			["valorIdentificacao"],
			[
			 	["TipoBP","BPIdentificacao","must"],
			    ["tipoIdentificacao","MATRIC","must"],
			    ["codigoParceiro",this.tratarCodigoBP(codigoBP),"must"],
			],
			null
		);
	},
	
	obterDadosBPPorMatricula: function(matricula,tipoBP,mostrarDetalhes){
		
		var dadosBP = null;
		var identificacaoBP = this.obterIdentificacaoBPPorMatricula(matricula);
		
		if (null != identificacaoBP) {
			dadosBP = this.obterDadosBPPorCodigo(identificacaoBP.codigoParceiro,tipoBP,mostrarDetalhes);
		}
		
		return dadosBP;
	},
	
	obterDadosSolicitantePorMatricula: function(matriculaSolicitante){
	
		return this.obterDadosBPPorMatricula(matriculaSolicitante,this.tipoBP.Colaborador);
	},
	
	obterDadosMotoristaPorMatricula: function(matriculaMotorista){
		
		return this.obterDadosBPPorMatricula(matriculaMotorista,this.tipoBP.Motorista);
	},
	
	obterDadosMotoristaPorCodigo: function(codigoBPMotorista){
		
		var dadosBPMotorista = this.obterDadosBPPorCodigo(codigoBPMotorista,this.tipoBP.Motorista);
		
		if (null != dadosBPMotorista) {
			
			var matriculaBPMotorista = BP.obterMatriculaBPPorCodigo(codigoBPMotorista);
			
			if (null != matriculaBPMotorista) {
				dadosBPMotorista["matricula"] = matriculaBPMotorista.valorIdentificacao;
			}
		}
		
		return dadosBPMotorista;
	},
	
	obterDadosTransportadoraPorCodigo: function(codigoBPTransportadora){
		
		return this.obterDadosBPPorCodigo(codigoBPTransportadora,this.tipoBP.Transportadora);
	},
	
	obterDadosClientePorCodigo: function(codigoBPCliente){
		
		return this.obterDadosBPPorCodigo(codigoBPCliente,this.tipoBP.Cliente,true);
	},
	
    obterDescricaoCanalDistribuicao: function(canalDistribuicao){
		
		return Datasets.getRow(
			Datasets.cadastroCanalDistribuicao,
			null,
			[["canalDistribuicao",canalDistribuicao,"must"]],
			null
		);
	},
}