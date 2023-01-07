
import { useState } from 'react';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import ConfigForm from '../../components/configuracao/configForm';
import Colunar from '../../components/arranjos/colunar';
import { Caixa } from '../../interfaces/Caixa';
import { Palete } from '../../interfaces/Palete';
import Configuracao from '../../components/configuracao';
import Instrucoes from '../../components/instrucoes';
import { grey } from '@mui/material/colors';

export default function Home() {

    const [ caixa, setCaixa ] = useState<Caixa | null>(null)
    const [ palete, setPalete ] = useState<Palete | null>(null)
    const [ selectedArranjo, setSelectedArranjo ] = useState<string | null>(null)

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
            />

            {
                selectedArranjo === null && palete === null && caixa === null ?
                    <Instrucoes />
                :
                    (selectedArranjo === 'colunar') &&
                        <Colunar
                            palete={palete}
                            caixa={caixa}
                        />
            }


        </Box>
    )

};
