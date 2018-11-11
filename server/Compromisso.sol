pragma  solidity 0.4.25;

contract CompromissoMatricula {
        mapping (address => Compromisso) _compromisso;


    struct Compromisso {
        uint256 compromissoUuid;
        uint matriculaId;
        byte anexos;
        address advAddress;
        uint advCode;
        uint256 insertAt;
    }

    modifier somenteAdv() {
        require(advogado == msg.sender, "Somente o advogado pode realizar essa operação");
        _;
    }

    mapping (address => Compromisso) compromissos;
    Compromisso[] compromisso;
    address advogado;
    
    /**
    @notice O Advogado que incluirá um compromisso deve registrar o Smart Contract
    @dev Cria um contrato específico para um Compromisso. O Advogado designado é quem registrou o Smart Contract na rede
    @param matriculaId - O Advogado passa o número da matrícula do imóvel
    */
    constructor (string matriculaId) public {
        advogado = msg.sender;
        matriculaId = matriculaId;
    }
    
    /** 
    @notice função a ser usada para obter todos os compromissos de um imóvel pelo número de matrícula
    @param matricula - Número da matrícula do imóvel
    @return Endereço Ethereum da conta do votante
    */
    function pesquisarCompromissosPorMatricula(uint matricula) public view returns (uint256[], uint[], byte[], address[], uint[], uint256[]) {
        //Compromisso[] memory compromissoTemporario = new Compromisso[]
         uint256[] memory compromissoUuid = new uint256[](compromisso.length);
         uint[] memory matriculaId = new uint[](compromisso.length);
         byte[] memory anexos = new byte[](compromisso.length);
         address[] memory advAddress = new address[](compromisso.length);
         uint[] memory advCode = new uint[](compromisso.length);
         uint256[] memory insertAt = new uint256[](compromisso.length);
         for (uint i = 0; i < compromisso.length ; i++) {
            Compromisso storage comp = compromisso[i];
            if (comp.matriculaId == matricula) {
                compromissoUuid[i] = comp.compromissoUuid;
                matriculaId[i] = comp.matriculaId;
                anexos[i] = comp.anexos;
                advAddress[i] = comp.advAddress;
                advCode[i] = comp.advCode;
                insertAt[i] = comp.insertAt;
            }
        }
        return (compromissoUuid, matriculaId, anexos, advAddress, advCode, insertAt);
        
    }

    /**
    @notice O Advogado insere um Compromisso
    @param matriculaId - Número da matrícula do imóvel
    @param anexos - Array de Javascript stringficado com os base 64 das imagens dos documentos 
    @param advCode - identificação do advogado que esté inserindo um novo compromisso
    */
    function insereCompromisso(uint matriculaId, byte anexos, uint advCode) {
        Compromisso memory novoCompromisso = Compromisso(now, matriculaId, anexos, msg.sender, advCode, now);
        compromisso.push(novoCompromisso);
    }
    
}