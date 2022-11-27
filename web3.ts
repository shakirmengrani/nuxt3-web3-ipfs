import Web3 from 'web3'

const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const abi = [
	{
		"anonymous": false,
		"inputs": [],
		"name": "NewPost",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_img",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_text",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "img",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


export const connectWallet = async () => {
    let wallet, contract, accounts;
    if(process.client){
        if (window.ethereum) {
            let instance = new Web3(window.ethereum);
        try {
            window.ethereum.enable();
            wallet = instance;
        } catch (error) {
            alert('Please allow access for the app to work');
        }
        } else if (window.web3) {
            wallet = new Web3(window.web3.currentProvider);
        } else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        if(wallet){
            contract = new wallet.eth.Contract(abi, address)
            accounts = await wallet.eth.getAccounts()
        }
        return {
            wallet, contract, accounts
        }
    }
  }