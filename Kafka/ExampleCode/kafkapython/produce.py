from kafka import KafkaProducer
#import zstandard as zstd


bootstrap_servers = 'kafka-external.kanomnutt.site:443'
security_protocol = 'SASL_SSL'
sasl_mechanism = 'SCRAM-SHA-512'
sasl_plain_username = 'kafkauser01'
sasl_plain_password = 'clq2QJwZ5ReWsczgZDpqX6GgoKfXJi1B'
topic = 'kafkatopic02'
message = 'Hello, Kafka!'


# Create Kafka producer instance
producer = KafkaProducer(
    bootstrap_servers=bootstrap_servers,
    security_protocol=security_protocol,
    sasl_mechanism=sasl_mechanism,
    sasl_plain_username=sasl_plain_username,
    sasl_plain_password=sasl_plain_password,
#    value_serializer=lambda x: zstd.ZstdCompressor(level=3).compress(x.encode('utf-8')),
    key_serializer=lambda x: str(x).encode('utf-8'),
#    compression_type='zstd'
)

# Produce a message to a Kafka topic with a key
num_loops = int(input("Enter the number of times to loop: "))
for i in range(num_loops):
    key = i
    producer.send(topic, key=key, value=message.encode('utf-8'))
#    producer.send(topic, key=key, value=message)
    print(i, 'Message sent to Kafka: ' , message)

# Wait for any outstanding messages to be transmitted and delivery reports received
producer.flush()

# Close the producer instance
producer.close()
