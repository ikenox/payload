import payload from '../../packages/payload/src'
import { devUser } from '../credentials'
import { initPayloadTest } from '../helpers/configHelpers'
import { postsSlug } from './collections/Posts'

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

  it('local API example', async () => {
    // save draft
    const post1 = await payload.create({
      collection: postsSlug,
      draft: true,
      data: {
        text: 'post1',
      },
    })
    // save draft again
    await payload.update({
      collection: postsSlug,
      draft: true,
      id: post1.id,
      data: { text: 'post1-2' },
    })
    // publish
    await payload.update({
      collection: postsSlug,
      id: post1.id,
      data: { text: 'post1-3', tag: ['tag1'], _status: 'published' },
    })

    const versions = await payload.findVersions({
      collection: postsSlug,
      draft: true,
      where: { parent: { equals: post1.id } },
      sort: 'id',
    })
    expect(versions.docs.map(({ id, version: { tag } }) => ({ id, tag }))).toStrictEqual([
      { id: 1, tag: [] },
      { id: 2, tag: [] },
      { id: 3, tag: ['tag1'] },
    ])
  })
})
