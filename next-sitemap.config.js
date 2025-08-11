/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://radix-ui-lab.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/api/*',
    '/admin/*',
    '/404',
    '/500',
    '/test-themes',
    '/reset-theme',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://radix-ui-lab.com/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different routes
    const priorities = {
      '/': 1.0,
      '/components': 0.9,
      '/docs': 0.8,
      '/playground': 0.7,
    };
    
    const priority = priorities[path] || 0.7;
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
};