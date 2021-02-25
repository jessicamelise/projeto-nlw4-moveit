import { Profile } from '../components/Perfil';
import { ExperienceBar } from '../components/ExperienceBar';
import styles from '../styles/components/Home.module.css';
import { CompletedChallenges } from '../components/completedChallenges';
import { Countdown } from '../components/Countdown';
import Head from 'next/head';

export default function Home() {
  return (
    <div className={ styles.container }>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
