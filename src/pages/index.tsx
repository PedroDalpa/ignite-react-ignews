import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'
interface HomeProps {
  product: {
    productId: string,
    amount: number
  }
}

// Static Site Generate (SSG)
// bom para paginas que tem que ser indexadas e possuem um conteúdo fixo, home page, post etc

// Server Side Rendering (SSR)
// Bom para paginas que tem que ser indexadas porem estão em constante atualização, 
// lembrando que a pagina so sera exibida apos o fim da chamada do servidor next


export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.productId} />
        </section>
        <Image src="/images/avatar.svg" alt="garota programando em uma mesa com cafe e livros" width={600} height={600} />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1K97aEJ7khQ5iEmzQK3uUUTF', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format((price.unit_amount / 100))
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}