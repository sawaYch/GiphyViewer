import { Text, View } from 'react-native';

export const ListEmptyComponent = (
  isError: boolean,
  isLoading: boolean,
  emptyMessage?: string
) => {
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