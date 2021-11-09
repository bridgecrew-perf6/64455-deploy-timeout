import { useAddress } from '@app/hooks/shop';

const CommonAddress = ({ className }) => {
  const [address, location] = useAddress();
  return (
    <div className={className}>
      <div className="uk-text-bolder">{address('name')}</div>
      <div>{location.join(' - ')}</div>
    </div>
  );
};

export default CommonAddress;
