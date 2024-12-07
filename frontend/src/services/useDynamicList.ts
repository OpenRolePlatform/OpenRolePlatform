import { useList } from '@uidotdev/usehooks';
import { useState } from 'react';
import { useMount } from 'react-use';
import useWebSocket from 'react-use-websocket';

export interface DynamicList<T> {
  data: T[];
  loading: boolean;
  refetch: (_query?: any) => void;
  error?: string;
}

/**
 * Functionality that stores a list of elements and handles its updates using websockets
 * @param model name of the model to listen for updates in the websocket
 * @param query query to use as initial request and updates
 * @param request fetcher function of the data
 * @returns DynamicList object with the data, loading and error state and refetch function
 */
export function useDynamicList<T extends { _id: string }>(
  model: string | string,
  request: (query?: any) => Promise<T[]>,
  query?: any,
): DynamicList<T> {
  const [list, { set, push, updateAt, removeAt }] = useList<T>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useWebSocket('/ws', {
    onOpen: () => {
      console.log(`WebSocket is listening for ${model} updates`);
    },
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      if (message.model === model) {
        switch (message.type) {
          case 'New':
            push(message.data);
            break;
          case 'NewArray':
            message.data.forEach((element: T) => {
              push(element);
            });
            break;
          case 'Update':
            {
              const index = list.findIndex(
                (item) => item._id === message.data._id,
              );
              if (index >= 0) updateAt(index, message.data);
            }
            break;
          case 'Delete':
            {
              const index = list.findIndex(
                (item) => item._id === message.data._id,
              );
              if (index >= 0) removeAt(index);
            }
            break;
          default:
            break;
        }
      }
    },
  });

  const fetch = async (_query: any) => {
    setLoading(true);
    try {
      const data = await request(_query);
      set(data);
      setLoading(false);
    } catch (_error) {
      console.log(_error);
      setError(JSON.stringify(_error));
    }
  };

  // Hook start
  useMount(() => fetch(query));

  return {
    // data
    data: list,
    //refetch function
    refetch: (_query: any) => fetch(_query ?? query),
    // State info
    loading,
    error,
  };
}
