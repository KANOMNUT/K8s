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
  await consumer.connect();
  await consumer.subscribe({ topic: 'kafkatopic02', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),
//        compression: CompressionTypes.ZSTD,
        value: message.value.toString(),
        headers: message.headers,
      })
    },
  })
}

run().catch((err) => {
  console.error(err)
})
