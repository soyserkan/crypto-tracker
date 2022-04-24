import amqp from "amqplib/callback_api";

class QueueService {
    private _channel?: amqp.Channel;

    get channel() {
        if (!this._channel) {
            throw new Error('Cannot access RabbitMQ channel before connecting');
        }

        return this._channel;
    }
    connect(url: string) {
        var self = this;
        return new Promise((resolve, reject) => {
            amqp.connect(url, function (error0, connection) {
                if (error0) {
                    reject(error0);
                }
                if (connection) {
                    connection.createChannel(function (error1, conn_channel) {
                        if (error1) {
                            reject(error1);
                        }
                        self._channel = conn_channel;
                        resolve(conn_channel);
                    });
                    connection.on("error", function (err) {
                        reject("[AMQP] connection error " + err);
                    });
                    connection.on("close", function () {
                        reject("[AMQP] connection closed");
                    });

                }
            });
        })
    }
    publish(queueName: string, data: any) {
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                if (self.channel) {
                    console.log("new queue published => " + queueName);
                    self.channel.assertQueue(queueName, { durable: true });
                    resolve(self.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data))));
                } else {
                    reject("channel not defined");
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}
export const queueService = new QueueService();
