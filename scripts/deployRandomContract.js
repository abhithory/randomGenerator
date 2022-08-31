const hre = require('hardhat');



async function main(){
    const _randomGeneratorContract = await hre.ethers.getContractFactory("RandomGenerator");
    console.log("1");
    const randomGeneratorContract = await _randomGeneratorContract.deploy();
    console.log("1");
    const dd = await randomGeneratorContract.deployed();

    console.log(`address of contract is: ${randomGeneratorContract.address}`);
}

main().then(()=>{process.exit(0)}).catch((error)=>{
    console.error(error)
    process.exit(1)
})