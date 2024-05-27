import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { mediaSlug } from '../Media'
import { tagsSlug } from '../Tags'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  defaultSort: 'title',
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'associatedMedia',
      access: {
        create: () => true,
        update: () => false,
      },
      relationTo: mediaSlug,
      type: 'upload',
    },
    {
      name: 'tags',
      type: 'relationship',
      hasMany: true,
      relationTo: tagsSlug,
    },
  ],
  slug: postsSlug,
  access: {
    read: () => true,
  },
  // versions: {
  //   drafts: true,
  // },
}
