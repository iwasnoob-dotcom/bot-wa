const MODULE_PATH = "C:\\Users\\ASUS\\AppData\\Roaming\\npm\\node_modules\\";

const qrcode = require(MODULE_PATH+"qrcode-terminal");
const { Client, LocalAuth } = require(MODULE_PATH+"whatsapp-web.js"); 

const client = new Client({
	puppeteer: {
		args: ["--disable-setuid-sandbox"]
	}
});
client.on("qr", (qr)=>{
	qrcode.generate(qr, {small:true});
});
client.initialize();
