import path from 'path';
import fs from 'fs';
import https from 'https';
import Koa from 'koa';
import enforceHttps from 'koa-sslify';
import route from 'koa-route';
// import statics from 'koa-static';
const app = new Koa();

const port = 8080;

// console.log('static', path.join(__dirname, './src/static'));
// console.log('set port:' + process.env.PORT + '; ip:' + process.env.IP);

// const source = async () => await serve(path.join(__dirname, './src/static'));

// app.use(source);

async function main(ctx) {
    ctx.response.type = 'html';
    ctx.response.body = await fs.createReadStream('./src/index.html');
}
async function view(ctx) {
    ctx.response.type = 'html';
    ctx.response.body = await fs.createReadStream('./src/view.html');
}
async function statics(ctx) {
    ctx.response.body = await fs.createReadStream(path.join(__dirname, ctx.url));
}

app.use(route.get('/', main));
app.use(route.get('/view', view));
app.use(route.get('/node_modules/*', statics));

// app.listen(port);
const options = {
    key: fs.readFileSync('./private.pem'),
    cert: fs.readFileSync('./file.crt')
};

const server = https.createServer(options, app.callback()).listen(port);


import ws from 'ws';
const WebSoket = ws.Server;

const wss = new WebSoket({server});
const room = {};
wss.on('connection', function connection(ws){
    ws.on('message', function incoming(message) {
        const msg = message.match(/type=(.+),(.+)/) || [];
        // console.log(msg);
        if(msg[1] === 'offer') {
            room.offer = message;
        } else if(msg[1] === 'answer') {
            ws.send(room.offer);
        }
        // ws.send(message);
    });
    ws.send('ws-connected');
});
