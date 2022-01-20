const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const PORT = config.get('port') || 5000


const app = express()

app.use(express.json({ extanded: true }))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'pruduction') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
async function start() {
    try {
        await mongoose.connect(config.get('mongourl'), {})
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log(`Server error ${e.message}`);
        process.exit(1)
    }
}
start()