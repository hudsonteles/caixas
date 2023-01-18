import { Typography } from '@mui/material';
import { Text, Html } from '@react-three/drei';
import { Fragment } from 'react';
import { Canvas } from 'react-three-fiber';
import Objetos3d from '.';
import { Caixa } from '../../interfaces/Caixa';
import { Palete } from '../../interfaces/Palete';

type Props = {
    palete: Palete,
    caixa: Caixa,
    showCotas: boolean,
    arranjo: string
}

const Palete = ({
    palete,
    caixa,
    showCotas,
    arranjo
}: Props) => {

    const { Palete3d, Linha } = Objetos3d();

    const getCaixasAltura = () => {
        const total = Math.ceil(palete.alturaMaxima/caixa.altura)
        return total * caixa.altura > palete.alturaMaxima ? total - 1 : total
    }

    return (
        <>
            <Palete3d
                mesh={{
                    position: [
                        0,
                        -(caixa.altura-((caixa.altura/2) - (palete.altura / 2))),
                        0
                    ]
                }}
                box={{
                    dimensions: [palete.largura, palete.altura, palete.comprimento]
                }}
            />

            {
                showCotas &&
                <>
                    <Linha
                        start={[
                            -(palete.largura/2) - 10,
                            -(palete.altura + (caixa.altura/2)),
                            -(palete.comprimento/2)
                        ]} end={[
                            -(palete.largura/2) - 10,
                            -(palete.altura + (caixa.altura/2)),
                            (palete.largura/2)
                        ]}
                    />

                    <Text
                        position={[
                            -(palete.comprimento/2) - 20,
                            -(palete.altura + (caixa.altura/2)) - 5,
                            0
                        ]}
                        fontSize={5}
                    >
                        <group>
                            <Html>
                                <Typography
                                    color="white"
                                >
                                    {`${palete.comprimento}cm`}
                                </Typography>
                            </Html>
                        </group>
                    </Text>

                    <Linha
                        start={[
                            -(palete.largura/2) ,
                            -(palete.altura + (caixa.altura/2)),
                            (palete.comprimento/2) + 10
                        ]} end={[
                            (palete.comprimento/2) + 10,
                            -(palete.altura + (caixa.altura/2)),
                            (palete.comprimento/2) + 10
                        ]}
                    />

                    <Text
                        position={[
                            0 ,
                            -(palete.altura + (caixa.altura/2)) - 5,
                            (palete.comprimento/2) + 10
                        ]}
                        fontSize={5}
                    >
                        <group>
                            <Html>
                                <Typography
                                    color="white"
                                >
                                    {`${palete.largura}cm`}
                                </Typography>
                            </Html>
                        </group>
                    </Text>

                    <Linha
                        start={[
                            (palete.comprimento/2) + 10,
                            -(palete.altura + (caixa.altura/2)),
                            (palete.comprimento/2) + 10
                        ]} end={[
                            (palete.comprimento/2) + 10,
                            -(caixa.altura/2),
                            (palete.comprimento/2) + 10
                        ]}
                    />

                    <Text
                        position={[
                            (palete.comprimento/2) + 10 ,
                            -(caixa.altura/2),
                            (palete.comprimento/2) + 10
                        ]}
                        fontSize={5}
                    >
                        <group>
                            <Html>
                                <Typography
                                    color="white"
                                >
                                    {`${palete.altura}cm`}
                                </Typography>
                            </Html>
                        </group>
                    </Text>

                    <Linha
                        start={[
                            (palete.comprimento/2) + 10,
                            (getCaixasAltura() * caixa.altura) - (caixa.altura/2),
                            (palete.comprimento/2) + 10
                        ]} end={[
                            (palete.comprimento/2) + 10,
                            -(caixa.altura/2),
                            (palete.comprimento/2) + 10
                        ]}
                    />

                    <Text
                        position={[
                            (palete.comprimento/2) + 10 ,
                            ((getCaixasAltura() * caixa.altura) - (palete.altura)) / 2,
                            (palete.comprimento/2) + 10
                        ]}
                        fontSize={5}
                    >
                        <group>
                            <Html>
                                <Typography
                                    color="white"
                                >
                                    {`${getCaixasAltura() * caixa.altura}cm`}
                                </Typography>
                            </Html>
                        </group>
                    </Text>
                </>
            }
        </>
    )

}

export default Palete;
