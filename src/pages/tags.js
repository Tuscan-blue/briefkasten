import { getServerSession } from 'next-auth/next'
import { useStore, initializeStore } from '@/lib/store'
import Head from 'next/head'
import Layout from '@/components/layout'
import Sidebar from '@/components/sidebar'
import { authOptions } from './api/auth/[...nextauth]'
import prisma from '@/lib/prisma'

export default function Tags() {
  const categories = useStore((state) => state.categories)
  const tags = useStore((state) => state.tags)
  return (
    <Layout>
      <Head>
        <title>Briefkasten | Tags</title>
      </Head>
      <Sidebar categories={categories} tags={tags} />
      <div className="flex flex-col space-y-4">
        <section>
          <ul>
            {tags &&
              tags.map((tag) => (
                <li key={tag.id}>
                  <span className="mr-2">{tag.name}</span>
                  <svg
                    className={`inline h-6 w-6`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const nextauth = await getServerSession(context, authOptions)
  const zustandStore = initializeStore()

  if (!nextauth) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  const categories = await prisma.category.findMany({
    where: {
      userId: nextauth.user.userId,
    },
  })
  const tags = await prisma.tag.findMany({
    where: {
      userId: nextauth.user.userId,
    },
  })

  zustandStore.getState().setCategories(categories)
  zustandStore.getState().setTags(tags)

  return {
    props: {
      nextauth,
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  }
}
