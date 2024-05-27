import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

export const tagsSlug = 'tags'

export const TagsCollection: CollectionConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'visible',
      type: 'checkbox',
    },
  ],
  slug: tagsSlug,
  access: {
    read: (args) => ({
      visible: {
        equals: true,
      },
    }),
  },
}
