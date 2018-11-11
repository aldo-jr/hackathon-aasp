$(window).on("load", function() {
  $("#matriculaId").modal("show");
});

function closeModal(event) {
  event.preventDefault();
  $("#matriculaId").modal("hide");
  $(".consultaPage").removeClass("hide");
}
function obterTotalDePropostas() {
  if (verificaCondicoesInteragirSmartContract()) {
    contract.methods.totalDePropostas().call(trxObj, function(err, result) {
      if (err) {
        console.error("totalDePropostas - Erro: " + err);
      } else {
        totalDePropostas = result * 1;
        pesquisarPropostas(totalDePropostas);
      }
    });
  } else {
    console.log("nao foi");
  }
}
