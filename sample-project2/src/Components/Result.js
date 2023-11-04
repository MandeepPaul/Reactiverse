import styles from "./UserList.module.css";

const Result = (props) => {
  return (
    <div className={styles.users}>
      <ul>
        {props.usersData.map((user) => (
          <li key={user.key}>{`${user.name} (${user.age} years old)`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
