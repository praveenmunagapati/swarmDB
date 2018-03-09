import {findComponentTest, findComponentsTest, addHooks} from 'react-functional-test';

describe('Basic WebDriverIO functionality', () => {

    it('has title Bluzelle', () => {
        browser.url('http://localhost:8200');
        expect(browser.getTitle()).to.equal('Bluzelle');
    });


    it('Can open two browser tabs.', () => {

        browser.url('http://localhost:8200');
        browser.newWindow('http://localhost:8200');

        const [firstWindow, secondWindow] = browser.getTabIds();

        // Tab IDs valid
        expect(firstWindow.length > 10);
        expect(secondWindow.length > 10);

        browser.close();
    });


    it('@watch should be able to fetch by react component', () => {
        browser.url('http://localhost:8200');
        browser.waitForExist('button=Go');
        browser.element('button=Go').click();
        browser.waitUntil(() => findComponentsTest('KeyList').length > 0);
    });

});
