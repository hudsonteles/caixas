import { useState } from "react";
import * as yup from 'yup';

const ConfigForm = () => {

    const [initialValues] = useState<{
        larguraPalete: number,
        comprimentoPalete: number,
        alturaPalete: number,
        alturaMaximaPalete: number,
        larguraCaixa: number,
        comprimentoCaixa: number,
        alturaCaixa: number,
        arranjo: string
    }>({
        larguraPalete: 0,
        comprimentoPalete: 0,
        alturaPalete: 0,
        alturaMaximaPalete: 0,
        larguraCaixa: 0,
        comprimentoCaixa: 0,
        alturaCaixa: 0,
        arranjo: ''
    })

    const schemaValidation = yup.object().shape({
        larguraPalete: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(500, 'Deve ser um valor até 500cm')
            .required("Campo obrigatório"),
        comprimentoPalete: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(500, 'Deve ser um valor até 500cm')
            .required("Campo obrigatório"),
        alturaPalete: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(50, 'Deve ser um valor até 50cm')
            .required("Campo obrigatório"),
        alturaMaximaPalete: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(500, 'Deve ser um valor até 500cm')
            .required("Campo obrigatório"),
        larguraCaixa: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(yup.ref("larguraPalete"), 'A largura da caixa não pode ser maior que a do palete')
            .required("Campo obrigatório"),
        comprimentoCaixa: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(yup.ref("comprimentoPalete"), 'O comprimento da caixa não pode ser maior que o do palete')
            .required("Campo obrigatório"),
        alturaCaixa: yup
            .number()
            .typeError("Campo obrigatório")
            .moreThan(0, 'Deve ser maior que 0')
            .max(yup.ref("alturaMaximaPalete"), 'A altura da caixa não pode ser maior que a do palete')
            .required("Campo obrigatório"),
        arranjo: yup
            .string()
            .typeError("Campo obrigatório")
            .required("Campo obrigatório")
    })

    return {initialValues, schemaValidation}

}

export default ConfigForm;
