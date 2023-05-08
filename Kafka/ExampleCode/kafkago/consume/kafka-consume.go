package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/segmentio/kafka-go"
	"github.com/segmentio/kafka-go/sasl/scram"
)

type KafkaConfig struct {
	Username     string
	Password     string
	ConsumeGroup string
}

func main() {
	config := KafkaConfig{
		Username:     "kafkauser01",
		Password:     "clq2QJwZ5ReWsczgZDpqX6GgoKfXJi1B",
		ConsumeGroup: "kafkauser01-group",
	}
	log.Println("Consume group", config.ConsumeGroup, "service is ready...")

	go func() {

		kafkaAddress := "kafka.kanomnutt.site:443"
		focusTopic := "kafkatopic01"

		mechanism, err := scram.Mechanism(scram.SHA512, config.Username, config.Password)
		if err != nil {
			panic(err)
		}

		r := kafka.NewReader(kafka.ReaderConfig{
			Brokers: []string{kafkaAddress},
			GroupID: config.ConsumeGroup,
			Topic:   focusTopic,
			Dialer: &kafka.Dialer{
				Timeout:       10 * time.Second,
				DualStack:     true,
				SASLMechanism: mechanism,
			},
			MinBytes: 10e3,
			MaxBytes: 10e6,
			MaxWait:  1 * time.Second,
		})
		defer r.Close()

		ctx := context.Background()
		for {
			m, err := r.FetchMessage(ctx)
			if err != nil {
				fmt.Printf("%v - %v - Kafka: %v\n\n", focusTopic, config.ConsumeGroup, err)
				continue
			}
			fmt.Printf("message at topic/partition/offset %v/%v/%v: %s = %s\n", m.Topic, m.Partition, m.Offset, string(m.Key), string(m.Value))

			if err := r.CommitMessages(ctx, m); err != nil {
				fmt.Println("Kafka failed to commit messages:", err)
			}
		}

	}()

	c := make(chan os.Signal, 1)
	<-c
}
