import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useImageWidth = () => {
  const { width } = useWindowDimensions();
  const imageWidth = useMemo(() => {
    return width / 4;
  }, []);

  return imageWidth;
};
