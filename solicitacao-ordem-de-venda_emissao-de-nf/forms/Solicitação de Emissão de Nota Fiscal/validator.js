var Validator = {

    exibirErro: function(campo, mensagem) {
        campo.next("small").remove();
        campo.after(`<small style='color: red;'>${mensagem}</small>`)
        campo.addClass("has-validator-error");
    },

    removerErro: function(campo) {
        campo.next("small").remove();
        campo.removeClass("has-validator-error");
    },

    verificarValidacoes: function(campo, id) {
        this.validarVazio(campo);

        switch (true) {
            case id.includes("tbl1_codigoBP___"):
                this.validarCodigoBP(campo);
                break;
            
            case id.includes("tbl1_codigoMaterial___"):
                this.validarCodigoMaterial(campo);
                break;
        
            case id.includes("tbl1_unidadeMedida___"):
                this.validarUnidadeMedida(campo);
                break;
        
            case id.includes("tbl1_centroCusto___"):
                this.validarCentroCusto(campo);
                break;
        
            case id.includes("tbl1_elementoPEP___"):
                this.validarElementoPEP(campo);
                break;
        
            default:
                break;
        }
        
    },

    validarVazio: function(campo) {
        this.removerErro(campo);

        if(campo.val() == "" || campo.val() == null) {
            this.exibirErro(campo, "Campo vazio");
            return true;
        }
    },

    validarRegex: function(campo, regex, mensagem) {
        this.removerErro(campo);

        if(!regex.test(campo.val())) {
            this.exibirErro(campo, mensagem);
        }
    },

    validarVazioComRegex: function(campo, regex, mensagem) {
        this.removerErro(campo);
        this.validarVazio(campo);

        if(!regex.test(campo.val()) && this.validarVazio(campo) != true) {
            this.exibirErro(campo, mensagem);
        }
    },

    validarDuploRegex: function(campo, primeiroRegex, segundoRegex, mensagem) {
        this.removerErro(campo);

        if((!primeiroRegex.test(campo.val())) && (!segundoRegex.test(campo.val()))) {
            this.exibirErro(campo, mensagem);
        }
    },

    validarVazioComDuploRegex: function(campo, primeiroRegex, segundoRegex, mensagem) {
        this.removerErro(campo);
        this.validarVazio(campo);

        if((!primeiroRegex.test(campo.val()) && this.validarVazio(campo) != true) && (!segundoRegex.test(campo.val()) && this.validarVazio(campo) != true)) {
            this.exibirErro(campo, mensagem);
        }
    },

    validarEmail: function(campo) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.validarRegex(campo, regexEmail, "E-mail inválido");
    },

    validarNumero: function(campo) {
        const regexNumero = /^[0-9]+$/;
        this.validarRegex(campo, regexNumero, "Apenas números");
    },

    validarCPF: function(campo) {
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        this.validarRegex(campo, regexCPF, "CPF incorreto");

        const cpf_formatado = campo.val().replace(/\D/g, "");
    },

    validarRG: function(campo) {
        const regexRG = /^\d{1,2}\.\d{3}\.\d{3}-\d{1}$/;
        this.validarRegex(campo, regexRG, "RG incorreto");
    },

    validarTamanho: function(campo, tamanhoMinimo, tamanhoMaximo) {
        this.removerErro(campo);
        var valor = campo.val();

        if(valor.length < tamanhoMinimo) {
            this.exibirErro(campo, `Tamanho mínimo: ${tamanhoMinimo}`);
        } else if(valor.length > tamanhoMaximo) {
            this.exibirErro(campo, `Tamanho máximo: ${tamanhoMaximo}`);
        }
    },

    validarCentroCusto: function(campo) {
        this.removerErro(campo);
        var indice = Campos.indice(campo);
        var elementoPEP = $("#tbl1_elementoPEP___" + indice);

        if(elementoPEP.val() == "") {
            this.removerErro(elementoPEP);
            this.validarVazioComDuploRegex(campo, /^\d{7}[A-Za-z]\d{2}$/, /^\d{10}$/, "Sem formato CC");
        }
	},

	validarElementoPEP: function(campo) {
		this.removerErro(campo);
        var indice = Campos.indice(campo);
        var centroCusto = $("#tbl1_centroCusto___" + indice);

        if(centroCusto.val() == "") {
            this.removerErro(centroCusto);
            this.validarVazioComRegex(campo, /^[A-Z]{3}-\d{4}\.\d{3}\.\d{2}$/, "Sem formato PEP");
        }
	},

    validarCodigoBP: function(campo) {
        var indice = Campos.indice(campo);
        var codigoMaterial = $("#tbl1_codigoMaterial___" + indice);
        var elementoPEP = $("#tbl1_elementoPEP___" + indice);
        var CC = $("#tbl1_centroCusto___" + indice);
        var unidadeMedida = $("#tbl1_unidadeMedida___" + indice);

        this.removerErro(campo);
        this.removerErro(codigoMaterial);
        this.validarVazio(campo);
        if(elementoPEP.val() == "" && CC.val() == "") {
            this.validarVazio(elementoPEP);
            this.validarVazio(CC);
        }
        this.validarVazio(unidadeMedida);
        if(codigoMaterial.val() != "") {
            this.validarVazio(codigoMaterial);
        }

        if(codigoMaterial.val() == campo.val() && this.validarVazio(campo) != true) {
            this.removerErro(codigoMaterial);
            this.exibirErro(campo, "BP já exit p/ Mat.");
        }
    },

    validarCodigoMaterial: function(campo) {
        var indice = Campos.indice(campo);
        var codigoBP = $("#tbl1_codigoBP___" + indice);

        this.removerErro(campo);
        if(codigoBP.val() != "") {
            this.removerErro(codigoBP);
        }
        this.validarVazio(campo);

        if(codigoBP.val() == campo.val() && this.validarVazio(campo) != true) {
            this.removerErro(codigoBP);
            this.exibirErro(campo, "Mat. já exit p/ BP");
        }

        this.validarDuplicadosBP_Material();
    },

    validarUnidadeMedida: function(campo) {
        this.removerErro(campo);
        this.validarVazio(campo);

        var indice =  Campos.indice(campo);
        var valorUnitario = $("#tbl1_valorUnitario___" + indice);

        this.validarVazio(valorUnitario);

        if(this.validarVazio(campo) != true) {
            this.validarTamanho(campo, 1, 3)
        }
    },

    validarDuplicadosBP_Material: function() {
        var bpMaterialMap = {};
    
        $("input[id^='tbl1_codigoBP___']").each(function() {
            var bpId = $(this).attr("id");
            var materialId = bpId.replace("codigoBP", "codigoMaterial");
    
            var bpValue = $(this).val();
            var materialValue = $("#" + materialId).val();
    
            if (bpValue === "" || materialValue === "") return;
    
            var combinationKey = bpValue + "|" + materialValue;
    
            if (bpMaterialMap[combinationKey]) {
                Validator.exibirErro($(this), "Código BP e Código Material duplicados");
                Validator.exibirErro($("#" + materialId), "Código BP e Código Material duplicados");
            } else {
                bpMaterialMap[combinationKey] = true;
            }
        });
    }
    

}