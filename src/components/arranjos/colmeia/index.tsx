import { Fragment, useEffect, useState } from 'react';
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

const Colmeia = ({
    palete,
    caixa,
    showCotas,
    setTotalCaixas
}: Props) => {

    const [ caixaNova, setCaixaNova ] = useState<Caixa>({
        largura: caixa.largura > caixa.comprimento ? caixa.comprimento : caixa.largura,
        comprimento: caixa.largura > caixa.comprimento ? caixa.largura : caixa.comprimento,
        altura: caixa.altura
    })

    useEffect(() => {
        setCaixaNova({
            largura: caixa.largura > caixa.comprimento ? caixa.comprimento : caixa.largura,
            comprimento: caixa.largura > caixa.comprimento ? caixa.largura : caixa.comprimento,
            altura: caixa.altura
        })
        setTotalCaixas(
            10
            // getTotal()
        )
    },[palete, caixa])

    const { Caixa, Controls, Linha } = Objetos3d();

    // const getTotal = () => {
    //     return getTotalCaixasAltura() === 0 ?
    //         getTotalCaixasLargura() * getTotalCaixasComprimento()
    //     :
    //         (getTotalCaixasLargura() * getTotalCaixasComprimento() * Math.ceil(getTotalCaixasAltura() / 2)) +
    //         (getTotalCaixasLarguraAlternada() * getTotalCaixasComprimentoAlternada() * (getTotalCaixasAltura() % 2 === 0 ? Math.ceil(getTotalCaixasAltura() / 2) : Math.ceil(getTotalCaixasAltura() / 2) - 1))
    // }

    const getTotalCaixasLargura = () : any => {
        let array : number[] = [];
        const totalLinhas = Math.floor((palete.comprimento - caixaNova.largura) / caixaNova.comprimento)

        for(let i = 0; i < totalLinhas; i++){
            array.push(Math.floor(palete.largura / caixaNova.largura))
        }

        const sobra = palete.comprimento - (totalLinhas * caixaNova.comprimento)

        const invertidos = Math.floor(sobra / caixaNova.largura)
        for(let i = 0; i < invertidos; i++){
            array.push(Math.floor(palete.largura / caixaNova.comprimento))
        }

        return {
            array,
            invertidos
        }

    }

    const getTotalCaixasLarguraAlternada = () => {
        const totalCaixas = Math.ceil(palete.largura / caixaNova.comprimento)
        return totalCaixas * caixaNova.comprimento > palete.largura ? totalCaixas - 1: totalCaixas
    }

    const getTotalCaixasComprimento = () => {
        const totalLinhas = Math.floor((palete.comprimento - caixaNova.largura) / caixaNova.comprimento)
        const sobra = palete.comprimento - (totalLinhas * caixaNova.comprimento)
        const invertidos = Math.floor(sobra / caixaNova.largura)

        return totalLinhas + invertidos;
    }

    const getTotalCaixasComprimentoAlternada = () => {
        const totalCaixas = Math.ceil(palete.comprimento / caixaNova.largura)
        return totalCaixas * caixaNova.largura > palete.comprimento ? totalCaixas - 1: totalCaixas
    }

    const getTotalCaixasAltura = () => {
        const total = Math.ceil(palete.alturaMaxima/caixaNova.altura)
        return total > palete.alturaMaxima ? total - 2 : total - 1
    }

    const getCaixa = (itemLargura: number, itemComprimento: number, itemAltura: number) => {
        return  (
            <Caixa
                mesh={{
                    position:
                        itemAltura % 2 === 0 ?
                            itemComprimento >= getTotalCaixasLargura().array.length - getTotalCaixasLargura().invertidos ?
                                [
                                    -(caixaNova.comprimento * getTotalCaixasLargura().array[itemComprimento] / 2 - (caixaNova.comprimento/2)) + (caixaNova.comprimento * itemLargura),
                                    (caixaNova.altura * itemAltura),
                                    -(caixaNova.largura * getTotalCaixasLargura().array[itemComprimento] / 2 - (caixaNova.largura/2)) + (caixaNova.largura * itemComprimento)
                                ]
                            :
                                [
                                    -((caixaNova.largura * getTotalCaixasLargura().array[itemComprimento] / 2) - (caixaNova.largura/2)) + (caixaNova.largura * itemLargura),
                                    (caixaNova.altura * itemAltura),
                                    -((caixaNova.comprimento * getTotalCaixasComprimento() / 2) - (caixaNova.comprimento/2)) + (caixaNova.comprimento * itemComprimento),
                                ]
                        :
                            [
                                -((caixaNova.comprimento * getTotalCaixasLarguraAlternada() / 2) - (caixaNova.comprimento/2)) + (caixaNova.comprimento * itemLargura),
                                (caixaNova.altura * itemAltura),
                                -((caixaNova.largura * getTotalCaixasComprimentoAlternada() / 2) - (caixaNova.largura/2)) + (caixaNova.largura * itemComprimento),
                            ]
                }}
                box={{
                    dimensions: itemAltura % 2 === 0 ?
                        itemComprimento >= getTotalCaixasLargura().array.length - getTotalCaixasLargura().invertidos ?
                                [caixaNova.comprimento, caixaNova.altura, caixaNova.largura]
                            :
                                [caixaNova.largura, caixaNova.altura, caixaNova.comprimento]
                        :
                            [caixaNova.comprimento, caixaNova.altura, caixaNova.largura]
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
                // [...Array(getTotalCaixasAltura()).keys()].map((itemAltura) => {
                [0].map((itemAltura) => {
                    return(
                        [...Array(
                            itemAltura % 2 === 0 ?
                                getTotalCaixasComprimento()
                            :
                                getTotalCaixasComprimentoAlternada()
                            ).keys()
                        ].map((itemColuna) => {
                                return (
                                    [...Array(
                                        itemAltura % 2 === 0 ?
                                            getTotalCaixasLargura().array[itemColuna]
                                        :
                                            getTotalCaixasComprimentoAlternada()
                                        ).keys()
                                    ].map((itemLinha) => {
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
                caixa={caixaNova}
                showCotas={showCotas}
                arranjo={'colmeia'}
            />

        </Canvas>
    )

}

export default Colmeia;
