function redirecionar(){
if(sessionStorage.fkCargo == 3){
    window.location = "../dashboard/dashboardEngenheiroQualidade.html"
}
else if(sessionStorage.fkCargo == 2){
window.location = "../dashboard/dashboardEngenheiroAutomotivo.html"
}
else if(sessionStorage.fkCargo ==1){
    
}
}

