module.exports = ({ app, express }) => {
  express.useRoutes = async (path) => {

    // Import Routes
    const apiRoute  = require(`${path}/apiRoute`)
    const rootRoute = require(`${path}/rootRoute`)

    // Using Routes
    app.use('/api', apiRoute)

    // rootRoute (Always at second last)
    app.use('/', rootRoute)

    // Frontend Routes (Always at last)
    app.use('*', async (req, res) => { res.sendFile(`${process.cwd()}/dist/index.html`) })

  }
}
