import styles from "./Login.module.scss";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthCheck, useAuth, useUser } from "reactfire";

export default function Login() {
  const { data: user } = useUser();
  const auth = useAuth();
  const signIn = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };
  const signOut = async () => {
    await auth.signOut();
  };

  const userInfo = () => {
    if (user)
      return (
        <div className={styles["user-card"]}>
          <img className={styles.avatar} src={user.photoURL} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {/* <div className="color-medium" data-text="small 500">Olá, {user.displayName.split(" ")[0]}</div> */}
            <a className="color-danger" data-text="xsmall" href="#" onClick={signOut}>
              sair
            </a>
          </div>
          {/* <br /><strong>{user.displayName}</strong> */}
          {/* <br /><span>{user.email}</span> */}
        </div>
      );
  };

  return (
    <AuthCheck
      fallback={
        <button className="button button--small" onClick={signIn}>
          Entrar
        </button>
      }
    >
      {userInfo()}
    </AuthCheck>
  );
}
