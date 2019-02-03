$(document).ready(function () {
    const ipfs = window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    const Buffer = window.IpfsApi().Buffer;
    const ContractAddress = "0xce9eaa6a0938b2a7fd0280c3f105be4151409f7e";
    //check if metamask is installed
    if (typeof web3 === "undefined") {
        return showError("Please install MetaMask.");
    }
    //Mapping of contract to the contract address
    const contract = web3.eth.contract(Config.getContractABI()).at(ContractAddress);

    function uploadCertificate() {
        //TODO: Write the Logic behind Uploading a Certificate to IPFS and adding the information to the Blockchain
        if($('#CertificateForUpload')[0].files.length==0){
            return showError("Please select a file");
        }
        
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    // Request account access if needed
                    await ethereum.enable();
                    // Acccounts now exposed
                    web3.eth.sendTransaction({/* ... */});
                } catch (error) {
                    // User denied account access...
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
                web3.eth.sendTransaction({/* ... */});
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });

        let fileReader = new FileReader();
        fileReader.onload=function(){
            //TODO:What happens when user uploads a file
            let fileBuffer = Buffer.from(fileReader.result);
            ipfs.files.add(fileBuffer,(err,result)=>{
                if(err){
                    return showError(err);
                }
                if(result){
                    let ipfsHash = result[0].hash;
                    contract.addCertificate(ipfsHash,function(err,result){
                        if(err){
                            return showError('There was an error with the smart contract:'+err)
                        }
                        console.log(ipfsHash);
                        showInfo('Certificate  '+ ipfsHash+'  was <b> successfully added.</b> to the Registry')
                    })
                }
            });
        };
        fileReader.readAsArrayBuffer($('#CertificateForUpload')[0].files[0]); 
    }

    function viewGetCertificates() {
        //TODO: Write the logic behind View Certificates.
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    // Request account access if needed
                    await ethereum.enable();
                    // Acccounts now exposed
                    web3.eth.sendTransaction({/* ... */});
                } catch (error) {
                    // User denied account access...
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
                web3.eth.sendTransaction({/* ... */});
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });



        contract.getCertificatesCount(function(err,result){
            if(err){
                return showError('There was an error with the smart contract:'+err);
            }
            //let certificatescount=result[0];
           
            let certiCard = document.getElementById('certi');
            let certificatesCount=result.toNumber();
            console.log(certificatesCount+'');
            if(certificatesCount>0)
            {   
                let html = $('<div class="container">');
                html.append('<div class="row">');
                
                for (let index = 0; index < certificatesCount; index++) {
                    contract.getCertificate(index,function(err,result){
                        if(err){
                            return showError('There was an error with contract: '+err);

                        }
                        //image hash and certi date    
                        let ipfsImageHash = result[0];
                        let certificatePublishDate = result[1];

                        // rereive image url thru hash from IPFS
                        let divElement = $('<div style="padding-bottom:5%;" class=col-6>"');

                        let imageUrl = 'https://ipfs.infura.io/ipfs/'+ipfsImageHash;
                        let displayDate = new Date(certificatePublishDate * 1000).toLocaleString();

                        // certiCard.innerHTML +='<div class="col-3"><p>Date:'+certificatePublishDate+'</p><br><img src='+imageUrl+'/></div>';

                        divElement
                        .append($('<h1 style="color: #ffffff;font-weight: bold; margin-bottom: 20px;">Certificate Published on: '+ displayDate +'</h1>'))
                        .append($('<img  src='+imageUrl+'/></div>'));

                        html.append(divElement);
                    }); 
                }
                html.append('</div></div>');
                $('#viewGetCertificates').append(html);

            }else{
                $('#viewGetCertificates').append('<div>No certificates in our Smart Conatract</div>');

            }
        })
    }
    $('#linkHome').click(function () {
        showView("viewHome")
    });
    $('#linkSubmitCertificate').click(function () {
        showView("viewSubmitCertificate")
    });
    $('#linkGetCertificates').click(function () {
        $('#viewGetCertificates div').remove();
        showView("viewGetCertificates");
        viewGetCertificates();
    });
    $('#CertificateUploadButton').click(uploadCertificate);

// Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    function showView(viewName) {
        // Hide all views and show the selected view only
         $('main > section').hide();
        $('#' + viewName).show();
    }

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }

});



