const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  'lodash-es': 'lodash', 
};

module.exports = config;
