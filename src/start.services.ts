import KafkaConfig from "../config/kafka.config";

export const init = async () => {
    try {
        await KafkaConfig.connect()
        await KafkaConfig.createTopic('post')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}