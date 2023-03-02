const WebHooks = require('node-webhooks')
const express = require('express')

const app = express()
const port = process.env.PORT || 5400

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/hook', (req, res) => {
  console.log(req.body);
  res.status(200).end()
})

app.listen(port, () => {
  const webHooks = new WebHooks({
    db: { 'addPost': ['http://localhost:5400/posts'] }
  })
  
  webHooks.add('test', 'http://192.168.100.220:8000/api/v3/admin/indicators/markets').then(function(data) {
    console.log(data);
  })

  webHooks.trigger('test1', {data: 123})
  
  console.log(`Webhook corriendo en el puerto ${port}`);
})
