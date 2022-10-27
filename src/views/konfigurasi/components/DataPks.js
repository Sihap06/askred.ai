import {
	Input,
	Button,
	DatePicker,
	Select,
	FormItem,
	FormContainer,
	Upload
} from 'components/ui'
import FileItemNoBorder from 'components/ui/Upload/FileItemNoBorder'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'


const validationSchema = Yup.object().shape({
	partner: Yup.string().required('Pihak Partner Kerjasama Required'),
	noPks: Yup.string().required('Nomor PKS Required'),
	periode_awal: Yup.string().required('Periode Awal PKS Required'),
	periode_akhir: Yup.string().required('Periode Akhir PKS Required'),
	noPolisInduk: Yup.string().required('Nomor Polis Induk Required'),
	penerbitan: Yup.string().required('Tipe Penerbitan Polis Required'),
	filePks: Yup.array().required('Tipe Penerbitan Polis Required'),
})

const partnerList = [
	{
		label: 'Maximus',
		value: 'maximus'
	},
	{
		label: 'Candi',
		value: 'candi'
	},
	{
		label: 'Jiwasraya',
		value: 'jiwasraya'
	},
	{
		label: 'Merimen',
		value: 'merimen'
	}
]

const penerbitanList = [
	{
		label: 'Upload data (excel)',
		value: 'excel'
	}
]


const DocumentUploadField = (props) => {

	const [filesss, setFilesss] = useState(null)

	const { label, name, children, touched, errors } = props

	const onSetFormFile = (form, field, file) => {
		form.setFieldValue(field.name, file)
		setFilesss(file);
		console.log(form.values['filePks']);
	}

	const beforeUpload = (file) => {
		let valid = true

		const allowedFileType = ['application/pdf']

		for (let f of file) {
			if (!allowedFileType.includes(f.type)) {
				valid = 'Please upload a pdf file!'
			}
		}

		return valid
	}

	return (
		<FormItem
			label={label}
			invalid={errors[name] && touched[name]}
			errorMessage={errors[name]}
		>
			<Field name={name}>
				{({ field, form }) => (
					<Upload
						draggable
						className="cursor-pointer w-full"
						onChange={files => onSetFormFile(form, field, files)}
						onFileRemove={files => onSetFormFile(form, field, files)}
						showList={false}
						uploadLimit={1}
						accept={'.pdf'}
						beforeUpload={beforeUpload}
					>
						{
							form.values['filePks'] ?
								<div className="upload-file-list">
									{form.values['filePks'].map((file, index) => (
										<FileItemNoBorder file={file} key={file.name + index} />
									))}
								</div>
								:
								filesss ?
									<div className="upload-file-list">
										{filesss.map((file, index) => (
											<FileItemNoBorder file={file} key={file.name + index} />
										))}
									</div>
									:
									<div className="text-center">
										{children}
										<p className="font-semibold">
											<span className="text-gray-800 dark:text-white">Unggah File PKS</span>
										</p>
									</div>
						}
					</Upload>
				)}
			</Field>
		</FormItem>
	)
}

const DataPks = ({ data = {
	partner: '',
	noPks: '',
	periode_awal: '',
	periode_akhir: '',
	noPolisInduk: '',
	penerbitan: '',
	filePks: ''
}, onNextChange, currentStepStatus }) => {

	const onNext = (values, setSubmitting) => {
		onNextChange?.(values, 'dataPks', setSubmitting)
	}

	return (
		<>
			<div className="mb-8">
				<h3 className="mb-2">Masukkan Data PKS</h3>
				<p>Informasi PKS yang akan dibuat</p>
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
					const validatedProps = { touched, errors }
					return (
						<Form>
							<FormContainer>
								<FormItem
									label="Pilih Pihak Partner Kerjasama "
									invalid={errors.partner && touched.partner}
									errorMessage={errors.partner}
								>
									<Field name="partner">
										{({ field, form }) => (
											<Select
												placeholder="Pilih pihak partner kerjasama"
												field={field}
												form={form}
												options={partnerList}
												value={partnerList.filter(partner => partner.value === values.partner)}
												onChange={partner => form.setFieldValue(field.name, partner.value)}
											/>
										)}
									</Field>
								</FormItem>
								<FormItem
									label="Nomor PKS"
									invalid={errors.noPks && touched.noPks}
									errorMessage={errors.noPks}
								>
									<Field
										type="text"
										autoComplete="off"
										name="noPks"
										placeholder="Masukkan nomor PKS"
										component={Input}
									/>
								</FormItem>
								<div className="md:grid grid-cols-2 gap-4">
									<FormItem
										label="Periode Awal PKS"
										invalid={errors.periode_awal && touched.periode_awal}
										errorMessage={errors.periode_awal}
									>
										<Field name="periode_awal" placeholder="Masukkan Periode awal PKS">
											{({ field, form }) => (
												<DatePicker
													field={field}
													form={form}
													value={field.value}
													onChange={(date) => {
														form.setFieldValue(field.name, date)
													}}
												/>
											)}
										</Field>
									</FormItem>
									<FormItem
										label="Periode Akhir PKS"
										invalid={errors.periode_akhir && touched.periode_akhir}
										errorMessage={errors.periode_akhir}
									>
										<Field name="periode_akhir" placeholder="Masukkan Periode awal PKS">
											{({ field, form }) => (
												<DatePicker
													field={field}
													form={form}
													value={field.value}
													onChange={(date) => {
														form.setFieldValue(field.name, date)
													}}
												/>
											)}
										</Field>
									</FormItem>
								</div>
								<FormItem
									label="Nomor Polis Induk"
									invalid={errors.noPolisInduk && touched.noPolisInduk}
									errorMessage={errors.noPolisInduk}
								>
									<Field
										type="text"
										autoComplete="off"
										name="noPolisInduk"
										placeholder="Masukkan nomor polis induk"
										component={Input}
									/>
								</FormItem>
								<FormItem
									label="Tipe Penerbitan Polis"
									invalid={errors.tipePenerbitanPolis && touched.tipePenerbitanPolis}
									errorMessage={errors.tipePenerbitanPolis}
								>
									<Field name="penerbitan">
										{({ field, form }) => (
											<Select
												placeholder="Pilih tipe penerbitan polis"
												field={field}
												form={form}
												options={penerbitanList}
												value={penerbitanList.filter(penerbitan => penerbitan.value === values.penerbitan)}
												onChange={penerbitan => form.setFieldValue(field.name, penerbitan.value)}
											/>
										)}
									</Field>
								</FormItem>

								<DocumentUploadField
									name="filePks"
									label="Unggah File PKS"
									errors={errors.filePks}
									touched={touched.filePks}
									{...validatedProps}
								></DocumentUploadField>

								<div className="flex justify-start gap-2">
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

export default DataPks