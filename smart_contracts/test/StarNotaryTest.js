const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })
    
    name = 'Star power 103!'
    story = 'I love my wonderful star'
    ra = "ra_032.155"
    dec = "dec_121.874"
    mag = "mag_245.978"
    tokenId = 1
    defaultUser = accounts[0]

    describe('createStar() tokenIdToStarInfo() check', () => { 
        it('it can create a star', async function () { 
            await this.contract.createStar(name, story, ra, dec, mag, tokenId, {from: defaultUser})
            
            it('it can get its data', async function() { 
                retStar = await this.contract.tokenIdToStarInfo(tokenId);
                retName = retStar[0].toString()
                retStory = retStar[1].toString()
                retRa = retStar[2].toString()
                retDec = retStar[3].toString()
                retMag = retStar[4].toString()

                assert.equal(retName, name)
                assert.equal(retStory, story)
                assert.equal(retRa, ra)
                assert.equal(retDec, dec)
                assert.equal(retMag, mag)
            });
        })
    })

    describe('checkIfStarExist() check', () => {
        it('star already exists', async function () {
            await this.contract.createStar(name, story, ra, dec, mag, tokenId, {from: defaultUser})

            assert.equal(await this.contract.checkIfStarExist(ra, dec, mag), true)
        })
    })

    describe('ownerOf() check', () => {
        it('star has the rightful owner', async function () {
            await this.contract.createStar(name, story, ra, dec, mag, tokenId, {from: defaultUser})
            var owner = await this.contract.ownerOf(1, {from: defaultUser})

            assert.equal(owner, defaultUser)
        })
    })

    describe('mint() check', () => {
        let tx
        beforeEach(async function() {
            tx = await this.contract.mint(tokenId, {from: defaultUser})
        })
        it('minted  token belong to the right owner', async function () {
            var owner = await this.contract.ownerOf(tokenId, {from: defaultUser})
            assert.equal(owner, defaultUser)
        })
        it('emits the transfer function', () => {
            assert.equal(tx.logs[0].event, 'Transfer')
        })
    })

    describe('putStarUpForSale() buyStar() starsForSale() check', () => { 
        let user1 = accounts[1]
        let user2 = accounts[2]
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            await this.contract.createStar(name, story, ra, dec, mag, tokenId, {from: user1})    
        })

        it('account1 can put up their star for sale', async function () { 
            assert.equal(await this.contract.ownerOf(tokenId), user1)
            await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            
            assert.equal(await this.contract.starsForSale(tokenId), starPrice)
        })

        describe('account2 can buy a star which was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            })

            it('account2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(tokenId, {from: user2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(tokenId), user2)
            })

            it('account2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(tokenId, {from: user2, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = web3.eth.getBalance(user2)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })

    describe('approve() getApproved() check', () =>{
        let _to = accounts[1]
        let _tokenId = 1
        let tx
        beforeEach(async function() {
            await this.contract.createStar(name, story, ra, dec, mag, _tokenId, {from: defaultUser})
            tx = await this.contract.approve(_to, _tokenId, {from: defaultUser})
        })

        it('account is approved', async function() {
            assert.equal(await this.contract.getApproved(_tokenId, {from: defaultUser}), _to)
        })

        it('emits the Approval event', async function() {
            assert.equal(tx.logs[0].event, 'Approval')
        })
    })
    
    describe('SetApprovalForAll() isApprovedForAll() check', () => {
        let approved = true
        let _to = accounts[1]
        let tx

        beforeEach(async function() {
            await this.contract.createStar(name, story, ra, dec, mag, tokenId, {from: defaultUser})
            tx = await this.contract.setApprovalForAll(_to, tokenId)
        })

        it('operator is approved', async function() {
            assert.equal(await this.contract.isApprovedForAll(defaultUser, _to, {from: defaultUser}), approved)
        })

        it('emits ApprovalForAll event', async function() {
            assert.equal(tx.logs[0].event, 'ApprovalForAll')
        })
    })

    describe('safeTransferFrom() check', () => {
        let _to = accounts[1]
        let tx

        beforeEach(async function() {
            await this.contract.createStar(name, story, ra, dec, mag, tokenId, {from: defaultUser})
            tx = await this.contract.safeTransferFrom(defaultUser, _to, tokenId)
        })

        it('is the owner of the token', async function() {
            assert.equal(await this.contract.ownerOf(tokenId, {from: defaultUser}), _to)
        })

        it('is not the owner of the token', async function() {
            assert.notEqual(await this.contract.ownerOf(tokenId, {from: defaultUser}), defaultUser)
        })

        it('emits the Transfer event', async function() {
            assert.equal(tx.logs[0].event, 'Transfer')
        })
    })
})