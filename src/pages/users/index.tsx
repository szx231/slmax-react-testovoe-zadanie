import { Card } from '@/Components/Card/Card';
import styles from './users.module.css';
import { GetStaticProps, NextPage } from 'next';
import { UsersProps } from '@/types';
import { USERS_API } from '@/constant';

const Users: NextPage<UsersProps> = ({ users }) => {
  return (
    <>
      <div className={styles.container}>
        {users.map(({ id, image, name }) => {
          return <Card key={id} name={name} imgSrc={image} />;
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<UsersProps> = async () => {
  const response = await fetch(USERS_API);
  const users = await response.json();

  return {
    props: { users },
  };
};

export default Users;
