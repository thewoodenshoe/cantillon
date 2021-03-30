const telegram = require('./telegram')
const axios = require('axios')
const fs = require('fs')

let oldInventory = ''
let oldHandle = ''
let oldLockStatus = ''
let oldPayload = ''
let msg = ''
let myFlag = 0

const downloadURL = async () => {
    try {
        let payload = await axios.get('https://cantillon.craftpeak.shop/')
        return payload.data
    } catch (error) {
        console.error(error)
    }
}

const runCompare = async (payload) => {
    try {
        //let payload = await downloadURL()       
        if (oldPayload != '') { // skip the init
            if (myFlag == 0) {
                if (oldPayload != payload) {
                    msg = "Cantillon.craftpeak.shop changed!"
                    fs.writeFile('cantillon_change.html', payload, function (err) {
                        if (err) return console.log(err)
                    })
                } 
               myFlag = 1
            }
        }
        oldPayload = payload
    }
    catch (error) {
       console.error(error)
       oldPayload = payload
    }
}

module.exports.downloadURL = downloadURL
module.exports.runCompare = runCompare