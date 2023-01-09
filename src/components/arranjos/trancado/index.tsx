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

const Trancado = ({
    palete,
    caixa,
    showCotas,
    setTotalCaixas
}: Props) => {

    useEffect(() => {
        setTotalCaixas(
            getTotal()
        )
    },[palete, caixa])

    const { Caixa, Controls, Linha } = Objetos3d();

    const getTotal = () => {
        return getTotalCaixasAltura() === 0 ?
            getTotalCaixasLargura() * getTotalCaixasComprimento()
        :
            (getTotalCaixasLargura() * getTotalCaixasComprimento() * getTotalCaixasAltura() / 2) +
            (getTotalCaixasLarguraAlternada() * getTotalCaixasComprimentoAlternada() * (getTotalCaixasAltura() / 2 + (getTotalCaixasAltura() % 2 === 0 ? 0 : 1)))
    }

    const getTotalCaixasLargura = () => {
        const totalCaixas = Math.ceil(palete.largura/caixa.largura)
        return totalCaixas * caixa.largura > palete.largura ? totalCaixas -1 : totalCaixas;
    }

    const getTotalCaixasLarguraAlternada = () => {
        const totalCaixas = Math.ceil(getTotalCaixasLargura() * caixa.largura / caixa.comprimento)
        return totalCaixas * caixa.comprimento > getTotalCaixasLargura() * caixa.comprimento ? totalCaixas - 1: totalCaixas
    }

    const getTotalCaixasComprimento = () => {
        const totalCaixas = Math.ceil(palete.comprimento/caixa.comprimento)
        return totalCaixas * caixa.comprimento > palete.comprimento ? totalCaixas - 1 : totalCaixas;
    }

    const getTotalCaixasComprimentoAlternada = () => {
        const totalCaixas = Math.ceil(getTotalCaixasComprimento() * caixa.comprimento / caixa.largura)
        return totalCaixas * caixa.largura > getTotalCaixasLargura() * caixa.largura ? totalCaixas - 1: totalCaixas
    }

    const getTotalCaixasAltura = () => {
        const total = Math.ceil(palete.alturaMaxima/caixa.altura)
        return total > palete.alturaMaxima ? total - 2 : total - 1
    }

    const getCaixa = (itemLargura: number, itemComprimento: number, itemAltura: number) => {
        // if(itemAltura%2 === 0){
            return  (
                <Caixa
                    mesh={{
                        position:
                            itemAltura % 2 === 0 ?
                                [
                                    -((caixa.largura * getTotalCaixasLargura() / 2) - (caixa.largura/2)) + (caixa.largura * itemLargura),
                                    (caixa.altura * itemAltura),
                                    -((caixa.comprimento * getTotalCaixasComprimento() / 2) - (caixa.comprimento/2)) + (caixa.comprimento * itemComprimento),
                                ]
                            :
                                [
                                    -((caixa.comprimento * getTotalCaixasLarguraAlternada() / 2) - (caixa.comprimento/2)) + (caixa.comprimento * itemLargura),
                                    (caixa.altura * itemAltura),
                                    -((caixa.largura * getTotalCaixasComprimentoAlternada() / 2) - (caixa.largura/2)) + (caixa.largura * itemComprimento),
                                ]
                    }}
                    box={{
                        dimensions: itemAltura % 2 === 0 ? [caixa.largura, caixa.altura, caixa.comprimento] : [caixa.comprimento, caixa.altura, caixa.largura]
                    }}
                />
            )
        // }

        // const larguraBase = getTotalCaixasLargura(0) * caixa.largura
        // const comprimentoBase = getTotalCaixasComprimento(0) * caixa.comprimento

        // return  (
        //     <Caixa
        //         mesh={{
        //             position: [
        //                 -(comprimentoBase/2) + ((comprimentoBase - (Math.ceil(comprimentoBase/caixa.largura) - caixa.largura)) + (caixa.largura/2)) + (caixa.largura * itemComprimento),
        //                 (caixa.altura * itemAltura),
        //                 -(larguraBase/2) + ((larguraBase - (Math.ceil(larguraBase/caixa.comprimento) - caixa.comprimento)) + (larguraBase/2)) + (larguraBase * itemLargura)
        //             ]
        //         }}
        //         box={{
        //             dimensions: [caixa.comprimento, caixa.altura, caixa.largura]
        //         }}
        //     />
        // )
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
                [...Array(getTotalCaixasAltura()).keys()].map((itemAltura) => {
                    return(
                        [...Array(
                            itemAltura % 2 === 0 ?
                                getTotalCaixasComprimento()
                            :
                                getTotalCaixasComprimentoAlternada()
                            ).keys()].map((itemColuna) => {
                                return (
                                    [...Array(
                                            itemAltura % 2 === 0 ?
                                                getTotalCaixasLargura()
                                            :
                                                getTotalCaixasLarguraAlternada()
                                        ).keys()].map((itemLinha) => {
                                            return (
                                                // <Draggable>
                                                <Fragment
                                                    key={`${itemLinha}${itemColuna}${itemAltura}`}
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

export default Trancado;
