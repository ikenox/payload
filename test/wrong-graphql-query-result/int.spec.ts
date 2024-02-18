import { GraphQLClient } from 'graphql-request'

import { initPayloadTest } from '../helpers/configHelpers'
import configPromise from './config'

let client: GraphQLClient

describe('minimum reproducible: wrong graphql query result', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const { serverURL } = await initPayloadTest({ __dirname, init: { local: false } })
    const config = await configPromise
    const graphqlUrl = `${serverURL}${config.routes.api}${config.routes.graphQL}`
    client = new GraphQLClient(graphqlUrl)
  })

  it('should return correct response', async () => {
    for (let i = 0; i < 100; i++) {
      const query = `
        query {
          Shops {
            docs {
              name
              items {
                name
              }
            }
          }
          Items {
            docs {
              name
              itemTags {
                name
              }
            }
          }
        }`
      const response = await client.request(query)
      console.log('response ', i)
      expect(response).toStrictEqual({
        Shops: { docs: [{ name: 'shop1', items: [{ name: 'item1' }] }] },
        Items: { docs: [{ name: 'item1', itemTags: [{ name: 'tag1' }] }] },
      })
    }
  })
})
