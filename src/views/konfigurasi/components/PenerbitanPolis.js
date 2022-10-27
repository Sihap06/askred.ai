import {
  Button,
  FormItem,
  FormContainer
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineCheck, HiX } from 'react-icons/hi'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  medis: Yup.string().required('Pilih Ya atau Tidak'),
  profesi: Yup.string().required('Pilih Ya atau Tidak'),
})

const PenerbitanPolis = ({ data = {
  medis: '',
  profesi: ''
}, onNextChange, onBackChange, currentStepStatus }) => {

  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, 'penerbitanPolis', setSubmitting)
  }

  const onCheck = (value, form, field) => {
    form.setFieldValue(field.name, value);
  }

  const onBack = () => {
    onBackChange?.()
  }

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Konfigurasi Penerbitan Polis</h3>
        <p>Aturan yang akan menentukan cara dan mekanisme penerbitan polis.</p>
      </div>
      <Formik
        initialValues={data}
        enableReinitialize
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
                <h5 className="mb-4">Profesi</h5>
                <FormItem
                  label="Apakah profesi seseorang dapat mempengaruhi penerbitan polis ?"
                  invalid={errors.profesi && touched.profesi}
                  errorMessage={errors.profesi}
                >
                  <Field name="profesi">
                    {({ field, form }) => (
                      <div className="flex justify-start gap-2">
                        <Button type="button" size="sm" icon={<HiOutlineCheck className='text-lg' />} className={'hover:bg-blue-500 hover:text-white'} variant={field.value === 'Ya' ? 'solid' : 'default'} onClick={() => onCheck('Ya', form, field)}>
                          <span>Ya</span>
                        </Button>
                        <Button type="button" size="sm" icon={<HiX className='text-lg' />} className={'hover:bg-blue-500 hover:text-white'} variant={field.value === 'Tidak' ? 'solid' : 'default'} onClick={() => onCheck('Tidak', form, field)}>
                          <span>Tidak</span>
                        </Button>
                      </div>
                    )}
                  </Field>
                </FormItem>

                <h5 className="mb-4">Ketentuan Medis</h5>
                <FormItem
                  label="Apakah kondisi medis tertentu dapat mempengaruhi penerbitan polis ?"
                  invalid={errors.medis && touched.medis}
                  errorMessage={errors.medis}
                >
                  <Field name="medis">
                    {({ field, form }) => (
                      <div className="flex justify-start gap-2">
                        <Button type="button" size="sm" icon={<HiOutlineCheck className='text-lg' />} className={'hover:bg-blue-500 hover:text-white'} variant={field.value === 'Ya' ? 'solid' : 'default'} onClick={() => onCheck('Ya', form, field)}>
                          <span>Ya</span>
                        </Button>
                        <Button type="button" size="sm" icon={<HiX className='text-lg' />} className={'hover:bg-blue-500 hover:text-white'} variant={field.value === 'Tidak' ? 'solid' : 'default'} onClick={() => onCheck('Tidak', form, field)}>
                          <span>Tidak</span>
                        </Button>
                      </div>

                    )}
                  </Field>
                </FormItem>
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

export default PenerbitanPolis