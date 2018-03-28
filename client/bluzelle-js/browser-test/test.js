mocha.setup('bdd');

const requireContext = require.context('../../test', true, /\.test\.js/);
requireContext.keys().forEach(requireContext);

mocha.run();