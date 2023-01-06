import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

let theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto Condensed'
        ].join(','),
        
    },
    palette: {
        primary: {
            main: '#004BFF'
        },
        secondary: {
            light: '#78FFDA',
            main: '#03CA93'
        },
        error: {
            main: red[700]
        },
        info: {
            main: grey[500]
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1600
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    borderRadius: '5px'
                },
                outlined: {
                    borderRadius: '5px'
                }
            }            
        }        
    }
    
});

theme = responsiveFontSizes(theme);

export default theme;