import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/dist/shared/lib/router/router';
import theme from '../styles/theme';
import '../styles/global.css';

const MyApp = ({
    Component,
    pageProps
} : AppProps) => {

    return (

        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>

    )

}

export default MyApp;