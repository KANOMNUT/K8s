const readline = require('readline');
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

const produceMessages = async (count) => {
  try {
    await producer.connect()

    for (let i = 1; i <= count; i++) {
      const key = String(i)
      const value = `Message ${i}`
      await producer.send({
        topic: 'kafkatopic02',
        //compression: CompressionTypes.ZSTD,
        messages: [{ key, value }],
      })
    }
  } catch (err) {
    console.error(`Failed to send message: ${err}`)
  } finally {
    await producer.disconnect()
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the number of messages to produce: ', async (count) => {
  await produceMessages(parseInt(count))
  rl.close()
})
