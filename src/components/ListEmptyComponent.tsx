import { Text, View } from 'react-native';

interface ListEmptyComponentProps {
  isError: boolean;
  isLoading: boolean;
  emptyMessage?: string;
}

export const ListEmptyComponent = ({
  isError,
  isLoading,
  emptyMessage,
}: ListEmptyComponentProps) => {
  return isError ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
      }}>
      <Text>☠️ Some error occur... Please try again!</Text>
    </View>
  ) : isLoading ? (
    <></>
  ) : (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
      }}>
      <Text>{emptyMessage ? emptyMessage : '🤧 Sorry, no Gifs match!'}</Text>
    </View>
  );
};
