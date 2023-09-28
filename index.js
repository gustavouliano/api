const express = require('express');
const amqp = require('amqplib');

const app = express();
const PORT = process.env.PORT || 3000;
var channel, connection;

async function connectQueue(){
    try{
        connection = await amqp.connect('amqp://rabbitmq');
        channel = await connection.createChannel();
        await channel.assertQueue('email-queue');
    }catch (err){
        console.log(err);
    }
}

async function sendData(data){
    await channel.sendToQueue('email-queue', Buffer.from(JSON.stringify(data)));
}

app.get('/send-email', async(req, res) => {
    if (!channel){
        await connectQueue();
    }
    const data = {
        email: 'a',
        name: 'bb'
    }
    sendData(data);
    console.log('Mensagem enviada para fila');
    res.send('Mensagem enviada');
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
