import {start, setData} from "../emulator/Emulator";
import {reset, checkUndo} from "../util";
import {findComponentsTest} from "react-functional-test";
import {hasKey, hasNoKey, newField, remove, save, selectKey, setJSON} from "../pageActions";

describe.only('Multi-client functionality.', () => {

    before(() => {

        start();

        browser.newWindow('http://localhost:8200/?test');

    });

    beforeEach(() => {

        reset();

        browser.switchTab();
        browser.url('http://localhost:8200/?test');

        browser.waitForExist('button=Go');
        browser.element('button=Go').click();

        browser.waitUntil(() => findComponentsTest('KeyList').length, 2000);


        browser.switchTab();
        browser.url('http://localhost:8200/?test');


        browser.waitForExist('button=Go');
        browser.element('button=Go').click();

        browser.waitUntil(() => findComponentsTest('KeyList').length, 2000);

    });


    it('should be able to connect both clients', () => {});

    it('update keys from emulator', () => {

        setData({
            myKey: [0, 1, 2, 3, 4]
        });


        hasKey('myKey');

        browser.switchTab();

        hasKey('myKey');

        setData({});

        browser.switchTab();

        hasNoKey('myKey');

        browser.switchTab();

        hasNoKey('myKey');


        setData({
            helloworld: [9, 8, 7, 6, 5]
        });

        browser.switchTab();

        hasKey('helloworld');

        browser.switchTab();

        hasKey('helloworld');

    });


    it('should send new keys from one client to the other', () => {

        newField('newfield', 'JSON Data');
        save();

        browser.switchTab();

        hasKey('newfield');

    });


    it('should communicate deletion of keys from one client to the other', () => {

        setData({
            removeMe: [9, 2, 3]
        });


        remove('removeMe');

        save();

        browser.switchTab();

        hasNoKey('removeMe');

    });


    it('should communicate complex changes', () => {

        setData({
            hello: [9, 1, 2],
            world: [8, 8, 8],
            aKey: [9, 5, 3]
        });

        remove('hello');

        newField('newfield', 'JSON Data');
        newField('sometext', 'Plain Text');

        save();

        browser.switchTab();

        hasNoKey('hello');
        hasKey('newfield');
        hasKey('sometext');

    });


    it.only('should have a refresh button for object type', () => {

        newField('json', 'JSON Data');

        setJSON('{}');

        save();


        // Switching tabs isnt working
        browser.switchTab();

        selectKey('json');

        setJSON('[ 1, 2, "crazy text"]');

        save();

        browser.switchTab();

        refresh('json');

        browser.waitForExist('span*=crazy text');

    });


    it('should have a refresh button for text type', () => {

    });

});