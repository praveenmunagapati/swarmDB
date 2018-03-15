import {getLocalDataStore} from "./DataService";
import {commandQueue, currentPosition, removePreviousHistory, updateHistoryMessage} from "./CommandQueueService";
import {sendToNodes} from "bluzelle-client-common/services/CommunicationService";
import {mapValues, extend, reduce} from 'lodash';

const toSerializable = v =>
    v === 'deleted' ? v : toPlainArray(v);

const toPlainArray = typedArr => Array.from(typedArr);

const commandsToSave = () =>
    commandQueue.slice(0, currentPosition.get() + 1);

const addChangesFromCommand = (changes, command) =>
    extend(changes, command.onSave(changes));

const generateChanges = () =>
    reduce(commandsToSave(), addChangesFromCommand, {});

const buildRequest = changes => {
    const key = Object.keys(changes)[0];
    if (changes[key] === 'deleted') {
        return {
            cmd: 'delete',
            data:
                {
                    key: key,
                }
        }
    } else {
        return {
            cmd: 'update',
            data:
                {
                    key: key,
                    bytearray: changes[key]
                }
        }
    }
};

const clearEditingData = () => {
    const data = getLocalDataStore();
    data.keys().forEach(key => data.has(key) && data.get(key).clear());
};

export const save = () => {
    const changes = generateChanges();
    const request = buildRequest(changes);

    clearEditingData();

    sendToNodes(request.cmd, request.data);

    removePreviousHistory();
    updateHistoryMessage(<span>Saved.</span>);
};
