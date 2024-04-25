import { handleGithubLogin, login } from "@/lib/action";
import styles from './login.module.css'

const LoginPage = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
      <form action={login} className={styles.form}>
        <input type="username" name="username" id="" />
        <input type="password" name="password" id="" />
        <button>Login with Credential</button>
      </form>
    </div>
  );
};

export default LoginPage;
