import Head from 'next/head'
import styles from '../style/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <h1 className={styles.title}>Hello Word</h1>
    </>
  )
}