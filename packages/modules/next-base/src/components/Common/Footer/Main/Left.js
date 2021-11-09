import { useNavigation, NavigationItem } from '@app/hooks';

const CommonFooterMainLeft = () => {
  const [navigation, nodes] = useNavigation('primary');
  return (
    <div>
      <ul className="uk-nav uk-nav-default">
        {nodes.map(node => (
          <NavigationItem
            key={node._key ?? node._id}
            parent={navigation}
            {...node}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommonFooterMainLeft;
