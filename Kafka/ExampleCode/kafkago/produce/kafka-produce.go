package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/segmentio/kafka-go"
	"github.com/segmentio/kafka-go/sasl/scram"
)

type KafkaConfig struct {
	Username string
	Password string
}

func main() {
	config := KafkaConfig{
		Username: "kafkauser01",
		Password: "clq2QJwZ5ReWsczgZDpqX6GgoKfXJi1B",
	}
	kafkaAddress := "kafka-external.kanomnutt.site:443"
	focusTopic := "kafkatopic01"

	mechanism, err := scram.Mechanism(scram.SHA512, config.Username, config.Password)
	if err != nil {
		panic(err)
	}

	writer := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{kafkaAddress},
		Topic:   focusTopic,
		Dialer: &kafka.Dialer{
			Timeout:       10 * time.Second,
			DualStack:     true,
			SASLMechanism: mechanism,
		},
	})

	message := kafka.Message{
		Key:   []byte("2"),
		Value: []byte("Hello, world"),
	}

	ctx := context.Background()
	err = writer.WriteMessages(ctx, message)
	if err != nil {
		fmt.Printf("Error sending message: %v\n", err)
	}

	writer.Close()
	log.Printf("Message sent to Kafka: %s\n", message.Value)

}
