const { expect, browser, $ } = require('@wdio/globals')

describe('My Login application', () => {
    beforeEach(async() =>{
        
        await browser.maximizeWindow();
        
    });


    // it ("Verify that allows register a User", async()=>{

        

    //     const reg= await $(`.ico-register`);
    //     await reg.click();
    //     const fN= await $(`#FirstName`);
    //     const lN= await $(`#LastName`);
    //     const email=await $(`#Email`);
    //     const pass= await $(`#Password`);
    //     const conPass=await $(`#ConfirmPassword`)

    //     await fN.setValue("a");
    //     await lN.setValue("b");
    //     await email.setValue("A@fo.com");
    //     await pass.setValue(1234567);
    //     await conPass.setValue(1234567);
    //     //await (`#gender-male`).click();

    //     const regb= await $(`#register-button`);
    //     await regb.click();
    //     await browser.pause(2000);
    //     expect( await browser.getUrl()).toBe(`https://demowebshop.tricentis.com/registerresult/1`)
    // })

    it(`Verify that allows login a User`, async()=>{
        await browser.url("https://demowebshop.tricentis.com/");

        // const log = await $(`.ico-logout`);
        // await log.click();
        await browser.pause(2000);
        const login = await $(`.ico-login`);
        await login.click();
        await browser.pause(2000);
        const email=await $(`#Email`);
        const pass= await $(`#Password`);
        await email.setValue("A@ho.com");
        await pass.setValue(1234567);
        await (await $(`[value="Log in"]`)).click();
        await browser.pause(2000);

        const acc= await $(`.account`);

        expect(await acc.getText()).toBe("A@ho.com");
    })

    it(`Verify that Computers group has 3 sub-groups with correct names`,async()=>{
        const comp= await $(`[href="/computers"]`);
        await comp.click();
        await browser.pause(2000);
        const desc= await $$(`a[title="Show products in category Desktops"]`)[0]
        const note= await $$(`a[title="Show products in category Notebooks"]`)[0]
        const acs= await $$(`a[title="Show products in category Accessories"]`)[0]
        expect( await desc.getText()).toBe("Desktops");
        expect( await note.getText()).toBe("Notebooks");
        expect( await acs.getText()).toBe("Accessories");

    })
    it(`Verify that allows sorting items (different options)`,async()=>{
        const acs1= await $$(`a[title="Show products in category Accessories"]`)[0]

        await acs1.click();
        await browser.pause(2000);
        const sortby= await $('#products-orderby');
        // await browser.click(');
        await sortby.selectByVisibleText('Price: Low to High');
        await browser.pause(2000);
        const prices = await browser.execute(() => {
            const elements = document.querySelectorAll('.prices .price');
            return Array.from(elements).map((element) => parseFloat(element.textContent.replace('$', '')));
          });
        const sortedPrices = await prices.slice().sort(function compareNumbers(a, b) {
            return a - b;
          })
        expect(prices).toStrictEqual(sortedPrices);
        await sortby.selectByVisibleText('Name: A to Z');
         const names = await browser.execute(() => {
                const elements = document.querySelectorAll('.product-item .product-title');
                return Array.from(elements).map((element) => element.textContent);
             });
        const sortName=  names.slice().sort();
        expect(names).toStrictEqual(sortName);

    })
      it(`Verify that allows changing number of items on page`,async()=>{
        const dropSize= await $(`#products-pagesize`);
        await dropSize.selectByVisibleText("4");
        let count = await $$('[class="item-box"]')
        expect(count.length).toBe(4)
        await dropSize.selectByVisibleText("8");
        count = await $$('[class="item-box"]')
        expect(count.length).toBe(7)
       

    })
    it(`Verify that allows adding an item to the Wishlist`,async()=>{
        const prod= await $(`[href="/copy-of-tcp-self-paced-training"]`);
        await prod.click();
        await browser.pause(2000);
        const butW= await $(`input[id="add-to-wishlist-button-62"]`);
        await butW.click();
        await browser.pause(2000);
        const wish= await $$(`[href="/wishlist"]`)[0];
        await wish.click();
        await browser.pause(2000);
        const qw= await $(`input[class="qty-input valid"] `);
        const rows =await $$('[class="cart-item-row"]');
        const columns = rows[0].$$('td'); 
        

       const numberOfWishes=await columns[3].getText();


        expect(numberOfWishes).toBe("TCP Public MT/AT")
        

    })
    it(`Verify that allows adding an item to the card`,async()=>{
        await browser.url("https://demowebshop.tricentis.com/copy-of-tcp-self-paced-training");
        
        const addButton= await $(`#add-to-cart-button-62`);
        await addButton.click();
        await browser.pause(2000);
        const card= await $(`[href="/cart"]`);
        await card.click();
        await browser.pause(2000);
        const rows1 =await $$('[class="cart-item-row"]');
        const columns1 = rows1[0].$$('td'); 
        

       const nameofprod=await columns1[2].getText();


        expect(nameofprod).toBe("TCP Public MT/AT")
        
    })

    it(`Verify that allows removing an item from the card`,async()=>{

        const chB= await $(`[name="removefromcart"]`);
        await chB.click();
        const upB= await $(`[name="updatecart"]`);
        await upB.click();
        await browser.pause(2000);
        const text=await $(`[class="order-summary-content"]`);
        expect(await text.getText()).toBe("Your Shopping Cart is empty!")      

    })

    it(`Verify that allows checkout an item `,async()=>{

        await browser.url("https://demowebshop.tricentis.com/copy-of-tcp-self-paced-training");
        
        const addButton= await $(`#add-to-cart-button-62`);
        await addButton.click();
        await browser.pause(2000);
        const card= await $(`[href="/cart"]`);
        await card.click();
        await browser.pause(2000);
        const term= await $('[id="termsofservice"]');
        await term.click();
        const but=await $('[id="checkout"]')
        await but.click();
        await browser.pause(2000);
        await(await $('[id="billing-address-select"]')).selectByVisibleText('New Address')
        await browser.pause(1000);
        const dropC= await $('[id="BillingNewAddress_CountryId"]');
        await dropC.selectByIndex(1);
        await (await $('[id="BillingNewAddress_City"]')).setValue("city");
        await (await $('[id="BillingNewAddress_Address1"]')).setValue("Adress");
        await (await $('[id="BillingNewAddress_ZipPostalCode"]')).setValue(45678);
        await (await $('[id="BillingNewAddress_PhoneNumber"]')).setValue(1067);
        
        await(await $$('[class="button-1 new-address-next-step-button"]')[0]).click();
        await browser.pause(1000);
        await(await $$('[class="button-1 new-address-next-step-button"]')[1]).click();
        await browser.pause(1000);
        await(await $('[class="button-1 shipping-method-next-step-button"]')).click();
        await browser.pause(1000);
        await(await $('[class="button-1 payment-method-next-step-button"]')).click();
        await browser.pause(1000);
        await(await $('[class="button-1 payment-info-next-step-button"]')).click();
        await browser.pause(1000);
        await(await $('[class="button-1 confirm-order-next-step-button"]')).click();
        await browser.pause(1000);
        expect(await(await $('[class="title"]')).getText()).toBe('Your order has been successfully processed!')






    })




})

