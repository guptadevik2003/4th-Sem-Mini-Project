module.exports = ({ app, express }) => {
  express.appConfig = async (path) => {

    app.use(express.static(`${path}/dist`))

    app.use(express.json({ limit: '50mb' }))

    app.use(express.urlencoded({ extended: false, limit: '50mb' }))

  }
}
