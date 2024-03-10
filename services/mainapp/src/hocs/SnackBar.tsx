import {createContext, useEffect, useRef, useState} from 'react';
import {Snackbar} from 'react-native-paper';

export const SnackBarContext = createContext<any>({});

export const SnackBarHoc = ({children}: any) => {
  const [data, setData] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      setVisible(true);
      const timeId = setTimeout(() => {
        setVisible(false);
      }, data?.time || 2000);
      clearTimeout(timeId);
    }
  }, [data]);

  return (
    <SnackBarContext.Provider value={{setData}}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Close',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {data?.text}
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
