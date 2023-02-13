const MODULE_PATH = "C:\\Users\\ASUS\\AppData\\Roaming\\npm\\node_modules\\";

const qrcode = require(MODULE_PATH+"qrcode-terminal");
const { Client, LocalAuth } = require(MODULE_PATH+"whatsapp-web.js"); 


class Bot extends Client{
	#commands={
		toTagAll: "@"+"all" || "."+"all"
	};


	constructor(id, sessionPath){
		super({
			puppeteer:{
				args: ["--disable-setuid-sandbox"]
			},
			authStrategy: new LocalAuth({
				clientId: id,
				sessionDir: sessionPath
			})
		});
	}
	init(){
		this.on("qr", (qr)=>{
			qrcode.generate(qr, {small:true});
		});

		this.on("authenticated", ()=>{
			this.on("ready", async ()=>{
				const contacts = await this.getContacts();
				let contact = await contacts.find((e)=>e.name=="ANDY");
				//console.log(contact);
				console.log("Client is ready!");
				let contactId = contact.id._serialized;
				await this.sendMessage(contactId, "Client is ready!");
			})
		})


		this.initialize();
	}
	sendMsg(){
		this.on("message", (msg)=>{
			if(msg.body === this.#commands.toTagAll+" "+"ANDY") msg.reply("Hello, I'm in under development!");
		})
	}

	mentionAll(){
		this.on("message", async (msg)=>{
			let chat = await msg.getChat();
			if(msg.body.startsWith(this.#commands.toTagAll) && chat.isGroup && chat.name==="Testing Bot"){
			console.log(msg);
			
			let text = "";
			let mentions = [];

			for(let participant of chat.participants){
				let id = await participant.id._serialized;
				const contact = await this.getContactById(id);
				mentions.push(contact);
				text += `@${participant.id.user}`
			}

			await chat.sendMessage(text, { mentions });				
			}

		})
	}
}

module.exports = Bot;


