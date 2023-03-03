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

    const { Caixa, Controls } = Objetos3d();

    const [ caixaNova, setCaixaNova ] = useState<Caixa>({
        largura: caixa.largura > caixa.comprimento ? caixa.largura : caixa.comprimento,
        comprimento: caixa.largura > caixa.comprimento ? caixa.comprimento : caixa.largura,
        altura: caixa.altura
    })

    useEffect(() => {

        setCaixaNova({
            largura: caixa.largura > caixa.comprimento ? caixa.largura : caixa.comprimento,
            comprimento: caixa.largura > caixa.comprimento ? caixa.comprimento : caixa.largura,
            altura: caixa.altura
        })

        calculateTotal()

    },[ caixa, palete ])

    useEffect(() => {

        calculateTotal()

    },[ Caixa ])

    const calculateTotal = () => {

        setTotalCaixas(
            ((getTotalFilasCaixaComprimento() * getTotalCaixasComprimento()) + getTotalCaixasComplementar()) * getCaixasAltura()
        )

    }

    const getTotalCaixasComprimento = () => {
        const total = Math.floor(palete.largura / caixaNova.comprimento)
        return total
    }

    const getTotalFilasCaixaComprimento = () => {
        const total = Math.floor((palete.comprimento - caixaNova.comprimento) / caixaNova.largura)
        return total
    }

    const getTotalCaixasComplementar = () => {
        const total = Math.floor(palete.largura / caixaNova.largura)
        return total
    }

    const getTotalCaixasLargura = () => {
        return Math.floor(palete.largura / caixaNova.largura)
    }

    const getCaixasAltura = () => {
        return Math.ceil(palete.alturaMaxima/caixa.altura) * caixa.altura > palete.alturaMaxima ?
            Math.ceil(palete.alturaMaxima/caixa.altura) - 1
        :
            Math.ceil(palete.alturaMaxima/caixa.altura)
    }

    const getCaixa = (itemLargura: number, itemComprimento: number, itemAltura: number) => {
        return  (
            <Caixa
                mesh={{
                    position: [
                        - (palete.comprimento/2 - ((palete.comprimento - (getTotalCaixasComprimento() * caixaNova.comprimento))/2) - (caixaNova.comprimento/2)) + (itemComprimento * caixaNova.comprimento),
                        (caixaNova.altura * itemAltura),
                        - (palete.largura/2 - ((palete.largura - ((getTotalFilasCaixaComprimento() * caixaNova.largura) + caixaNova.comprimento))/2) - (caixaNova.largura/2)) + (itemLargura * caixaNova.largura)
                    ]
                }}
                box={{
                    dimensions: [caixaNova.comprimento, caixaNova.altura, caixaNova.largura]
                }}
            />
        )
    }

    const getFilaComplementar = (itemLargura: number, itemAltura: number) => {
        return  (
            <Caixa
                mesh={{
                    position: [
                        - (palete.largura/2 - ((palete.largura - (getTotalCaixasLargura() * caixaNova.largura))/2) - (caixaNova.largura/2)) + (itemLargura * caixaNova.largura),
                        (caixaNova.altura * itemAltura),
                        ((getTotalFilasCaixaComprimento() * caixaNova.largura) + caixaNova.comprimento)/2 - (caixaNova.comprimento/2)
                    ]
                }}
                box={{
                    dimensions: [caixaNova.largura, caixaNova.altura, caixaNova.comprimento]
                }}
            />
        )
    }

    const getCaixaImpar = (itemLargura: number, itemComprimento: number, itemAltura: number) => {
        return  (
            <Caixa
                mesh={{
                    position: [
                        - (palete.comprimento/2 - ((palete.comprimento - (getTotalCaixasComprimento() * caixaNova.comprimento))/2) - (caixaNova.comprimento/2)) + (itemComprimento * caixaNova.comprimento),
                        (caixaNova.altura * itemAltura),
                        - ((palete.largura/2) - ((palete.largura - ((getTotalFilasCaixaComprimento() * caixaNova.largura) + caixaNova.comprimento))/2) - (caixaNova.largura/2)) + (itemLargura * caixaNova.largura) + caixaNova.comprimento
                    ]
                }}
                box={{
                    dimensions: [caixaNova.comprimento, caixaNova.altura, caixaNova.largura]
                }}
            />
        )
    }

    const getFilaComplementarImpar = (itemLargura: number, itemAltura: number) => {
        return  (
            <Caixa
                mesh={{
                    position: [
                        - (palete.largura/2 - ((palete.largura - (getTotalCaixasLargura() * caixaNova.largura))/2) - (caixaNova.largura/2)) + (itemLargura * caixaNova.largura),
                        (caixaNova.altura * itemAltura),
                        - ((palete.largura/2) - ((palete.largura - ((getTotalFilasCaixaComprimento() * caixaNova.largura) + caixaNova.comprimento))/2) - (caixaNova.comprimento/2))
                    ]
                }}
                box={{
                    dimensions: [caixaNova.largura, caixaNova.altura, caixaNova.comprimento]
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
                [...Array(getCaixasAltura()).keys()].map((caixasAltura) => {
                    if(caixasAltura % 2 === 0){
                        return (
                            [...Array(getTotalCaixasComplementar()).keys()].map((filaCaixaComprimento) => {
                                return getFilaComplementar(filaCaixaComprimento, caixasAltura)
                            })
                        )
                    }

                    return (
                        [...Array(getTotalCaixasComplementar()).keys()].map((filaCaixaComprimento) => {
                            return getFilaComplementarImpar(filaCaixaComprimento, caixasAltura)
                        })
                    )
                })
            }
            {
                [...Array(getCaixasAltura()).keys()].map((caixasAltura) => {
                    if(caixasAltura % 2 === 0){
                        return (
                            [...Array(getTotalFilasCaixaComprimento()).keys()].map((filaCaixaComprimento) => {
                                return (
                                    [...Array(getTotalCaixasComprimento()).keys()].map((caixaComprimento) => {
                                        return getCaixa(filaCaixaComprimento, caixaComprimento, caixasAltura)
                                    })
                                )
                            })
                        )
                    }

                    return (
                        [...Array(getTotalFilasCaixaComprimento()).keys()].map((filaCaixaComprimento) => {
                            return (
                                [...Array(getTotalCaixasComprimento()).keys()].map((caixaComprimento) => {
                                    return getCaixaImpar(filaCaixaComprimento, caixaComprimento, caixasAltura)
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
