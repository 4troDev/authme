const fs = require("fs")
const Cryptr = require("cryptr")
const cryptr = new Cryptr("-3Lu)g%#11h7FpM?")

let prev = false

fs.readFile("hash.md", "utf-8", (err, content) => {
	if (err) {
		console.log("The hash.md fle dont exist!")

		document.querySelector("#title").textContent = "Please choose your exported file"
	} else {
		prev = true

		let decrypted = cryptr.decrypt(content)

		processdata(decrypted)
	}
})

let save = () => {
	const encryptedString = cryptr.encrypt(save_text)
	fs.writeFile("hash.md", encryptedString, (err) => {
		if (err) {
			console.log("Hash not created!")
		} else {
			console.log("Hash created")
			document.querySelector("#save").textContent = "Config saved"
			setTimeout(() => {
				document.querySelector("#save").style.display = "none"
			}, 1000)
		}
	})
}
