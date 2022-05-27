
import Head from 'next/head';
import styles from './styles.module.scss';
export default function Post() {

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2022</time>
            <strong>LERO LEROO LELRKER</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur voluptatibus impedit, in alias nam culpa quasi architecto ducimus ex, deserunt ipsum. Debitis ad quod, perspiciatis tempore error blanditiis soluta.</p>
          </a>
          <a href="">
            <time>12 de março de 2022</time>
            <strong>LERO LEROO LELRKER</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur voluptatibus impedit, in alias nam culpa quasi architecto ducimus ex, deserunt ipsum. Debitis ad quod, perspiciatis tempore error blanditiis soluta.</p>
          </a>
          <a href="">
            <time>12 de março de 2022</time>
            <strong>LERO LEROO LELRKER</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur voluptatibus impedit, in alias nam culpa quasi architecto ducimus ex, deserunt ipsum. Debitis ad quod, perspiciatis tempore error blanditiis soluta.</p>
          </a>
        </div>
      </main>
    </>
  )

}