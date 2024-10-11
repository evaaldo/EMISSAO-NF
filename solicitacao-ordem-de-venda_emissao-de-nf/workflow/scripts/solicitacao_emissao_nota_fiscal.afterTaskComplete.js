function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var numState = String(getValue("WKNumState"));
	var atividadesCompletadas = hAPI.getCardValue("atividadesCompletadas");
	
	atividadesCompletadas = String(atividadesCompletadas).split(","); 
	atividadesCompletadas = atividadesCompletadas.filter(function(item){ return item != "" });
	
	if (atividadesCompletadas.indexOf(numState) == -1) {
		atividadesCompletadas.push(numState);
	}
	
	hAPI.setCardValue("atividadesCompletadas",atividadesCompletadas.join(","));
}