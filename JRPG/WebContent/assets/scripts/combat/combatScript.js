


//ajax

function getEnemy(){
	//prendi tutti gli Enemy fatti o per pool di nemici della zona
	var listEnemy = [1,2,3];
	
	var random =  Math.floor(Math.random()*listEnemy.length);
	console.log(random)
	
	
	//fare un check per evitare boss
	return listEnemy[random];
	
}



//combat
function getCombatState() {
	//il combat è una view quindi passare i valori personaggio/nemico dal controller


	$.ajax({
	    url: "/JRPG/getCombatState", // URL della servlet
	    method: "GET",
	    success: function(response) {
	        console.log(response); // Gestisci la risposta qui
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        console.log("Errore:", textStatus, errorThrown);
	        alert("Errore durante la richiesta AJAX");
	    }
	});



	//chiama update combat
	//updateCombatState(combatState)
}


//prendi valori;
getCombatState();
EsitoFight= 0;


/* function updateCombatState(combatState){
	
} */











//buttare esperienza in personaggio