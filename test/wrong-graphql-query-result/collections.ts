import type { CollectionConfig } from '../../packages/payload/src/collections/config/types'

export const ShopsCollection: CollectionConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
    },
  ],
  slug: 'shops',
  access: { read: () => true },
}

export const ItemsCollection: CollectionConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'itemTags',
      type: 'relationship',
      relationTo: 'itemTags',
      hasMany: true,
    },
  ],
  slug: 'items',
  access: { read: () => true },
}

export const ItemTagsCollection: CollectionConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  slug: 'itemTags',
  access: { read: () => true },
}
