function verificarCargo() {
    var cargo = sessionStorage.cargo_ss;
    if (cargo == "Funcionario") {
        document.getElementById("adm-only").style.display = "none"
    }
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