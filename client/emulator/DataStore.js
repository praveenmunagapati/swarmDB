const {observable, toJS, observe} = require('mobx');
const {forEach} = require('lodash');
const {nodes} = require('./NodeStore');


const uuids = observable.map({});
const createDb = uuid => uuids.set(uuid, observable.map({}));
const retrieveDb = uuid => uuids.get(uuid);

// Need to refactor
// createDb('1111');

module.exports = {
    uuids: uuids,

    setup: ({uuid, request_id}, ws) => {
        if (!uuids.has(uuid)) {
            createDb(uuid);

            console.log(`******* SETUP: DB created ${uuid}`)
        } else {
            console.log(`******* SETUP: ${uuid} in already in uuids ********`)
            // ws is undefined
            // ws.send(JSON.stringify(
            //     {
            //         error: `Sorry, the uuid, ${uuid}, is already taken.`,
            //         response_to: request_id
            //     }
            // ));
        };
    },

    read: ({uuid, request_id, data:{key}}, ws) => {
        let data = retrieveDb(uuid);

        if(data.has(key)) {

            ws.send(JSON.stringify(
                {
                    cmd: 'update',
                    data:
                        {
                            key,
                            value: data.get(key)
                        },
                    response_to: request_id
                }
            ));

        } else {

            ws.send(JSON.stringify(
                {
                    error: `Key "${key}" not in database.`,
                    response_to: request_id
                }
            ));

        }
    },

    update: ({uuid, request_id, data:{key, value}}, ws) => {
        let data = retrieveDb(uuid);

        data.set(key, value);

        ws.send(JSON.stringify(
            {
                response_to: request_id
            }
        ));
    },

    has: ({uuid, request_id, data:{key}}, ws) => {
        let data = retrieveDb(uuid);

        ws.send(JSON.stringify(
            {
                data: 
                    {
                        value: data.has(key)
                    },
                response_to: request_id
            }
        ));
    },

    'delete': ({uuid, request_id, data:{key}}, ws) => {
        let data = retrieveDb(uuid);

        if(data.has(key)) {

            data.delete(key);

            ws.send(JSON.stringify(
                {
                    response_to: request_id
                }
            ));

        } else {

            ws.send(JSON.stringify(
                {
                    error: `Key "${key}" not in database.`,
                    response_to: request_id
                }
            ));

        }

    },

    getData: (uuid) =>
        retrieveDb(uuid),
    setData: (uuid, obj) => {
        let data = retrieveDb(uuid);
        console.log(`******* SETDATA: uuid: ${uuid} *******`);
        data.clear();
        data.merge(obj);
    }
};
