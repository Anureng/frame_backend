import { Kafka, Producer, Admin } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;

    constructor(brokers: string[]) {
        this.kafka = new Kafka({
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
        } catch (error: any) {
            throw new Error(`Error connecting to Kafka: ${error.message}`);
        }
    }

    async createTopic(topic: string) {
        try {
            const topicExists = await this.admin.listTopics();
            if (!topicExists.includes(topic)) {
                await this.admin.createTopics({
                    topics: [{ topic }]
                })
            }
            console.log(`Topic ${topic} created successfully`);
        } catch (error: any) {
            throw new Error(`Error creating topic: ${error.message}`);
        }
    }

    async disconnect() {
        await this.producer.disconnect();
        await this.admin.disconnect();
    }

    async sendMessage(topic: string, message: string) {
        await this.producer.send({
            topic: topic,
            messages: [
                { value: message }
            ]
        });
    }
}

export default new KafkaConfig(['localhost:9092'])