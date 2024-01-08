const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("JavascriptQuiz", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployQuiz() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, addr1, addr2] = await ethers.getSigners();

    const quizContrat = await ethers.getContractFactory("JavaScriptQuiz");
    const quiz = await quizContrat.deploy("0x1572b593c53d839d80004aa4b8c51211864104f06ace9e22be9c4365b50655ea");

    return { deployer, quiz, addr1, addr2 };
  }

  describe("Deployment", function () {
    it('should block the owner', async function () {
      const {quiz} = await loadFixture(deployQuiz);

      await expect(quiz.answerQuiz("0x1572b593c53d839d80004aa4b8c51211864104f06ace9e22be9c4365b50655ea")).to.be.revertedWith('Owner cannot answer the quiz.');
    });

    it('should emit WrongAnswer event', async function () {
      const {quiz, addr1} = await loadFixture(deployQuiz);

      await expect(await quiz.connect(addr1).answerQuiz("5")).to.emit(quiz, "WrongAnswer");
    })

    it('should emit CorrectAnswer event', async function () {
      const {quiz, addr1} = await loadFixture(deployQuiz);

      await expect(await quiz.connect(addr1).answerQuiz("23")).to.emit(quiz, "CorrectAnswer");
    })
g


    // it("Should set the right unlockTime", async function () {
    //   const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    //
    //   expect(await lock.unlockTime()).to.equal(unlockTime);
    // });
    //
    // it("Should set the right owner", async function () {
    //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);
    //
    //   expect(await lock.owner()).to.equal(owner.address);
    // });
    //
    // it("Should receive and store the funds to lock", async function () {
    //   const { lock, lockedAmount } = await loadFixture(
    //     deployOneYearLockFixture
    //   );
    //
    //   expect(await ethers.provider.getBalance(lock.target)).to.equal(
    //     lockedAmount
    //   );
    // });
    //
    // it("Should fail if the unlockTime is not in the future", async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });
  });

 /* describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });*/
});
