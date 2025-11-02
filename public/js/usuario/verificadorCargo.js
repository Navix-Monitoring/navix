function verificarCargo() {
    var cargo = sessionStorage.cargo_ss;
    if (cargo != "Administrador") {
        document.getElementById("adm-only").style.display = "none"
    }

    if(cargo == "Administrador"){
  const funcLinks = document.querySelectorAll(".func-only");
        funcLinks.forEach(link => link.style.display = "none");    }
}
document.addEventListener("DOMContentLoaded", function () {
  const paginaAtual = window.location.pathname.split("/").pop();

  const linksNavbar = document.querySelectorAll("#teste .teste a");

  linksNavbar.forEach((link) => {
    const linkPagina = link.getAttribute("href").split("/").pop();

    if (linkPagina === paginaAtual) {
      link.parentElement.classList.add("active");
    }
  });
});