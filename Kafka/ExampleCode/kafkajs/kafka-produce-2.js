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

const producer = kafka.producer()
async function run() {
    console.log(" * * * Connection to Kafka Server * * * ");
    await producer.connect();
    console.log("Producer connected.");
    console.log('\n');

    const message = {
        key: "key1",
        value: "Test",
    };

    console.log("* * * Sending message to Kafka Server * * *");
    await producer.send({
        topic: 'kafkatopic02',
        messages: [message],
    });
    console.log('Producer sent the message');
    console.log('\n');

    await producer.disconnect();
    console.log('Disconnected from Producer');
    console.log('\n');
}

run().catch((e)  =>  console.error('[example/producer] ${e.message}',e));