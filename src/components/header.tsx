import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../store/app/appSelector.ts';

const Header = () => {
    const currentUser = useSelector(selectCurrentUser())
  return (
          <div className="border border-gray-400 py-3 text-xl rounded-md flex items-center justify-between">
              <div>
                AP React Training Project Management Tool
              </div>
              <div>{currentUser?.displayName}</div>
          </div>
  );
};

export default Header;
