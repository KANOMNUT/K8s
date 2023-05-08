from kafka import KafkaConsumer
import logging

bootstrap_servers = 'kafka-external.kanomnutt.site:443'
security_protocol = 'SASL_SSL'
sasl_mechanism = 'SCRAM-SHA-512'
sasl_plain_username = 'kafkauser01'
sasl_plain_password = 'clq2QJwZ5ReWsczgZDpqX6GgoKfXJi1B'
topic = 'kafkatopic02'
group_id = 'kafkauser01-group'

logging.basicConfig(level=logging.INFO)

# Create Kafka consumer instance
try:
    consumer = KafkaConsumer(
        topic,
        group_id=group_id,
        bootstrap_servers=bootstrap_servers,
        security_protocol=security_protocol,
        sasl_mechanism=sasl_mechanism,
        sasl_plain_username=sasl_plain_username,
        sasl_plain_password=sasl_plain_password,
        value_deserializer=lambda x: x.decode('utf-8'),
        key_deserializer=lambda x: x.decode('utf-8'),
        auto_offset_reset='latest',
        enable_auto_commit=True
    )
    logging.info('Consumer connected to Kafka...')
except Exception as e:
    logging.error('Failed to connect to Kafka: %s', e)
    exit(1)

# Consume messages from Kafka topic
try:
    for message in consumer:
        logging.info('Received message from Kafka (offset=%d): %s', message.offset, message.value)
except Exception as e:
    logging.error('Failed to consume messages from Kafka: %s', e)

finally:
    # Close the Kafka consumer
    consumer.close()
    logging.info('Consumer closed.')
