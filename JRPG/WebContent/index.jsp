<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
	<div class="w-100 p-2 rounded-2 my-3 divPrePage px-0 pb-0">
    <h2 class="m-0 ps-2 h2Page">Combattimento</h2>

    <div class="border border-top border-dark rounded divPage m-0 d-flex">


        <div class="container divBackground" style="height: 75vh; position: relative"></div>



        <div class="d-flex flex-column justify-content-between col-6 " style="height: 75vh">

            <div class="d-flex flex-column justify-content-between h-100">
                <div class="d-flex justify-content-start">
                    <div id="Nemico" class="border border-dark rounded-3 shadow m-2 col-10 divPrePage">

                        <p class="m-0 h2Page h3 p-2">Nemico nome</p>

                        <div class="divPage p-3 rounded-3">

                            <div class="d-flex bg-black rounded-3">
                                <p class="m-0 me-1 fw-bold px-1 text-warning">Hp:</p>

                                <div id="hpBarNemico" style="width: 100%; background-color: #ccc;" class="rounded-3 p-1">
                                    <div id="hpFillN" style="height: 20px; width: 100%; background-color: green;" class=" rounded-3">

                                    </div>
                                </div>

                            </div>
                            <div class="d-flex justify-content-end">
                                <p id="nemicoHp" class="m-0">Nemico Hp / Nemico.MaxHp</p>
                            </div>

                        </div>

                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <div id="Personaggio" class="border border-dark rounded-3 shadow m-2 col-10 divPrePageBlue">
                        <div class="d-flex justify-content-between">
                            <p class="m-0 h2Page h3 p-2">Personaggio.Nome</p>
                            <p class="m-0 h2Page h3 p-2">Lvl : Personaggio.Livello</p>
                        </div>


                        <div class="divPage p-3 rounded-3">

                            <div class="d-flex bg-black rounded-3">
                                <p class="m-0 me-1 fw-bold px-1 text-warning">Hp:</p>

                                <div id="hpBarPersonaggio" style="width: 100%; background-color: #ccc;" class="rounded-3 p-1">
                                    <div id="hpFillP" style="height: 20px; width: 100%; background-color: green;" class=" rounded-3">

                                    </div>
                                </div>

                            </div>
                            <div class="d-flex justify-content-end">
                                <p id="personaggioHp" class="m-0">Personaggio.Hp / Personaggio.MaxHp</p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>



            <div id="sceltaAttacco" class="h-25 border border-dark d-flex justify-content-end rounded-3">

                <div id="schermo" class="w-75 bg-white rounded-3 p-3" style="display:none">


                </div>

                <div id="inventario" class="w-75 bg-white rounded-3 p-3" style="display:none; overflow-y: auto;">

                </div>

                <div id="esito" class="w-75 bg-white rounded-3 p-3" style="display:none; overflow-y: auto;">
                
                
        
                    
                    
                </div>


                <div class="w-25 bg-black d-flex flex-column">
                    <button id="attaccoNormaleButton" class="h-50 m-1 custom-button">Attacco </button>
                    <button id="usoOggettoButton" class="h-50 m-1 custom-button">Usa Oggetto</button>
                </div>

            </div>


        </div>




    </div>
    </div>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="assets/scripts/combat/combatScript.js"></script>


</body>
</html>