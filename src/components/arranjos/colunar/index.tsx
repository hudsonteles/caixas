import { Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Canvas } from 'react-three-fiber';
import { Caixa } from '../../../interfaces/Caixa';
import { Palete } from '../../../interfaces/Palete';
import Objetos3d from '../../objetos-3d';

type Props = {
    palete: Palete,
    caixa: Caixa
}

const Colunar = ({
    palete,
    caixa
}: Props) => {

    const { Caixa, Controls, Palete } = Objetos3d();

    const getTotalCaixasLinha = () => {
        const totalCaixas = Math.ceil(palete.largura/caixa.largura) * (caixa.largura) > palete.largura ?
            Math.ceil(palete.largura/caixa.largura) - 1
        :
            Math.ceil(palete.largura/caixa.largura)

        return totalCaixas
    }

    const getTotalCaixasColuna = () => {
        const totalCaixas = Math.ceil(palete.comprimento/caixa.comprimento) * caixa.comprimento > palete.comprimento ?
                Math.ceil(palete.comprimento/caixa.comprimento) - 1
            :
                Math.ceil(palete.comprimento/caixa.comprimento)

        return totalCaixas
    }

    const getCaixasAltura = () => {
        return Math.ceil(palete.altura/caixa.altura) * caixa.altura > palete.altura ?
            Math.ceil(palete.altura/caixa.altura) - 1
        :
            Math.ceil(palete.altura/caixa.altura)
    }

    const getCaixa = (itemLinha: number, itemColuna: number, itemAltura: number) => {
        return  (
            <Caixa
                mesh={{
                    position: [
                        -((caixa.largura * getTotalCaixasLinha() / 2) - (caixa.largura/2)) + (caixa.largura * itemLinha),
                        (caixa.altura * itemAltura),
                        -((caixa.comprimento * getTotalCaixasColuna() / 2) - (caixa.comprimento/2)) + (caixa.comprimento * itemColuna),
                    ]
                }}
                box={{
                    dimensions: [caixa.largura, caixa.altura, caixa.comprimento]
                }}
            />
        )
    }

    return (
        <Canvas
            shadows={true}
            camera={{
                position: [-60, 70, 70]
            }}
        >
            {/* <Draggable>
                <LightBulb position={[0, 3, 0]} />
            </Draggable> */}
            <ambientLight color={"white"} intensity={0.2} />
            <spotLight position={[100, 200, 400]} angle={0.3}/>
                {
                    [...Array(getCaixasAltura()).keys()].map((itemAltura, indexAltura) => {
                        return(
                            [...Array(getTotalCaixasColuna()).keys()].map((itemColuna, indexColuna) => {
                                return (
                                    [...Array(getTotalCaixasLinha()).keys()].map((itemLinha, indexLinha) => {
                                        return (
                                            // <Draggable>
                                            <Fragment
                                                key={`${indexAltura}${indexColuna}${indexLinha}`}
                                            >
                                            {
                                                getCaixa(itemLinha, itemColuna, itemAltura)
                                            }
                                            </Fragment>
                                            // </Draggable>
                                        )
                                    })
                                )
                            })
                        )
                    })
                }

            <Controls />
            <Palete
                mesh={{
                    position: [
                        0,
                        -(caixa.altura-((caixa.altura/2) - 7)),
                        0
                    ]
                }}
                box={{
                    dimensions: [palete.largura, 14, palete.comprimento]
                }}
            />
        </Canvas>
    )

}

export default Colunar;
