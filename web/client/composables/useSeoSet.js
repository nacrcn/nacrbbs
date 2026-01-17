// composables/useSeoSet.ts

export const useSeoSet = ({
  title,
  keywords,
  description,
  icon,
  image
} = {}) => {


  // 默认值处理
  title = title
  keywords = keywords
  description = description
  icon = icon
  image = image


  useHead({
    title,
    titleTemplate: (t) => t ? `${t}` : '',
    meta: [
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'robots1', name: 'robots', content: 'index, follow' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      {
        rel: 'icon',
        type: 'image/png',
        href: icon // 你传进来的图片地址
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: image
      },
      { hid: 'keywords', name: 'keywords', content: keywords }
    ]
  })
}