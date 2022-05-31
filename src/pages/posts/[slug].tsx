import { asHTML, asText } from "@prismicio/helpers";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}
export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )

}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const { slug } = params;

  const prismic = getPrismicClient();

  const prismicResponse = await prismic.getByUID('post', String(slug));


  const post = {
    slug,
    title: asText(prismicResponse.data.Title),
    content: asHTML(prismicResponse.data.Content),
    updatedAt: new Date(prismicResponse.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: { post }
  }

}