import '../styles/globals.css'
import {AuthProvider} from "../lib/auth";
import Navigation from "../components/Navigation";
function App({ Component, pageProps }) {
  return(
      <AuthProvider>
          <Navigation/>
        <Component {...pageProps} />
      </AuthProvider>
  )
}

export default App
