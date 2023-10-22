const { ethers } = require('hardhat');

// Aave Fantom Addresses
const daiAddress = '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E'
const old_poolAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'
const poolAddress = '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb'
//oldest_deployedFlashLoanContractAddr = '0xc81B7C46b8cE88210Ad2D9410d89938a8259AC18'
//old_deployedFlashLoanContractAddr = '0xB0723822600a544Ab42c7ECD05A6B225c2745Fc1'
//deployedFlashLoanContractAddr = '0x2c1cFaC977A00d607c37508486A9b1374A6B6939'

let FlashLoanContractDeploy = {

    /** 
     * @dev Deploy the token contract.
     * This is the Test token and must be implemented first. 
     * Simply deploys a native token, LAS, for the exchange built.
     * 
     * Requirements:
     * 
     */
    deploy: async function deployFlashLoanContract() {
        let deployer, flashLoanContract
        [deployer] = await ethers.getSigners()

        let FlashLoanContract = await ethers.getContractFactory(
            'FlashLoan', deployer
        )
        
        flashLoanContract = await FlashLoanContract.deploy(poolAddress, daiAddress)
        await flashLoanContract.deployed()
        console.log(flashLoanContract.address)
        return flashLoanContract
    }
}

let FlashLoan = {

    /** 
     * @dev Execute FlashLoan. 
     * Execute the flash loan on Aave V3 on Fantom mainnet to borrow 10 DAI.
     * 
     * Requirements:
     * Should pay back within the same transaction.
     * 
     */
    flashLoan: async function flashLoanFunction(flashLoanContractAddress) {
        let deployer_, flashLoanContract
        [deployer_] = await ethers.getSigners()
        let amount = ethers.utils.parseEther('10')
        let premium = ethers.utils.parseEther('0.009')

        let FlashLoanContract = await ethers.getContractFactory('FlashLoan')
        
        flashLoanContract = FlashLoanContract.attach(flashLoanContractAddress)
        await flashLoanContract.connect(deployer_).functions.flashLoan(
            amount, {
                gasLimit: 5000000,
                gasPrice: Number(ethers.utils.parseUnits('50', 'gwei'))
            }
        )
        /*await flashLoanContract.connect(deployer_).functions.executeOperation(
            daiAddress, amount, premium, deployer_.address, '0x', {
                gasLimit: 5000000,
                gasPrice: Number(ethers.utils.parseUnits('50', 'gwei'))
            }
        )*/
        //console.log(flashLoanContract)
        console.log(deployer_.address)
    },

    withdraw: async function withdrawAllBorrowedFunds(flashLoanContractAddress) {
        let deployer_, flashLoanContract
        [deployer_] = await ethers.getSigners()

        let FlashLoanContract = await ethers.getContractFactory('FlashLoan')
        
        flashLoanContract = FlashLoanContract.attach(flashLoanContractAddress)
        await flashLoanContract.connect(deployer_).functions.withdrawFunds()
    }
}

Main = async() => {
    // Deploy FlashLoan Contract.
    //await FlashLoanContractDeploy.deploy()

    // Perform the actual Flash Loan on Aave v3 Fantom using DAI as loaned token
    await FlashLoan.flashLoan('0x2c1cFaC977A00d607c37508486A9b1374A6B6939')
    //await FlashLoan.withdraw('0xB0723822600a544Ab42c7ECD05A6B225c2745Fc1')
    
}

Main()