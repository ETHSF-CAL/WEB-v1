var Client = require('@liquality/chainabstractionlayer').Client;
var providers = require('@liquality/chainabstractionlayer').providers;
var networks = require('@liquality/chainabstractionlayer').networks;
var sha256 = require('@liquality/chainabstractionlayer').crypto.sha256;

const bitcoin = new Client()
bitcoin.addProvider(new providers.bitcoin.BitcoinRPCProvider('http://localhost:18332', 'bitcoin', 'local321'))
bitcoin.addProvider(new providers.bitcoin.BitcoinLedgerProvider({ network: networks.bitcoin_testnet }))
bitcoin.addProvider(new providers.bitcoin.BitcoinSwapProvider({ network: networks.bitcoin_testnet }))

;(async function(){

    var acc1 = "mto2aQFody9b6W1evi2zxAs4wkN4Y68jZG"
    var acc2 = "mg5HCvRPvARYkjFC6AHfCUYHSCoLzX8ndb"
    var acc1_balance = await bitcoin.getBalance(acc1);
    console.log(acc1_balance)
   
    var value = 10;
    var recipientAddress = acc2;
    var refundAddress = acc1;
    var expiration = 1231241; //random
  
    var secret = "123"; // u decide :D
    var secretHash = sha256(secret);
  
    var initiationTxHash = await bitcoin.initiateSwap(value, recipientAddress, refundAddress, secretHash, expiration).catch(function(err){console.log(err)});
    console.log(initiationTxHash);
  
    // var tnx_hash = await ethereum.claimSwap(initiationTxHash, recipientAddress, refundAddress, secret, expiration).catch((err) => console.log(err));;
    // console.log(tnx_hash);
  
    
  })();