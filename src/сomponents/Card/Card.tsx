import Image from 'next/image';
import styles from './Card.module.css';
import { FC } from 'react';

interface ICard {
  name: string;
  imgSrc: string;
}

export const Card: FC<ICard> = ({ name, imgSrc }) => {
  return (
    <div className={styles.card}>
      <Image className={styles.image} width={400} height={400} src={imgSrc} alt="image" />
      <div className={styles.title}>{name}</div>
    </div>
  );
};
