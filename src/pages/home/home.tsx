
import { useState } from 'react';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import ConfigForm from '../../components/configuracao/configForm';
import Colunar from '../../components/arranjos/colunar';
import { Caixa } from '../../interfaces/Caixa';
import { Palete } from '../../interfaces/Palete';
import Configuracao from '../../components/configuracao';
import Instrucoes from '../../components/instrucoes';
import { grey } from '@mui/material/colors';
import Trancado from '../../components/arranjos/trancado';
import Colmeia from '../../components/arranjos/colmeia';

export default function Home() {

    const [ caixa, setCaixa ] = useState<Caixa | null>(null)
    const [ palete, setPalete ] = useState<Palete | null>(null)
    const [ selectedArranjo, setSelectedArranjo ] = useState<string | null>(null)
    const [ showCotas, setShowCotas ] = useState<boolean>(true)
    const [ totalCaixas, setTotalCaixas ] = useState<number>(0)

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                background: grey[100],
                '& canvas': {
                    background: 'black'
                }
            }}
        >
            <Configuracao
                setCaixa={setCaixa}
                setPalete={setPalete}
                setSelectedArranjo={setSelectedArranjo}
                showCotas={showCotas}
                setShowCotas={setShowCotas}
            />

            {
                selectedArranjo === null && palete === null && caixa === null &&
                    <Instrucoes />
            }

            {
                selectedArranjo === 'Colunar' &&
                    <Colunar
                        palete={palete}
                        caixa={caixa}
                        showCotas={showCotas}
                        setTotalCaixas={setTotalCaixas}
                    />
            }

            {
                selectedArranjo === 'Trançado' &&
                    <Trancado
                        palete={palete}
                        caixa={caixa}
                        showCotas={showCotas}
                        setTotalCaixas={setTotalCaixas}
                    />
            }

            {
                selectedArranjo === 'Colmeia' &&
                    <Colmeia
                        palete={palete}
                        caixa={caixa}
                        showCotas={showCotas}
                        setTotalCaixas={setTotalCaixas}
                    />
            }

            {
                selectedArranjo &&
                    <Paper
                        sx={{
                            m: 1,
                            p: 1,
                            position: 'fixed',
                            zIndex: 1,
                            right: 0,
                            bottom: 0
                        }}
                    >
                        <Typography>
                            {`Total de Caixas: ${totalCaixas}`}
                        </Typography>
                    </Paper>
            }


        </Box>
    )

};
