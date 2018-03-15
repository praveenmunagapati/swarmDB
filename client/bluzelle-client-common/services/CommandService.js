const commandProcessors = [];

export const addCommandProcessor = (name, fn) => commandProcessors[name] = fn;

export const receiveMessage = (data, node) => {
    const msg = (data.constructor !== {}.constructor) ? JSON.parse(data) : data;
    commandProcessors[msg.cmd] ? commandProcessors[msg.cmd](msg.data, node) : console.error(`${msg.cmd} has no command processor`)
};
