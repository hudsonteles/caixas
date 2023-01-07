import { Settings } from "@mui/icons-material";
import { Stack, Container, Typography, Box } from "@mui/material";

type Props = {}

const Instrucoes = ({}: Props) => {

    return (
        <Container
            maxWidth="lg"
        >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: '100vh'
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url(${'/images/util/fitting-piece-pana.svg'})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        width: '100%',
                        height: '40vh'
                    }}
                />
                <Typography
                    variant="h4"
                >
                    Dimensionamento de Paletes
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        display: {
                            xs: 'contents',
                            sm: 'flex'
                        },
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    {`Clique em `}
                    <Box
                        fontWeight="bold"
                        component="span"
                        px={0.5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Settings /> {` Configurações `}
                    </Box>
                    {` para fazer uma simulação.`}
                </Typography>
            </Stack>
        </Container>
    )

}

export default Instrucoes;
