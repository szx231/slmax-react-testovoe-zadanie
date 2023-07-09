import { Item } from '@/types';
import { ITEMS_API, USERS_API, REVALIDATE_API, BACKEND_URL } from './constant';

export const getAllItems = async (): Promise<Item[]> => {
  const response = await fetch(ITEMS_API);

  if (!response.ok) throw new Error('Unable to fetch items');

  return response.json();
};

export const getAllUsers = async (): Promise<Item[]> => {
  const response = await fetch(USERS_API);

  if (!response.ok) throw new Error('Unable to fetch users');

  return response.json();
};

export const revalidateData = async (newData: Item) => {
  const { page, id } = newData;

  try {
    const response2 = await fetch(`${BACKEND_URL}/${page}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    await fetch(REVALIDATE_API, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Обработка ошибки запроса
    console.error('Ошибка при отправке данных на сервер', error);
  }
};
