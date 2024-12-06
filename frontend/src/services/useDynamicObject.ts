import { useState } from 'react';
import { useGetSetState, useMount } from 'react-use';
import useWebSocket from 'react-use-websocket';

export interface DynamicObject<T> {
  data: () => T;
  loading: boolean;
  refetch: () => void;
  error?: string;
}

/**
 * Functionality that stores a an object and handles its updates using websockets
 * @param id id of the object that will be used in the request
 * @param model name of the model to listen for updates in the websocket
 * @param request fetcher function of the data
 * @returns DynamicObject object with the data, loading and error state and refetch function
 */
export function useDynamicObject<T extends { _id: string }>(
  id: string,
  model: string,
  request: (id: string) => Promise<T>,
): DynamicObject<T> {
  const [data, setData] = useGetSetState<T>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useWebSocket('/ws', {
    onOpen: () => {
      console.log(`WebSocket is listening for ${model} updates`);
    },
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      if (message.model === model && message.data._id === id) {
        setData(message.data);
      }
    },
  });

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await request(id);
      setData(data);
      setLoading(false);
    } catch (_error) {
      console.log(_error);
      setError(JSON.stringify(_error));
    }
  };

  // Hook start
  useMount(() => fetch());

  return {
    // data
    data,
    //refetch function
    refetch: () => fetch(),
    // State info
    loading,
    error,
  };
}
