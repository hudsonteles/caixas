import { ExpandMore, Refresh, Settings } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Caixa } from "../../interfaces/Caixa";
import { Palete } from "../../interfaces/Palete";
import ConfigForm from "./configForm";

type Props = {
    setCaixa: (caixa: Caixa | null) => void,
    setPalete: (palete: Palete | null) => void,
}

const Configuracao = ({
    setCaixa,
    setPalete
}: Props) => {

    const { initialValues, schemaValidation } = ConfigForm();

    const [ created, setCreated ] = useState(false);

    const formik = useFormik({

        initialValues,
        validationSchema: schemaValidation,

        onSubmit: (values: any) => {
            setCreated(true);
        }

    })

    const handleRefresh = () => {
        setCreated(false)                      
    }

    return (
        <Accordion
            sx={{
                m: 1,                
                position: 'fixed',
                zIndex: 1,
                left: 0
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore />}            
            >
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    pr={2}
                >
                    <Settings />
                    <Typography
                        fontWeight="bold"
                    >
                        Configurações
                    </Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={formik.handleSubmit}>
                    <Stack
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={2}
                    >                                        
                        <Stack                        
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography
                                color="primary"
                            >
                                Dimensões do Palete
                            </Typography>

                            <TextField
                                type="number"
                                id="larguraPalete"
                                name="larguraPalete"
                                label="Largura"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true                                
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={formik.values.larguraPalete}
                                onChange={formik.handleChange}
                                error={formik.touched.larguraPalete && Boolean(formik.errors.larguraPalete)}
                                helperText={formik.touched.larguraPalete && <>{formik.errors.larguraPalete}</>}
                            />
                            
                            <TextField
                                type="number"
                                id="comprimentoPalete"
                                name="comprimentoPalete"
                                label="Comprimento"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true                                
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={formik.values.comprimentoPalete}
                                onChange={formik.handleChange}
                                error={formik.touched.comprimentoPalete && Boolean(formik.errors.comprimentoPalete)}
                                helperText={formik.touched.comprimentoPalete && <>{formik.errors.comprimentoPalete}</>}
                            />

                            <TextField
                                type="number"
                                id="alturaPalete"
                                name="alturaPalete"
                                label="Altura máxima"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true                                
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={formik.values.alturaPalete}
                                onChange={formik.handleChange}
                                error={formik.touched.alturaPalete && Boolean(formik.errors.alturaPalete)}
                                helperText={formik.touched.alturaPalete && <>{formik.errors.alturaPalete}</>}
                            />

                        </Stack>

                        <Stack                        
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography
                                color="primary"
                            >
                                Dimensões das Caixas
                            </Typography>

                            <TextField
                                type="number"
                                id="larguraCaixa"
                                name="larguraCaixa"
                                label="Largura"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true                                
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={formik.values.larguraCaixa}
                                onChange={formik.handleChange}
                                error={formik.touched.larguraCaixa && Boolean(formik.errors.larguraCaixa)}
                                helperText={formik.touched.larguraCaixa && <>{formik.errors.larguraCaixa}</>}
                            />
                            
                            <TextField
                                type="number"
                                id="comprimentoCaixa"
                                name="comprimentoCaixa"
                                label="Comprimento"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true                                
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={formik.values.comprimentoCaixa}
                                onChange={formik.handleChange}
                                error={formik.touched.comprimentoCaixa && Boolean(formik.errors.comprimentoCaixa)}
                                helperText={formik.touched.comprimentoCaixa && <>{formik.errors.comprimentoCaixa}</>}
                            />

                            <TextField
                                type="number"
                                id="alturaCaixa"
                                name="alturaCaixa"
                                label="Altura"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{
                                    shrink: true                                
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                }}
                                value={formik.values.alturaCaixa}
                                onChange={formik.handleChange}
                                error={formik.touched.alturaCaixa && Boolean(formik.errors.alturaCaixa)}
                                helperText={formik.touched.alturaCaixa && <>{formik.errors.alturaCaixa}</>}
                            />

                        </Stack>

                        {
                            !created ?
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    Simular
                                </Button>
                            :
                                <Button                                    
                                    color="primary"
                                    variant="contained"
                                    startIcon={<Refresh />}
                                    onClick={handleRefresh}
                                >
                                    Resetar
                                </Button>
                        }

                    </Stack>
                </form>
            </AccordionDetails>
        </Accordion>        
    )

}

export default Configuracao;