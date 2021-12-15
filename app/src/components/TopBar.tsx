import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import './TopBar.scss';

const TopBar: React.FC = () => {
  const location = useLocation();
  const allPath = location.pathname.split('/');

  return (
    <div className={'top-bar'}>
      <div className={'left-side'}>{_.capitalize(allPath[1])}</div>
      <div className={'right-side'}>{}</div>
    </div>
  );
};

export default TopBar;
