var Transporte = {

	/**
	 * Valores disponibilizados via documentação
	 * 
	 * @see https://docs.google.com/document/d/1-q1H2QqQGqW5T6isnOX-j9uEBC-loy_yd4UIAVGlIbo
	 */
	tiposEquipamentos: {
		"J" : "Veículos macro",
		"K" : "Veículos micro"
	},
	
	inicializar: function(){
		this.montarListaTipoTransporte();
		this.montarListaResponsavelFrete();
		this.verificarTipoTransporte();
		this.verificarResponsavelFrete();
		this.verificarCategoriaEquipamento();
	},
	
	changeTipoTransporte: function(){
		this.selecionarTipoTransporte();
		this.verificarTipoTransporte();
		this.verificarResponsavelFrete();
	},
	
	changeResponsavelFrete: function(){
		this.verificarResponsavelFrete();
	},
	
	changePlaca: function(){
		this.verificarPlaca();
	},
	
	changeCodigoTransportadora: function(){
		this.verificarCodigoTransportadora();
	},
	
	changeMatriculaMotorista: function(){
		this.verificarMatriculaMotorista();
	},
	
	changeCodigoBPMotorista: function(){
		this.verificarCodigoBPMotorista();
	},
	
	verificarPlaca: function(){
		
		var cPlaca = Campos.placa();
		var vPlaca = Campos.val(cPlaca);
		
		this.limparDadosPlaca();
		
		if (vPlaca != "") {
			
			var equipamento = this.obterDadosEquipamento(vPlaca);
			
			if (null != equipamento) {
				this.selecionarCategoriaEquipamento(equipamento.categoriaEquipamento);
			}
		}
	},
	
	obterDadosEquipamento: function(equipamento){
		return Datasets.getRow(
			Datasets.hanaEquipamentos,
			null,
			[["equipamento",equipamento,"must"]],
			null
		);
	},
	
	selecionarCategoriaEquipamento: function(categoriaEquipamento){
		
		this.preencherCamposPlaca({
			tipoVeiculo: this.tiposEquipamentos[categoriaEquipamento],
			categoriaEquipamento: categoriaEquipamento
		});
		
		if (/^(J|K)$/.test(categoriaEquipamento)) {
			Util.exibirAlerta({
				titulo: "Mensagem",
				mensagem: "Obrigatório emissão do MDF-e.",
			});
		}
		
		this.verificarCategoriaEquipamento();
	},
	
	verificarCategoriaEquipamento: function(){
		
		var cCategoriaEquipamento = Campos.categoriaEquipamento();
		var cFiscalMovimentacao = Campos.fiscalMovimentacao();
		var optionAprovadoFiscalMovimentacao = $("option[value=Aprovado]",cFiscalMovimentacao);
		var vCategoriaEquipamento = Campos.val(cCategoriaEquipamento);
		
		optionAprovadoFiscalMovimentacao.toggle(/^(J|K)$/.test(vCategoriaEquipamento));
		
		Processo.toggleCamposProcesso();
	},
	
	preencherCamposPlaca: function(dados){
		
		if (undefined != dados.tipoVeiculo && null != dados.tipoVeiculo) {
			var cTipoVeiculo = Campos.tipoVeiculo();
			cTipoVeiculo.val(dados.tipoVeiculo);
		}
		
		if (undefined != dados.categoriaEquipamento && null != dados.categoriaEquipamento) {
			var cCategoriaEquipamento = Campos.categoriaEquipamento();
			cCategoriaEquipamento.val(dados.categoriaEquipamento);
		}
	},
	
	limparDadosPlaca: function(){
		
		var cTipoVeiculo = Campos.tipoVeiculo();
		var cCategoriaEquipamento = Campos.categoriaEquipamento();
		
		cTipoVeiculo.val("");
		cCategoriaEquipamento.val("");
	},
	
	verificarMatriculaMotorista: function(){
		
		var cMatriculaMotorista = Campos.matriculaMotorista();
		var vMatriculaMotorista = Campos.val(cMatriculaMotorista);
		
		this.limparDadosMotorista();
		cMatriculaMotorista.val(vMatriculaMotorista);
		
		if (vMatriculaMotorista != "") {
			
			var dadosMotorista = BP.obterDadosMotoristaPorMatricula(vMatriculaMotorista);
			
			if (null != dadosMotorista) {
				
				this.preencherCamposMotorista({
					nomeMotorista : dadosMotorista.razaoSocial,
					codigoBPMotorista : dadosMotorista.codigoParceiro
				});
			}
		}
	},
	
	verificarCodigoBPMotorista: function(){
		
		var cCodigoBPMotorista = Campos.codigoBPMotorista();
		var vCodigoBPMotorista = Campos.val(cCodigoBPMotorista);
		
		this.limparDadosMotorista();
		cCodigoBPMotorista.val(vCodigoBPMotorista);
		
		if (vCodigoBPMotorista != "") {
			
			var dadosMotorista = BP.obterDadosMotoristaPorCodigo(vCodigoBPMotorista);
			
			if (null != dadosMotorista) {
				
				this.preencherCamposMotorista({
					nomeMotorista: dadosMotorista.razaoSocial,
					matriculaMotorista: dadosMotorista.matricula
				});
			}
		}
	},
	
	preencherCamposMotorista: function(dados){
		
		if (undefined != dados.matriculaMotorista && null != dados.matriculaMotorista) {
			var cMatriculaMotorista = Campos.matriculaMotorista();
			cMatriculaMotorista.val(dados.matriculaMotorista);
			Campos.desabilitar(cMatriculaMotorista);
		}
		
		if (undefined != dados.codigoBPMotorista && null != dados.codigoBPMotorista) {
			var cCodigoBPMotorista = Campos.codigoBPMotorista();
			cCodigoBPMotorista.val(dados.codigoBPMotorista);
			Campos.desabilitar(cCodigoBPMotorista);
		}
		
		if (undefined != dados.nomeMotorista && null != dados.nomeMotorista) {
			var cNomeMotorista = Campos.nomeMotorista();
			cNomeMotorista.val(dados.nomeMotorista);
		}
	},
	
	limparDadosMotorista: function(){
		
		var cMatriculaMotorista = Campos.matriculaMotorista();
		var cCodigoBPMotorista = Campos.codigoBPMotorista();
		var cNomeMotorista = Campos.nomeMotorista();
		
		cMatriculaMotorista.val("");
		cCodigoBPMotorista.val("");
		cNomeMotorista.val("");
		
		Campos.habilitar(cMatriculaMotorista);
		Campos.habilitar(cCodigoBPMotorista);
	},
	
	selecionarTipoTransporte: function(){
		
		var cTipoTransporte = Campos.tipoTransporte();
		var cResponsavelFrete = Campos.responsavelFrete();
		var vTipoTransporte = Campos.val(cTipoTransporte);
		
		cResponsavelFrete.empty().append($("<option/>").val("").text(""));
		
		if (vTipoTransporte != "") {
			
			var listaResponsavelFrete = this.obterListaResponsavelFrete(vTipoTransporte);
			
			for (var i in listaResponsavelFrete) {
				var tomadorFrete = listaResponsavelFrete[i].tomadorFrete;
				cResponsavelFrete.append($("<option/>").val(tomadorFrete).text(tomadorFrete));
			}
		}
	},
	
	verificarTipoTransporte: function(){
		this.toggleCamposTipoTransporte();
	},
	
	verificarResponsavelFrete: function(){
		this.toggleCamposResponsavelFrete();
	},
	
	toggleCamposTipoTransporte: function(){
		
		var cTipoTransporte = Campos.tipoTransporte();
		var cCodigoBPMotorista = Campos.codigoBPMotorista();
		var cMatriculaMotorista = Campos.matriculaMotorista();
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var cPlaca = Campos.placa();
		var vTipoTransporte = Campos.val(cTipoTransporte);
		
		Campos.desabilitar(cPlaca);
		Campos.desabilitar(cCodigoTransportadora);
		Campos.desabilitar(cCodigoBPMotorista);
		Campos.desabilitar(cMatriculaMotorista);
		
		if (vTipoTransporte == "Veículo Frota Própria") {
			Campos.habilitar(cPlaca);
			Campos.habilitar(cCodigoTransportadora);
			Campos.habilitar(cCodigoBPMotorista);
			Campos.habilitar(cMatriculaMotorista);
		} else if (vTipoTransporte == "Veículo de Transportadora") {
			Campos.habilitar(cCodigoTransportadora);
		}
	},
	
	toggleCamposResponsavelFrete: function(){
		
		var cResponsavelFrete = Campos.responsavelFrete();
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var vResponsavelFrete = Campos.val(cResponsavelFrete);
		var cTipoOrdem = Campos.tipoOrdem();
		var vTipoOrdem = Campos.val(cTipoOrdem);
		
		if (vResponsavelFrete == "SRF - Sem Frete" || /^(Y006|Y029)$/.test(vTipoOrdem)) {
			Campos.desabilitar(cCodigoTransportadora);
		} else {
			Campos.habilitar(cCodigoTransportadora);
		}
	},
	
	verificarCodigoTransportadora: function(){
		
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var cRazaoSocialTransportadora = Campos.razaoSocialTransportadora();
		var vCodigoTransportadora = Campos.val(cCodigoTransportadora);
		
		cRazaoSocialTransportadora.val("");
		
		if (vCodigoTransportadora != "") {
			
			var transportadora = BP.obterDadosTransportadoraPorCodigo(vCodigoTransportadora);
			
			if (null != transportadora) {
				cRazaoSocialTransportadora.val(transportadora.razaoSocial);
			}
		}
	},
	
	limparDadosTransportadora: function(){
		
		var cCodigoTransportadora = Campos.codigoTransportadora();
		var cRazaoSocialTransportadora = Campos.razaoSocialTransportadora();
		
		cCodigoTransportadora.val("")
		cRazaoSocialTransportadora.val("");
		
		Campos.habilitar(cCodigoTransportadora);
	},
	
	obterListaTipoTransporte: function(){
		return Datasets.getRows(
			Datasets.cadastroTransporte,
			["tipoTransporte"],
			null,
			null
		);
	},
	
	montarListaTipoTransporte: function(){
		
		var cTipoTransporte = Campos.tipoTransporte();
		var vTipoTransporte = Campos.val(cTipoTransporte);
		
		if (cTipoTransporte.is("select")) {
			
			var tiposTransporte = this.obterListaTipoTransporte();
			
			cTipoTransporte.empty().append($("<option/>").val("").text(""));
			
			var tiposRepetidos = [];
			
			for (var i in tiposTransporte) {
				
				var tipoTransporte = tiposTransporte[i].tipoTransporte;
				
				if (tiposRepetidos.indexOf(tipoTransporte) > -1) {
					continue;
				}
				
				cTipoTransporte.append(
					$("<option/>").val(tipoTransporte).text(tipoTransporte).prop("selected",tipoTransporte == vTipoTransporte)
				);
				
				tiposRepetidos.push(tipoTransporte);
			}
		}
	},
	
	montarListaResponsavelFrete: function(){
		
		var cTipoTransporte = Campos.tipoTransporte();
		var vTipoTransporte = Campos.val(cTipoTransporte);
		var cResponsavelFrete = Campos.responsavelFrete();
		var vResponsavelFrete = Campos.val(cResponsavelFrete);
		
		if (cResponsavelFrete.is("select")) {
			
			var listaResponsavelFrete = this.obterListaResponsavelFrete(vTipoTransporte);
			
			cResponsavelFrete.empty().append($("<option/>").val("").text(""));
			
			for (var i in listaResponsavelFrete) {
				
				var responsavelFrete = listaResponsavelFrete[i].tomadorFrete;
				
				cResponsavelFrete.append(
					$("<option/>").val(responsavelFrete).text(responsavelFrete).prop("selected",responsavelFrete == vResponsavelFrete)
				);
			}
		}
	},
	
	obterListaResponsavelFrete: function(tipoTransporte){
		return Datasets.getRows(
			Datasets.hanaCadastroTransporte,
			["tomadorFrete"],
			[["tipoTransporte",tipoTransporte,"must"]],
			null
		);
	}
}

document.addEventListener("DOMContentLoaded", function(event){
	Transporte.inicializar();
});