import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import express from 'express'

import payload from '../../packages/payload/src'
import { devUser } from '../credentials'
import { initPayloadTest } from '../helpers/configHelpers'
import { postsSlug } from './collections/Posts'

require('isomorphic-fetch')

let apiUrl

const headers = {
  'Content-Type': 'application/json',
}
describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const app = express()
    const { serverURL, payload } = await initPayloadTest({
      __dirname,
      init: {
        express: app,
      },
    })

    const server = new ApolloServer({ schema: payload.schema })
    await server.start()

    app.use('/merged-graphql', express.json(), expressMiddleware(server))

    apiUrl = `${serverURL}/merged-graphql`
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy(payload)
    }
  })

  it('graphQL query', async () => {
    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        query: 'query Test { Users { docs { id } } }',
        operationName: 'Test',
      }),
      headers,
    }).then((res) => res.json())

    console.log(response['errors'])
    expect(response['data']['Users']).not.toBeNull()
  })
})
