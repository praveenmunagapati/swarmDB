const {observable, toJS, observe} = require('mobx');
const {forEach, includes} = require('lodash');
const {nodes} = require('./NodeStore');


const uuids = [];
const createDb = uuid => eval('db_' + uuid + '= observable.map({})');
const buildDbName = uuid => eval('db_' + uuid);

// Need to add `setup` call from js-library and crud client.
createDb('1234567890');
createDb('0000');

module.exports = {
    uuids: uuids,

    setup: ({uuid, request_id}) => {
        if (!includes(uuids, uuid)) {
            uuids.push(uuid);
            createDb(uuid);
        } else {
            ws.send(JSON.stringify(
                {
                    error: `Sorry, the uuid, ${uuid}, is already taken.`,
                    response_to: request_id
                }
            ));
        };
    },

    read: ({uuid, request_id, data:{key}}, ws) => {
        let data = buildDbName(uuid);

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
        let data = buildDbName(uuid);

        data.set(key, value);

        ws.send(JSON.stringify(
            {
                response_to: request_id
            }
        ));
    },

    has: ({uuid, request_id, data:{key}}, ws) => {
        let data = buildDbName(uuid);

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
        let data = buildDbName(uuid);

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
        buildDbName(uuid),
    setData: (uuid, obj) => {
        let data = buildDbName(uuid);

        data.clear();
        data.merge(obj);
    }
};
