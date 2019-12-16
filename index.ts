import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    LogService
} from "matrix-bot-sdk";
import {LogWrapper} from "./LogWrapper";
import {
    readdirSync,
    readFileSync,
    writeFileSync,
} from "fs";

const contentRaw = readFileSync('gullivers.txt', 'utf-8');
const content = contentRaw.split('\n');

//console.log(content);
const config = require("./config/config.json");
var currentLine = config.currentLine;
const storage = new SimpleFsStorageProvider("config/storage.json");
//console.log(config); process.exit();
const client = new MatrixClient(config.homeserver, config.accessToken, storage);
const logWrapper = new LogWrapper();
LogService.setLogger(logWrapper);
AutojoinRoomsMixin.setupOnClient(client);

console.log("starting...");
client.start().then(async () => {
    console.log("Client started!");

    client.setDisplayName(config.title);
    const rooms = await client.getJoinedRooms();
    for (let roomId of rooms) {
        await client.sendText(roomId, config.title);
    }
    if (currentLine < config.startLine) {currentLine = config.startLine;}
    sendMessage();
});

async function sendMessage() {
    const messageText = content[currentLine].trim();
    if (messageText.length > 0) {
        console.log(`Sending message${messageText}`);
        const rooms = await client.getJoinedRooms();
        for (let roomId of rooms) {
            console.log(roomId);
            await client
                .sendText(roomId, content[currentLine])
                .catch((err) => {console.log(err)});
        }
    }
    
    currentLine++;

    setTimeout(() => {
        sendMessage().catch((err) => {console.log(err)}); 
    }, 10 * 1000);
}