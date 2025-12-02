import express from 'express'

const startServer = (app: express.Application, port: number) => {
  if (process.env.NODE_ENV === 'production') {
    app.listen(port, () => console.log(`Server running at port: ${port} !`))
  } else if (process.env.NODE_ENV === 'development') {
    app.listen(port, () => {
      console.log(`Server running at: http://localhost:${port} !`)
      console.log(`Swagger UI available at: http://localhost:${port}/swagger`)
    })
  } else {
    console.error(
      'Cannot set NODE_ENV, check your package.json file in scripts section'
    )
  }
}

export default startServer
