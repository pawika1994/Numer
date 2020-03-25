const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://pawika_tm:mm19941999@cluster0-gx8hy.azure.mongodb.net/cinema?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db