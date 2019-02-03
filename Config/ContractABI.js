let Config = (() => {
   function getContractABI() {
       return [
           {
               "constant": false,
               "inputs": [
                   {
                       "name": "_hash",
                       "type": "string"
                   }
               ],
               "name": "addCertificate",
               "outputs": [],
               "payable": false,
               "stateMutability": "nonpayable",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [
                   {
                       "name": "_index",
                       "type": "uint256"
                   }
               ],
               "name": "getCertificate",
               "outputs": [
                   {
                       "name": "",
                       "type": "string"
                   },
                   {
                       "name": "",
                       "type": "uint256"
                   }
               ],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           },
           {
               "constant": true,
               "inputs": [],
               "name": "getCertificatesCount",
               "outputs": [
                   {
                       "name": "",
                       "type": "uint256"
                   }
               ],
               "payable": false,
               "stateMutability": "view",
               "type": "function"
           }
       ];
   }
    return {
        getContractABI
    };
})();