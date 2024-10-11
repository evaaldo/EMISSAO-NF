var Util = {
	
	formato_data_dp: 'dd/mm/yy',
	formato_data_fl: 'DD/MM/YYYY',
	_loader: null,
	
	criarData: function(data_string) {
		
		var data = null;
		
		try {
			
			data = $.datepicker.parseDate(this.formato_data_dp, data_string);
			
		} catch (e) { }
    	
		return data;
    },
    
    validarHora: function(hora_string){
    	
    	if (undefined != hora_string && null != hora_string && hora_string.indexOf(":") > -1 && hora_string.length == 5) {
    		
    		var hora = hora_string.split(":");
        	var horas = hora[0];
        	var minutos = hora[1];
        	
        	if (parseInt(horas) <= 23 && parseInt(minutos) <= 59) {
        		return true;
        	}
    	}
    	
		return false;
    },
    
    formatarData: function(data) {
    	
    	return FLUIGC.calendar.formatDate(data,this.formato_data_fl);
    },
    
	getDataPrimeiroDiaMes: function() {
		
    	var data = new Date();
    	
    	data.setDate(1);
    	
    	return this.criarData(this.formatarData(data));
    },
    
    getDiasEntreDatas: function(data1, data2){
	    return Math.round((data2 - data1) / (1000 * 60 * 60 * 24));
    },
    
    adicionarDiasData: function(data, dias) {
    	return new Date(data.getTime() + (dias * 86400000));
    },
    
    limparToast: function() {
		$(".alert").alert("close");
		$("#toaster").remove();
	},
	
	exibirAlerta : function(params) {
		
		this.limparToast();
		
		FLUIGC.toast({
	        title   : params.titulo + ": ",
	        message : params.mensagem,
	        type    : "warning",
	        timeout : 5000
	    });
	},
	
	exibirErro : function(params) {
		
		this.limparToast();
		
		FLUIGC.toast({
	        title   : params.titulo + ": ",
	        message : params.mensagem,
	        type    : "danger"
	    });
	},
	
	arrayUnique: function(array){
		return array.filter(function(item, pos, self) {
		    return self.indexOf(item) == pos;
		})
	},
	
	arrayIntersection: function(array1, array2) {
		return array1.filter(function(item) {
		    return array2.indexOf(item) !== -1;
		});
	},
	
	loader: function (elemento) {
		
		if (this._loader == null) {
			
			this._loader = FLUIGC.loading(elemento, {
				ignoreIfBlocked: true
				//textMessage: "Aguarde..."
			});
		}
		
		return this._loader;
	},
	
	nl2br: function(string){
		return String(string).replace(/\n/g,'<br />');
	},

	alertaAmigavelHTML: function(icone, titulo, texto, rodape) {
		var alertaHTML = new AlertaCustomizado(icone, titulo, texto, rodape);
	
		alertaHTML.exibeAlertaHtml();
	}

}