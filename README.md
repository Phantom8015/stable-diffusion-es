# stable-diffusion-es

This is an ES module for [Node.js](https://nodejs.org/en/) that provides uses Stable Diffusion to generate images from a given prompt using AI.

## Installation

```bash
npm install stable-diffusion-es
```

## Usage

```js
import AI from 'stable_diffusion-es';
import fs from 'fs';

let prompt = "A cat"

 AI.generate(prompt, async (result) => {
    if (result.error) {
        console.log(result.error)
        return;
    }
    try {
        for (let i = 0; i < result.results.length; i++) {
            let data = result.results[i].split(",")[1]
            const buffer = Buffer.from(data, "base64")
            const filename = `image_${i + 1}.png`
            fs.writeFileSync(filename, buffer)
        }
    } catch (e) {
        console.log(e)
    }
})
```
A trick to get better images is to add: 
```
{enhanced}
```
at the end of your prompt.
  

  
Make sure you have

```json
"type": "module"
```

in your package.json file.

## Output

![A cat](https://i.ibb.co/qnThjNb/image-2.jpg)



