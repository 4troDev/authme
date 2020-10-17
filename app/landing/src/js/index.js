const { ipcMain } = require("electron")
const bcrypt = require("bcrypt")
const fs = require("fs")
const electron = require("electron")
const ipc = electron.ipcRenderer
const path = require("path")

let text = document.querySelector("#text")

const file_path = path.join(process.env.APPDATA, "/Levminer/Authme")

//? match passwords
let match_passwords = () => {
	let password_input1 = document.querySelector("#password_input1").value
	let password_input2 = document.querySelector("#password_input2").value

	if (password_input1 == password_input2) {
		console.log("Passwords match!")

		text.style.color = "green"
		text.textContent = "Passwords match! Please wait!"

		hash_password()
	} else {
		console.log("Passwords dont match!")

		text.style.color = "red"
		text.textContent = "Passwords don't match! Try again!"
	}
}

//? hash password
let hash_password = async () => {
	let password_input1 = document.querySelector("#password_input1").value

	const salt = await bcrypt.genSalt(10).then(console.log("Salt completed!"))

	const hashed = await bcrypt.hash(password_input1, salt).then(console.log("Hash completed!"))

	fs.writeFile(path.join(file_path, "pass.md"), hashed, (err) => {
		if (err) {
			console.log("Password file dont created!")
		} else {
			console.log("Password file created!")

			to_confirm()
		}
	})
}

//? no password
let no_password = () => {
	text.style.color = "green"
	text.textContent = "Please wait!"

	console.log(path.join(file_path, "nrpw.md"))

	fs.writeFile(path.join(file_path, "nrpw.md"), "nrpw", (err) => {
		if (err) {
			console.log("Not require password file don't created!")
		} else {
			console.log("Not require password Password file created!")

			to_application1()
		}
	})
}

//? to_confirm
let to_confirm = () => {
	console.log("Sending to confirm...")
	setInterval(() => {
		ipc.send("to_confirm")
	}, 3000)
}

//? to_application1
let to_application1 = () => {
	console.log("Sending to application1...")
	setInterval(() => {
		ipc.send("to_application1")
	}, 3000)
}
