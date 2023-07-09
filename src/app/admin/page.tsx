'use client';

import styles from './admin.module.css';
import { useEffect, useState } from 'react';
import { Item } from '@/types';
import { getAllItems, getAllUsers } from '@/network';
import { Section } from '@/Components/Section';
import { revalidateData } from '@/network';

export default function Users() {
  const [users, setUsers] = useState<Item[] | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUsersAndItems = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        const fetchedItems = await getAllItems();

        setUsers(fetchedUsers);
        setItems(fetchedItems);
      } catch (error: unknown) {
        console.error(error);
        setError(error as Error);
      }
      setLoading(false);
    };

    getUsersAndItems();
  }, []);

  const onEditButtonClick = (item: Item) => {
    setEditItem(item);
  };

  const onEditItemNameChange = (newName: string) => {
    setEditItem((prev) => ({ ...prev!, name: newName }));
  };

  const resetEditItem = () => setEditItem(null);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {users && items && (
        <>
          <div className={styles.title}>Admin panel</div>
          <Section
            onEditButtonClick={onEditButtonClick}
            onEditItemNameChange={onEditItemNameChange}
            title="Items"
            data={items}
            editItem={editItem}
            revalidateData={revalidateData}
            resetEditItem={resetEditItem}
          />
          <Section
            title="Users"
            data={users}
            onEditButtonClick={onEditButtonClick}
            onEditItemNameChange={onEditItemNameChange}
            editItem={editItem}
            revalidateData={revalidateData}
            resetEditItem={resetEditItem}
          />
        </>
      )}
    </>
  );
}
