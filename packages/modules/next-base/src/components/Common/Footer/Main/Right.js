import { useNavigation, NavigationItem } from '@app/hooks';

const CommonFooterMainRight = () => {
  const [navigation, nodes] = useNavigation('secondary');
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

export default CommonFooterMainRight;
