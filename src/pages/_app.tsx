import { NextRouter } from 'next/router';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyles from '@/components/GlobalStyles';
import LayoutMain from '@/layouts/Main';

interface AppProps {
    Component: React.FC;
    pageProps: any;
    router: NextRouter;
}

const theme: DefaultTheme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3'
    }
};

const App = ({ Component, pageProps, router }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <LayoutMain router={router}>
                <Component {...pageProps} key={router.route} />
            </LayoutMain>
        </ThemeProvider>
    );
};

export default App;
