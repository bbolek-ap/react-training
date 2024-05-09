import Header from './header.tsx';
import {Outlet} from 'react-router-dom';

const Layout = () => {
    return <>
        <Header />
        <Outlet/>
    </>
}

export default Layout;
