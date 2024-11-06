"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const kafka_config_1 = __importDefault(require("../config/kafka.config"));
const init = async () => {
    try {
        await kafka_config_1.default.connect();
        await kafka_config_1.default.createTopic('post');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.init = init;
