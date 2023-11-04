import styles from "./ErrorMode.module.css";

import Card from "./UI/Card";
import Button from "./UI/Button";

const ErrorMode = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.reset} />
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>Invalid Input</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.reset}>Okay</Button>
        </footer>
      </Card>
    </>
  );
};

export default ErrorMode;
