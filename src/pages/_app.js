import '../styles/globals.scss'
import '../styles/utils.scss'

import 'firebase/firestore';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyA9jirtbdYnHjlu749kOZmmSLW8zeFdRdU",
  authDomain: "next-app-ae21c.firebaseapp.com",
  projectId: "next-app-ae21c",
  storageBucket: "next-app-ae21c.appspot.com",
  messagingSenderId: "566724819053",
  appId: "1:566724819053:web:c61b23772425ec33052764"
};

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Component {...pageProps} />
    </FirebaseAppProvider>
  )
}

export default MyApp
