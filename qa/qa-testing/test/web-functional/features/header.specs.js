describe('Web page header', () => {
    require('../getBaseElement')('header');

    it('@watch bluzelle logo should exist', () => {
        expect(browser.getAttribute('div>img', 'src')).to.contain('data');
    });
});
