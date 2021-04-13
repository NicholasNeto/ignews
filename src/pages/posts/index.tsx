
import Head from 'next/head';
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title> Post | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong> Creating a Monorepo with lerna & Yarn woespaces</strong>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                        </p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong> Creating a Monorepo with lerna & Yarn woespaces</strong>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                        </p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong> Creating a Monorepo with lerna & Yarn woespaces</strong>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                        </p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong> Creating a Monorepo with lerna & Yarn woespaces</strong>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}