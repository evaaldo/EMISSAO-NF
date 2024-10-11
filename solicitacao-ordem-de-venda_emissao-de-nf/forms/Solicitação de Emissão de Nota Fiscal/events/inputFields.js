function inputFields(form){
	
	//var centroEmissor = form.getValue("codigoCentroEmissor");
	var centroEmissor = form.getValue("identificacaoCentroEmissor");
	var processo = form.getValue("processo");
	var idFluxo = form.getValue("idFluxo");
	var tipoOrdem = form.getValue("tipoOrdem");
	var dsCadastroAprovadoresProcesso = "DSCadastroAprovadoresProcesso";
	var dsCadastroAprovadoresAdmVendasFiscalAssUnidade = "DSCadastroAprovadoresAdmVendasFiscalAssUnidade";
	var codAprovador1 = "";
	var codAprovadorGestaoAdmVendas = "";
	var codAprovadorGerenteRegNegocio = "";
	var codAprovadorTributario = "";
	var codAprovadorAdmVendas = "";
	var codAprovadorFiscal = "";
	var codAprovadorAssUnidade = "";
	
	if (form.getValue("numeroSolicitacao") == "") {
		form.setValue("numeroSolicitacao",getValue("WKNumProces"));
	}
	
	/**
	 * Aprovadores:
	 * 
	 * - Tributário
	 * - Aprovador1
	 * - Gestão Adm. de Vendas
	 * - ZINF
	 */
	var dsAprovadoresProcesso = DatasetFactory.getDataset(
		dsCadastroAprovadoresProcesso,
		null,
		[
		 DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.MUST),
		 DatasetFactory.createConstraint("tipoOrdem",tipoOrdem,tipoOrdem,ConstraintType.MUST),
		 DatasetFactory.createConstraint("processo",processo,processo,ConstraintType.MUST)
		],
		null
	).getMap().iterator();
	
	if (dsAprovadoresProcesso.hasNext()) {
		
		var aprovadoresProcesso = dsAprovadoresProcesso.next();
		codAprovador1 = aprovadoresProcesso.get("codAprovador1");
		codAprovadorTributario = aprovadoresProcesso.get("codAprovadorTributario");
		codAprovadorGestaoAdmVendas = aprovadoresProcesso.get("codAprovadorGestaoAdmVendas");
		
		if (idFluxo == "ADMOV01" && /^(Y006|Y029)$/.test(tipoOrdem)) {
			
			var aprovadorZinf = form.getValue("aprovadorZinf");
			
			if (aprovadorZinf == "Positive Brands") {
				codAprovador1 = aprovadoresProcesso.get("codAprovadorZINFPositiveBrands");
			} else if (aprovadorZinf == "Marketing 3C") {
				codAprovador1 = aprovadoresProcesso.get("codAprovadorZINFMarketing3C");	
			}
		}
	}
	
	/**
	 * Aprovador Fiscal
	 */
	var atividadeFiscal = "Fiscal";
	var dsAprovadorFiscal = DatasetFactory.getDataset(
		dsCadastroAprovadoresAdmVendasFiscalAssUnidade,
		null,
		[
		 DatasetFactory.createConstraint("atividade",atividadeFiscal,atividadeFiscal,ConstraintType.MUST),
		 DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.MUST)
		],
		null
	).getMap().iterator();
	
	if (dsAprovadorFiscal.hasNext()) {
		codAprovadorFiscal = dsAprovadorFiscal.next().get("codAprovador");
	}
	
	/**
	 * Aprovador Ass. Unidade
	 */
	var atividadeAssUnidade = "Ass. Unidade";
	var dsAprovadorAssUnidade = DatasetFactory.getDataset(
		dsCadastroAprovadoresAdmVendasFiscalAssUnidade,
		null,
		[
		 DatasetFactory.createConstraint("atividade",atividadeAssUnidade,atividadeAssUnidade,ConstraintType.MUST),
		 DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.MUST)
		],
		null
	).getMap().iterator();
	
	if (dsAprovadorAssUnidade.hasNext()) {
		codAprovadorAssUnidade = dsAprovadorAssUnidade.next().get("codAprovador");
	}
	
	/**
	 * Aprovador Adm. de Vendas
	 */
	var atividadeAdmVendas = "Adm. de Vendas";
	var dsAprovadorAdmVendas = DatasetFactory.getDataset(
		dsCadastroAprovadoresAdmVendasFiscalAssUnidade,
		null,
		[
		 DatasetFactory.createConstraint("atividade",atividadeAdmVendas,atividadeAdmVendas,ConstraintType.MUST),
		 DatasetFactory.createConstraint("todasOrdens",1,1,ConstraintType.MUST_NOT),
		 DatasetFactory.createConstraint("tipoOrdem",tipoOrdem,tipoOrdem,ConstraintType.MUST),
		 DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.SHOULD)
		],
		null
	).getMap().iterator();
	
	if (dsAprovadorAdmVendas.hasNext()) {
		
		codAprovadorAdmVendas = dsAprovadorAdmVendas.next().get("codAprovador");
		
	} else {
		
		dsAprovadorAdmVendas = DatasetFactory.getDataset(
			dsCadastroAprovadoresAdmVendasFiscalAssUnidade,
			null,
			[
			 DatasetFactory.createConstraint("atividade",atividadeAdmVendas,atividadeAdmVendas,ConstraintType.MUST),
			 DatasetFactory.createConstraint("todasOrdens",1,1,ConstraintType.MUST),
			 DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.SHOULD)
			],
			null
		).getMap().iterator();
		
		if (dsAprovadorAdmVendas.hasNext()) {
			codAprovadorAdmVendas = dsAprovadorAdmVendas.next().get("codAprovador");
		}
	}
	
	/**
	 * Aprovador Gerente Regional Negócio
	 */
	var codAprovadorTres = form.getValue("codAprovadorTres").trim();
	var codAprovadorRegional = form.getValue("codAprovadorRegional").trim();
	
	if (codAprovadorTres != "" && codAprovadorRegional == "") {
		codAprovadorGerenteRegNegocio = codAprovadorTres;
	} else if (codAprovadorRegional != "" && codAprovadorTres == "") {
		codAprovadorGerenteRegNegocio = codAprovadorRegional;
	}
	
	form.setValue("codAprovador1",codAprovador1);
	form.setValue("codAprovadorTributario",codAprovadorTributario);
	form.setValue("codAprovadorGerenteRegNegocio",codAprovadorGerenteRegNegocio);
	form.setValue("codAprovadorGestaoAdmVendas",codAprovadorGestaoAdmVendas);
	form.setValue("codAprovadorFiscal",codAprovadorFiscal);
	form.setValue("codAprovadorAssUnidade",codAprovadorAssUnidade);
	form.setValue("codAprovadorAdmVendas",codAprovadorAdmVendas);
	
	var separador = "___";
	var tblMateriais = "tbl1";
	var prefixo = tblMateriais + "_";
	var indicesMateriais = form.getChildrenIndexes(tblMateriais);
	
	form.setValue(prefixo + "selecionarTodos",null);
	
	for (var i = 0; i < indicesMateriais.length; i++) {
		
		var sufixo = separador + indicesMateriais[i];
		
		form.setValue(prefixo + "ordemVendaRemessa" + sufixo,form.getValue("processado" + sufixo));
		
		// Desmarcar o checkbox dos itens da tabela de materiais...
		form.setValue(prefixo + "checkbox" + sufixo,null);
	}
	
	if (idFluxo == "ADM03") {
		var admVendasMovimentacao = form.getValue("admVendasMovimentacao");
		if (/^(Adm. de Vendas|Fiscal)$/.test(admVendasMovimentacao)) {
			form.setValue("atendimentoArea",admVendasMovimentacao);
		}
	}
}