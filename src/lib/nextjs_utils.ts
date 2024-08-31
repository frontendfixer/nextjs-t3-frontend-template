import { Metadata } from "next/types"
import { env } from "~/env"

export function constructMetadata({
  title = 'Next.js template with T3 App',
  description = 'Generated Next.js app with T3 App and other tools',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@witht3stack',
    },
    icons,
    metadataBase: new URL(env.NODE_ENV === "development"? env.LOCAL_FRONTEND_URL : env.PRODUCTION_FRONTEND_URL),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}