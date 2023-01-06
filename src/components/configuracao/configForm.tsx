import { useState } from "react";
import * as yup from 'yup';

const ConfigForm = () => {    

    const [initialValues] = useState<{
        larguraPalete: number | null,
        comprimentoPalete: number | null,
        alturaPalete: number | null,
        larguraCaixa: number | null,
        comprimentoCaixa: number | null,
        alturaCaixa: number | null
    }>({
        larguraPalete: null,
        comprimentoPalete: null,
        alturaPalete: null,
        larguraCaixa: null,
        comprimentoCaixa: null,
        alturaCaixa: null        
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
            .max(yup.ref("alturaPalete"), 'A altura da caixa não pode ser maior que a do palete')
            .required("Campo obrigatório")
    })

    return {initialValues, schemaValidation}

}

export default ConfigForm;