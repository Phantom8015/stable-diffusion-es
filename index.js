import WebSocket from 'ws';

const API_URL = "wss://runwayml-stable-diffusion-v1-5.hf.space/queue/join"

function generateHash() {
    const chars = "qwertyuopasdfghjklizxcvbnm0123456789"
    let hash = ""
    for (let i = 0; i < 11; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)]
    }
    return {
        session_hash: hash,
        fn_index: 2
    }
}

function generate(givenPrompt, cb) {
    const client = new WebSocket(API_URL);
    const hash = generateHash()
    let prompt = givenPrompt + " 4k resolution, realistic, epic cinematic, detailed, vibrant lighting, vibrant background, in the mix of 3d cartoon and comic art styles"
    let tmr = setTimeout(() => {
        client.close()
        cb({
            error: true
        })
    }, 120000);

    client.on("open", () => {
        // console.log("Connected to Websocket!")
    })

    client.on("error",()=>{
        cb({
            error:true,
        })
    })

    client.on("message", (message) => {
        let msg = JSON.parse("" + message)
        if (msg.msg == "send_hash") {
            client.send(JSON.stringify(hash))
        } else if (msg.msg == "send_data") {
            let data = {
                data: [prompt],
                ...hash
            }
            client.send(JSON.stringify(data))
        } else if (msg.msg == "process_completed") {
            clearTimeout(tmr)
            console.log("Done!")
            try{
                const results = msg.output.data[0]
                cb({
                    error:false,
                    results
                })
            }catch(e){
                cb({
                    error:true,
                })
            }
            
        }

    })
}

export default {
    generate
}