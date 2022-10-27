import {
	Input,
	Button,
	FormItem,
	FormContainer
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { TbInfoCircle } from 'react-icons/tb'
import * as Yup from 'yup'


const validationSchema = Yup.object().shape({
	bank_fee: Yup.string().required('Bank Fee Required')
})

const initalValue = 3.4;

const BankFee = ({ data = {
	bank_fee: '',
}, onNextChange, onBackChange, currentStepStatus }) => {

	const onNext = (values, setSubmitting) => {
		onNextChange?.(values, 'bankFee', setSubmitting)
	}
	const onBack = () => {
		onBackChange?.()
	}

	let [valueBankFee, setValueBankFee] = useState(initalValue);

	const plus = (form, field) => {
		valueBankFee = form.values['bank_fee'] ? form.values['bank_fee'] + 0.1 : valueBankFee + 0.1;
		setValueBankFee(parseFloat(valueBankFee.toFixed(1)));
		onSetFormBank(form, field, parseFloat(valueBankFee.toFixed(1)));
	}

	const minus = (form, field) => {
		valueBankFee = form.values['bank_fee'] ? form.values['bank_fee'] - 0.1 : valueBankFee - 0.1;
		setValueBankFee(parseFloat(valueBankFee.toFixed(1)));
		onSetFormBank(form, field, parseFloat(valueBankFee.toFixed(1)));
	}

	const onSetFormBank = (form, field, value) => {
		form.setFieldValue(field.name, value)
	}

	return (
		<>
			<div className="mb-8">
				<h3 className="mb-2">Masukkan data Rate dan Biaya PKS</h3>
				<p>Informasi yang akan mengatur rate, banks fee.</p>
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
								<div className="flex">
									<FormItem
										label="Bank Fee (%)"
										invalid={errors.bank_fee && touched.bank_fee}
										errorMessage={errors.bank_fee}
										className={'w-1/4'}
									>
										<Field
											name="bank_fee"
										>
											{({ field, form }) => (
												<Input
													className={'text-center'}
													suffix={<HiPlus className='cursor-pointer' onClick={() => plus(form, field)} />}
													prefix={<HiMinus className='cursor-pointer' onClick={() => minus(form, field)} />}
													value={values.bank_fee ? values.bank_fee : valueBankFee}
													onChange={() => { }}
													style={{ textAlign: 'center' }}
												></Input>
											)}
										</Field>
									</FormItem>
									<div className='flex col-span-2 my-auto w-3/4 pl-4'>
										<TbInfoCircle className='text-lg' />
										<p className='ml-2'>Bank Fee adalah fee atau biaya yang diterima oleh bank selaku ....</p>

									</div>
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

export default BankFee