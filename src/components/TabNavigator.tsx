import { Tab, TabView } from '@rneui/themed';
import { useMemo, useState } from 'react';
import SearchTab from './SearchTab';
import FavoriteTab from './FavoriteTab';

const TabNavigator = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabPages = useMemo(
    () => [
      {
        title: 'Search',
        icon: 'timer',
        pageComponent: <SearchTab />,
      },
      {
        title: 'Favorite',
        icon: 'heart',
        pageComponent: <FavoriteTab />,
      },
    ],
    []
  );

  return (
    <>
      <TabView
        value={tabIndex}
        onChange={setTabIndex}
        tabItemContainerStyle={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'column',
          margin: 0,
        }}
        containerStyle={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'column',
          margin: 0,
        }}>
        {tabPages.map(tab => (
          <TabView.Item key={tab.title}>{tab.pageComponent}</TabView.Item>
        ))}
      </TabView>
      <Tab
        value={tabIndex}
        onChange={e => setTabIndex(e)}
        indicatorStyle={{
          backgroundColor: 'lightblue',
          height: 4,
          top: 0,
          position: 'absolute',
        }}
        variant='primary'>
        {tabPages.map(tab => (
          <Tab.Item
            key={tab.title}
            title={tab.title}
            titleStyle={{ fontSize: 12 }}
            icon={{ name: tab.icon, type: 'ionicon', color: 'white' }}
          />
        ))}
      </Tab>
    </>
  );
};

export default TabNavigator;
