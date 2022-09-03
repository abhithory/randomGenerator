const hre = require('hardhat');



async function main(){
    const _randomGeneratorContract = await hre.ethers.getContractFactory("RandomGenerator");
    console.log("1");
    const [owner,user,_] = await hre.ethers.getSigners();
    console.log("owner: ",owner.address);
    console.log("user: ",user);
    const randomGeneratorContract = await _randomGeneratorContract.deploy(owner.address,owner.address);
    console.log("wait... deploying");
    await randomGeneratorContract.deployed();

    console.log(`address of contract is: ${randomGeneratorContract.address}`);
}

main().then(()=>{process.exit(0)}).catch((error)=>{
    console.error(error)
    process.exit(1)
})