"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
class KafkaConfig {
    kafka;
    producer;
    admin;
    constructor(brokers) {
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'my-app',
            brokers: brokers
        });
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }
    async connect() {
        try {
            await this.producer.connect();
            await this.admin.connect();
        }
        catch (error) {
            throw new Error(`Error connecting to Kafka: ${error.message}`);
        }
    }
    async createTopic(topic) {
        try {
            const topicExists = await this.admin.listTopics();
            if (!topicExists.includes(topic)) {
                await this.admin.createTopics({
                    topics: [{ topic }]
                });
            }
            console.log(`Topic ${topic} created successfully`);
        }
        catch (error) {
            throw new Error(`Error creating topic: ${error.message}`);
        }
    }
    async disconnect() {
        await this.producer.disconnect();
        await this.admin.disconnect();
    }
    async sendMessage(topic, message) {
        await this.producer.send({
            topic: topic,
            messages: [
                { value: message }
            ]
        });
    }
}
exports.default = new KafkaConfig(['localhost:9092']);
