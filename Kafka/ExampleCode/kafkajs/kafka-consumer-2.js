const { Kafka, CompressionTypes, CompressionCodecs } = require('kafkajs')
//const ZstdCodec = require('@kafkajs/zstd')

//CompressionCodecs[CompressionTypes.ZSTD] = ZstdCodec()

const kafka = new Kafka({
    clientId: "kafkauser01",
    brokers: ['kafka-external.kanomnutt.site:443'],
    ssl: true,
    sasl: {
      mechanism: "SCRAM-SHA-512",
      username: "kafkauser01",
      password: "clq2QJwZ5ReWsczgZDpqX6GgoKfXJi1B"
    },
  });

const consumer = kafka.consumer({ groupId: 'kafkauser01-group-js' });

const run = async () => {
    console.log("* * * [Consumer] Connecting to Kafka Server");
    await consumer.connect();
    console.log('Connected');
    console.log('* * * [Consumer] Subscribing * * *');
    await consumer.subscribe({ topic: 'kafkatopic02', fromBeginning: true });
    console.log('Subscribed');
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Received Message');
            console.log({
                value: message.value.toString(),
                //compression: CompressionTypes.ZSTD,
                timestamp: message.timestamp,
                headers: message.headers
            });
        }
    });
};

run().catch((err) => {
    console.error(err)
})