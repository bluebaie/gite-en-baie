import { MetadataRoute } from 'next'



export default function sitemap(): MetadataRoute.Sitemap {

  return [

    {

      url: 'https://gite-baie.com',

      lastModified: new Date(),

      changeFrequency: 'weekly',

      priority: 1,

    },

  ]

}