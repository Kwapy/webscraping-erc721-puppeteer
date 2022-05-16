const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function searchTokenName(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://polygonscan.com/tokentxns-nft")

    const tokenLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".table tbody td:nth-child(9) a")).map(x => x.getAttribute('href'))
    }) 

    await page.goto("https://polygonscan.com/"+ tokenLinks[0]);
    console.log("https://polygonscan.com/"+ tokenLinks[0])
    const tokenContract = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".card-body div .d-flex")).map(x => x.textContent)
    })
    await fs.writeFile("ContractName.txt", tokenContract)


    await browser.close()
}

searchTokenName()