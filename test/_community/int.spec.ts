import payload from '../../packages/payload/src'
import { devUser } from '../credentials'
import { initPayloadTest } from '../helpers/configHelpers'
import { postsSlug } from './collections/Posts'
import { tagsSlug } from './collections/Tags'

require('isomorphic-fetch')

let apiUrl
let jwt

const headers = {
  'Content-Type': 'application/json',
}
const { email, password } = devUser
describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const { serverURL } = await initPayloadTest({ __dirname, init: { local: false } })
    apiUrl = `${serverURL}/api`

    const response = await fetch(`${apiUrl}/users/login`, {
      body: JSON.stringify({
        email,
        password,
      }),
      headers,
      method: 'post',
    })

    const data = await response.json()
    jwt = data.token
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy(payload)
    }
  })

  // --__--__--__--__--__--__--__--__--__
  // You can run tests against the local API or the REST API
  // use the tests below as a guide
  // --__--__--__--__--__--__--__--__--__

  it('rest API example', async () => {
    const tag1 = await payload.create({
      collection: tagsSlug,
      data: { name: 'tag1', visible: false },
    })
    const tag2 = await payload.create({
      collection: tagsSlug,
      data: { name: 'tag2', visible: true },
    })

    await payload.create({
      collection: postsSlug,
      data: { text: 'post1', tags: [tag1.id, tag2.id] },
    })

    const query = () =>
      fetch(`${apiUrl}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
          query: `query {
          Posts {
            docs {
              text
              tags {
                name
              }
            }
          }
        }`,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

    const response = await query()
    // pass
    expect(JSON.parse(await response.text())).toStrictEqual({
      data: {
        Posts: {
          docs: [{ text: 'post1', tags: [{ name: 'tag2' }] }],
        },
      },
    })
  })
})
