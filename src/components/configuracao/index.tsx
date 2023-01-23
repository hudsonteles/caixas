import { ExpandMore, Home, Refresh, Settings } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Container, createFilterOptions, Divider, FormControlLabel, IconButton, InputAdornment, Paper, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Caixa } from "../../interfaces/Caixa";
import { Palete } from "../../interfaces/Palete";
import ConfigForm from "./configForm";
import PerfectScrollbar from 'react-perfect-scrollbar'

type Props = {
    setCaixa: (caixa: Caixa | null) => void,
    setPalete: (palete: Palete | null) => void,
    setSelectedArranjo: (arranjo: string | null) => void,
    showCotas: boolean,
    setShowCotas: (showCotas: boolean) => void,
}

const Configuracao = ({
    setCaixa,
    setPalete,
    setSelectedArranjo,
    showCotas,
    setShowCotas
}: Props) => {

    const { initialValues, schemaValidation } = ConfigForm();

    const [ created, setCreated ] = useState<boolean>();
    const [ optionsArranjo ] = useState<string[]>([
        'Colunar',
        'Trançado',
        // 'Colmeia'
    ])

    const filterType = createFilterOptions<string>();

    const formik = useFormik({

        initialValues,
        validationSchema: schemaValidation,

        onSubmit: (values: any) => {
            if(created) {
                setCreated(false);
                return
            }

            setPalete({
                largura: values.larguraPalete,
                comprimento: values.comprimentoPalete,
                altura: values.alturaPalete,
                alturaMaxima: values.alturaMaximaPalete
            })
            setCaixa({
                largura: values.larguraCaixa,
                comprimento: values.comprimentoCaixa,
                altura: values.alturaCaixa
            })
            setSelectedArranjo(values.arranjo);
            setCreated(true);
        }

    })

    const handleHome = () => {
        setPalete(null)
        setCaixa(null)
        setSelectedArranjo(null)
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
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            maxHeight: 'calc(100vh - 96px)',
                            maxWidth: '250px'
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Tooltip
                                title="Home"
                            >
                                <IconButton
                                    color="primary"
                                    onClick={handleHome}
                                >
                                    <Home />
                                </IconButton>
                            </Tooltip>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showCotas}
                                        onChange={() => {setShowCotas(!showCotas)}}
                                    />
                                }
                                label="Cotas"
                            />
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={1}
                            sx={{
                                maxHeight: 'calc(100vh - 96px)',
                                maxWidth: '250px',
                                overflowY: 'auto',
                                pr: 1
                            }}
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
                                    disabled={created}
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
                                    disabled={created}
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
                                    label="Altura"
                                    variant="outlined"
                                    size="small"
                                    disabled={created}
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

                                <TextField
                                    type="number"
                                    id="alturaMaximaPalete"
                                    name="alturaMaximaPalete"
                                    label="Altura Máxima com Caixas"
                                    variant="outlined"
                                    size="small"
                                    disabled={created}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>
                                    }}
                                    value={formik.values.alturaMaximaPalete}
                                    onChange={formik.handleChange}
                                    error={formik.touched.alturaMaximaPalete && Boolean(formik.errors.alturaMaximaPalete)}
                                    helperText={formik.touched.alturaMaximaPalete && <>{formik.errors.alturaMaximaPalete}</>}
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
                                    disabled={created}
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
                                    disabled={created}
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
                                    disabled={created}
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

                            <Stack
                                alignItems="center"
                                spacing={1}
                                pb={5}
                            >
                                <Typography
                                    color="primary"
                                >
                                    Arranjo das Caixas
                                </Typography>

                                <Autocomplete
                                    autoHighlight
                                    fullWidth
                                    id="arranjo"
                                    disabled={created}
                                    options={optionsArranjo}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    renderInput={
                                        (params) =>
                                            <TextField
                                                {...params}
                                                placeholder="Selecione um arranjo"
                                                name="arranjo"
                                                variant="outlined"
                                                size="small"
                                                disabled={created}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    autoComplete: 'new-password'
                                                }}
                                                error={formik.touched.arranjo && Boolean(formik.errors.arranjo)}
                                                helperText={formik.touched.arranjo && <>{formik.errors.arranjo}</>}
                                            />
                                    }
                                    filterOptions={(options, params) => {
                                        return filterType(options, params);
                                    }}
                                    onChange={(_event: any, newValue: any | null) => {

                                        if(newValue !== null){
                                            formik.setValues({
                                                ...formik.values,
                                                arranjo: newValue
                                            })
                                        } else {
                                            formik.setValues({
                                                ...formik.values,
                                                arranjo: null
                                            })
                                        }

                                    }}
                                />

                            </Stack>
                        </Stack>

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            {!created ? 'Simular' : 'Editar'}
                        </Button>
                    </Stack>
                </form>
            </AccordionDetails>
        </Accordion>
    )

}

export default Configuracao;
