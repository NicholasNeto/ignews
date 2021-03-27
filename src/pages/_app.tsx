
import { AppProps } from 'next/app'
import '../sytles/global.scss'

function MyApp({ Component, pageProps }:AppProps ) {
  return <Component {...pageProps} />
}

export default MyApp
