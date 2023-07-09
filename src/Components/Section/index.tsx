import Image from 'next/image';
import { Item } from '@/types';
import styles from './Section.module.css';
import edit from '../../../public/edit.svg';
import save from '../../../public/save.svg';

interface SectionProps {
  title: string;
  data: Item[];
  onEditButtonClick: (item: Item) => void;
  onEditItemNameChange: (newName: string) => void;
  editItem?: Item | null;
  revalidateData: (item: Item) => void;
  resetEditItem: () => void;
}

export const Section = (props: SectionProps) => {
  const { title, data, onEditButtonClick, onEditItemNameChange, editItem, resetEditItem, revalidateData } = props;

  return (
    <div>
      <div className={styles.category__title}>{title}</div>
      <div className={styles.container}>
        {data?.map((item) => (
          <div className={styles.wrapper} key={item.id}>
            {item.id === editItem?.id ? (
              <input onChange={(e) => onEditItemNameChange(e.target.value)} value={editItem?.name} />
            ) : (
              <div className={styles.name}>{item.name}</div>
            )}
            {item.id !== editItem?.id ? (
              <button onClick={() => onEditButtonClick(item)} className={styles.button} type="button">
                <Image src={edit} alt="edit" width={32} height={32} />
              </button>
            ) : (
              <button
                onClick={() => {
                  revalidateData(editItem);
                  resetEditItem();
                }}
                className={styles.button}
                type="button"
              >
                <Image src={save} alt="edit" width={32} height={32} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
