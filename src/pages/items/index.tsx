import { Card } from '@/Components/Card/Card';
import styles from './items.module.css';
import { GetStaticProps, NextPage } from 'next';
import { ItemsProps } from '@/types';
import { ITEMS_API } from '@/constant';

const Items: NextPage<ItemsProps> = ({ items }) => {
  console.log('hello wordl!!');
  return (
    <>
      <div className={styles.container}>
        {items.map(({ id, image, name }) => {
          return <Card key={id} name={name} imgSrc={image} />;
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<ItemsProps> = async () => {
  const response = await fetch(ITEMS_API);
  const items = await response.json();

  return {
    props: { items },
  };
};

export default Items;
