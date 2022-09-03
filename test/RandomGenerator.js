const {expect, assert} = require("chai");
const { ethers } = require("hardhat");

describe("RandomGenerator Testing...",()=>{
    var RandomGeneratorContract,randomGeneratorContract,deployer,user1,user2;
    before(async ()=>{
        RandomGeneratorContract = await ethers.getContractFactory("RandomGenerator");
        [deployer, user1,user2, _] = await ethers.getSigners();
        randomGeneratorContract = await RandomGeneratorContract.deploy(deployer.address,user1.address);
    });

    describe("Deployment",()=>{
        it("should set right owner",async ()=>{
            expect(await randomGeneratorContract.owner()).to.equal(deployer.address);
            expect(await randomGeneratorContract.owner()).to.not.equal(user1.address);
            expect(await randomGeneratorContract.owner()).to.not.equal(user2.address);
        })
        
        it("should set right user",async ()=>{
            expect(await randomGeneratorContract.user()).to.equal(user1.address);
            expect(await randomGeneratorContract.user()).to.not.equal(user2.address);
            expect(await randomGeneratorContract.user()).to.not.equal(deployer.address);

        })
    });
    
    describe("Check random Number", ()=>{
        const _maxAmount = 1003;
        it("We can call random number generator function and get random number with deployer", async ()=>{
            for(var i=0;i < 5;i++){                
                var _r = await randomGeneratorContract.getRandomNumber(_maxAmount,i);
                var _event = await _r.wait();
                var eventData = _event.events[0].args
                
                expect(eventData.by).to.equal(deployer.address);
                expect(eventData.by).to.not.equal(user1.address);
                expect(eventData.by).to.not.equal(user2.address);
                
                expect(eventData.maxNumber).to.equal(_maxAmount);
                assert.isAtMost(eventData.randomNumber,_maxAmount,"the random number should be equal or less than given maximam number");
                assert.isAtLeast(eventData.randomNumber,1,"the random number should be equal or greater than 1");
                console.log(eventData.randomNumber);
                
                // await expect(_r).to.emit(randomGeneratorContract,"RandomNumberGenerated").withArgs(a1,a2,a3,a4)
            }
        })

        it("We can call random number generator function and get random number with user1", async ()=>{
            for(var i=0;i < 5;i++){                
                var _getNumber = await randomGeneratorContract.connect(user1).getRandomNumber(_maxAmount,i);
                var _event = await _getNumber.wait();
                var eventData = _event.events[0].args
                
                expect(eventData.by).to.equal(user1.address);
                expect(eventData.by).to.not.equal(user2.address);
                expect(eventData.by).to.not.equal(deployer.address);
                
                expect(eventData.maxNumber).to.equal(_maxAmount);
                assert.isAtMost(eventData.randomNumber,_maxAmount,"the random number should be equal or less than given maximam number");
                assert.isAtLeast(eventData.randomNumber,1,"the random number should be equal or greater than 0");
                console.log(eventData.randomNumber);
                
                // await expect(_r).to.emit(randomGeneratorContract,"RandomNumberGenerated").withArgs(a1,a2,a3,a4)
            }
        })
    })
    describe("Check random Name", ()=>{
        //create array of random name
        const names = []
        for(var i = 0;i<520;i++){
            names.push("my"+i+"name");
        }
        it("We can call random name generator function and get random name from deployer", async ()=>{
            for(var i=0;i < 5;i++){
                var _getName = await randomGeneratorContract.getRandomStringFromArray(names,i);
                var eventData = await _getName.wait();
                var eventData = eventData.events[1].args;

                expect(eventData.by).to.equal(deployer.address);
                expect(eventData.by).to.not.equal(user1.address);
                expect(eventData.by).to.not.equal(user2.address);
                
                expect(eventData.totalNames).to.equal(names.length);
                assert.isAtMost(eventData.randomNumber,names.length - 1,"the random number should be equal or less than given maximam number");
                assert.isAtLeast(eventData.randomNumber,0,"the random number should be equal or greater than 0");
                console.log(eventData.randomNumber);
                console.log(eventData.randomName);

                expect(eventData.randomName).to.equal(names[eventData.randomNumber]);
            }
        })

        it("We can't call random name generator function and get random name from user2", async ()=>{
                expect(randomGeneratorContract.connect(user2).getRandomStringFromArray(names,i)).to.be.revertedWith("only owner and user can call this function");                
        })
    })
})