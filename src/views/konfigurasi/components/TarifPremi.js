import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Select
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { HiMinus, HiPlus, HiUser } from 'react-icons/hi'

import { TbInfoCircle } from 'react-icons/tb'
import * as Yup from 'yup'


const validationSchema = Yup.object().shape({
  namaProfesi: Yup.string().required('Nama Profesi Required'),
  ratePremi: Yup.string().required('Rate Premi Required'),
  tenor: Yup.string().required('Tenor Required')
})

const namaProfesiList = [
  {
    label: 'Programmer',
    value: 'programmer'
  },
  {
    label: 'Dokter',
    value: 'dokter'
  },
  {
    label: 'Guru',
    value: 'guru'
  },
  {
    label: 'Petani',
    value: 'petani'
  }
]

const initalValue = 3.4;

const TarifPremi = ({ data = {
  namaProfesi: '',
  ratePremi: initalValue,
  tenor: ''
}, onNextChange, onBackChange, currentStepStatus }) => {

  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, 'tarifPremi', setSubmitting)
  }

  const onBack = () => {
    onBackChange?.()
  }

  let [valueRatePremi, setValueRatePremi] = useState(initalValue);

  const plus = (form, field) => {
    valueRatePremi = valueRatePremi + 0.1;
    setValueRatePremi(parseFloat(valueRatePremi.toFixed(1)));
    onSetFormBank(form, field, valueRatePremi);
  }

  const minus = (form, field) => {
    valueRatePremi = valueRatePremi - 0.1;
    setValueRatePremi(parseFloat(valueRatePremi.toFixed(1)));
    onSetFormBank(form, field, valueRatePremi);
  }

  const onSetFormBank = (form, field, value) => {
    form.setFieldValue(field.name, value)
  }

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Konfigurasi Tarif Premi</h3>
        <p>Aturan yang mengatur tenor dan rate premi sebagai tarif</p>
      </div>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          setTimeout(() => {
            onNext(values, setSubmitting)
          }, 1000)
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
                <FormItem
                  label="Nama Profesi"
                  invalid={errors.namaProfesi && touched.namaProfesi}
                  errorMessage={errors.namaProfesi}
                >
                  <Field name="namaProfesi">
                    {({ field, form }) => (
                      <Select
                        placeholder="Pilih nama profesi"
                        field={field}
                        form={form}
                        prefix={<HiUser />}
                        options={namaProfesiList}
                        value={namaProfesiList.filter(namaProfesi => namaProfesi.value === values.namaProfesi)}
                        onChange={namaProfesi => form.setFieldValue(field.name, namaProfesi.value)}
                      />
                    )}
                  </Field>
                </FormItem>
                <div className="md:grid grid-cols-3 gap-4">
                  <FormItem
                    label="Rate Premi (permil)"
                    invalid={errors.ratePremi && touched.ratePremi}
                    errorMessage={errors.ratePremi}
                  >
                    <Field
                      name="ratePremi"
                    >
                      {({ field, form }) => (
                        <Input
                          className={'text-center'}
                          suffix={<HiPlus onClick={() => plus(form, field)} />}
                          prefix={<HiMinus onClick={() => minus(form, field)} />}
                          value={valueRatePremi}
                          onChange={() => { }}
                          style={{ textAlign: 'center' }}
                        ></Input>
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Tenor"
                    invalid={errors.tenor && touched.tenor}
                    errorMessage={errors.tenor}
                    className={'col-span-2'}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="tenor"
                      placeholder="Masukkan tenor asuransi"
                      suffix="Tahun"
                      component={Input}
                    />
                  </FormItem>
                </div>

                <div className="flex justify-between gap-2 mt-10">
                  <Button type="button" onClick={onBack}>Kembali</Button>
                  <Button loading={isSubmitting} variant="solid" type="submit">
                    {currentStepStatus === 'complete' ? 'Simpan' : 'Selanjutnya'}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default TarifPremi