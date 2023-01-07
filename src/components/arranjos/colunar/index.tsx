import { Fragment, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Caixa } from '../../../interfaces/Caixa';
import { Palete as interfacePalete } from '../../../interfaces/Palete';
import Objetos3d from '../../objetos-3d';
import Palete from '../../objetos-3d/palete';

type Props = {
    palete: interfacePalete,
    caixa: Caixa,
    showCotas: boolean,
    setTotalCaixas: (total: number) => void
}

const Colunar = ({
    palete,
    caixa,
    showCotas,
    setTotalCaixas
}: Props) => {

    useEffect(() => {
        setTotalCaixas(
            getTotalCaixasLinha() * getTotalCaixasColuna() * getCaixasAltura()
        )
    },[])

    const { Caixa, Controls, Linha } = Objetos3d();

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
        return Math.ceil(palete.alturaMaxima/caixa.altura) * caixa.altura > palete.alturaMaxima ?
            Math.ceil(palete.alturaMaxima/caixa.altura) - 1
        :
            Math.ceil(palete.alturaMaxima/caixa.altura)
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
            <spotLight position={[100, 200, 400]} angle={1}/>
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
                palete={palete}
                caixa={caixa}
                showCotas={showCotas}
            />

        </Canvas>
    )

}

export default Colunar;
