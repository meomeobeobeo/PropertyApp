import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import NavBar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Head></Head>
            <Box maxWidth="1280px" m="auto">
                <header>
                    <NavBar />
                </header>
                <main>{children}</main>
                <footer>
                    <Footer />
                </footer>
            </Box>
        </>
    );
};

export default Layout;
