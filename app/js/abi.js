const CompromissoABI = [{"constant":true,"inputs":[{"name":"matricula","type":"uint256"}],"name":"pesquisarCompromissosPorMatricula","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes1[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matriculaId","type":"uint256"},{"name":"anexos","type":"bytes1"},{"name":"advCode","type":"uint256"}],"name":"insereCompromisso","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"matriculaId","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var contract;
var conta;
var trxObj;

window.addEventListener('load', async (event) => {
    // Navegadores com novo Metamask    
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Solicita acesso a carteira Ethereum se necessário
            ethereum.enable();
            console.log("É o Metamask? " + web3.givenProvider.isMetaMask);
            estaConectado();
        } catch (err) { // Usuário ainda não deu permissão para acessar a carteira Ethereum     
            console.error(err);   
            alert('Por favor, dê permissão para acessarmos a sua carteira Ethereum.');
            return false;
        }
    } else {
        if (window.web3 != null) {
            window.web3 = new Web3(web3.currentProvider);
            console.log("É o Metamask? " + web3.givenProvider.isMetaMask);
            estaConectado();
        } else { 
            alert('Para utilizar os nossos serviços você precisa instalar o Metamask. Por favor, visite: metamask.io');
            return false;
        }
    }
});


function instanciaContrato() {
    contract = new web3.eth.Contract(CompromissoABI, "0x5b0c9dc0afe417858dcc8db5269e47abc572aa77");
}

function verificaConta() {
    if (web3 != null) {
        web3.eth.getAccounts(function(err, accounts) {
            if (err != null) {
                console.error(err);
            } else {
                conta = accounts[0];
                trxObj = {from: conta, gas: 4000000, value: 0}
                var evt = $.Event('smartcontractdisponivel');
                evt.state = true;
                $(window).trigger(evt);
            }
        });
    }
}

function setupContaEContrato() {
    instanciaContrato();
    verificaConta();
}

function estaConectado() {
    web3.eth.net.isListening().then(function() {
        let objStatus = document.getElementById("conectado");
        objStatus.innerText = "Sim";
        setupContaEContrato();
    })
    .catch(e => console.log('Não, não esta conectado. Erro: ' + e));
}

function obterTotalDeVotantes() {
    if (verificaCondicoesInteragirSmartContract()) {
        contract.methods.totalDeVotantes().call({from: conta, gas: 3000000, value: 0}, function (err, result) {
            if (err)    {
                console.error(err);
            } else {
                var nroVotantes = result*1;
                if (nroVotantes>0) {
                    let objStatus = document.getElementById("conectado");
                    objStatus.innerText = "Sim";
                }
            }
        });
    }
}

function verificaCondicoesInteragirSmartContract() {
    if (web3 != null && contract != null && conta != null) {
        return true;
    } else {
        console.log(web3 != null)
        console.log(contract != null)
        console.log(conta != null)
        return false;
    }
}