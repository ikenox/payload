import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { ItemTagsCollection, ItemsCollection, ShopsCollection } from './collections'

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [ShopsCollection, ItemsCollection, ItemTagsCollection],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },

  onInit: async (payload) => {
    const tag = await payload.create({
      collection: 'itemTags',
      data: { name: 'tag1' },
    })
    const item = await payload.create({
      collection: 'items',
      data: { name: 'item1', itemTags: [tag.id] },
    })
    const shop = await payload.create({
      collection: 'shops',
      data: { name: 'shop1', items: [item.id] },
    })
  },
})
