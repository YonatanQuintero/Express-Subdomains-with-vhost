//require
const express = require('express')
const vhost = require('vhost')

//hosts
const root = express()
const app = express()
const admin = express()
const test = express()
const port = 80
const domain = 'investorcenter.company'

// Mount the extra apps on their subdomains
root.use(vhost(`test.${domain}`, test))
root.use(vhost(`app.${domain}`, app))
root.use(vhost(`admin.${domain}`, admin))

// This route will handle all the requests that are 
// not handled by any other route handler. In 
// this hanlder we will redirect the user to 
// an error page with NOT FOUND message and status
// code as 404 (HTTP status code for NOT found)
//root.all('*', (req, res) => res.status(404).send('<h1>404! Page not found</h1>'))

// a router for the test subdomain
root.get('/', (req, res) => res.send('Hello root!'))

// a router for the test subdomain
test.get('/', (req, res) => res.send('Hello test!'))

// a router for the app subdomain
app.get('/', (req, res) => res.send('Hello app!'))

// a router for the admin subdomain
admin.get('/', (req, res) => res.send('Hello admin!'))

//app.listen
root.listen(port, () => {
  console.log(`App listening at port ${port}`)
})