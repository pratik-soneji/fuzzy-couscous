import { isSuperAdmin } from '@/lib/access';
import { Tenant } from '@/payload-types';
import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;

      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

      return Boolean(tenant?.stripeDetailsSubmitted);
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  // This hook handles the auto-assignment for the field injected by the plugin
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (operation === 'create' && !data.tenant) {
          const userTenant = req.user?.tenants?.[0]?.tenant;
          if (userTenant) {
            return {
              ...data,
              tenant: typeof userTenant === 'object' ? userTenant.id : userTenant,
            };
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'In US dollar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'refundPolicy',
      type: 'select',
      options: ['30-days', '14-days', '7-days', '3-days', '1-days', 'no-refunds'],
      defaultValue: '30-days',
    },
    {
      name: 'content',
      // TODO: Change to RichText
      type: 'textarea',
      admin: {
        description:
          'Protected content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting',
      },
    },
    // DO NOT add the 'tenant' field here.
    // The multiTenantPlugin adds it automatically because of your config.
  ],
};
