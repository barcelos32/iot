var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || '+/sensores/+/up';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || 'mqtts://35.198.8.16';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;
config.mqtt.user      = process.env.MQTT_USER      || 'barcelos32';
config.mqtt.password  = process.env.MQTT_PASSWORD  || 'sonyk800';
config.mqtt.cafile    = process.env.MQTT_CAFILE    || 'mqtt-ca.pem';

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || 'localhost';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'mqtt';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';

module.exports = config;
