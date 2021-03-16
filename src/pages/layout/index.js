import Head from "next/head";
import styles from "./Layout.module.scss";
import Login from "../login";

function Layout(props) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>MyFavs</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header className={styles.header}>
        <div className="container">
          <h1>
            <a href="/">
              <strong>myfavs</strong>
            </a>
          </h1>

          <Login />
        </div>
      </header>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer} />
    </div>
  );
};

export default Layout;
