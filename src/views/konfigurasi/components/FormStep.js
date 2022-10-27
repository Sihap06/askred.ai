import React from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'components/ui'
import { HiCheckCircle, HiLockClosed } from 'react-icons/hi'
import useThemeClass from 'utils/hooks/useThemeClass'
import { setCurrentStep } from '../store/stateSlice'
import { setStepStatus } from '../store/dataSlice'

const steps = [
	{ label: 'Data PKS', value: 0 },
	{ label: 'Rate dan Biaya', value: 1 },
	{ label: 'Penerbitan Polis', value: 2 },
	{ label: 'Tarif Premi', value: 3 },
	{ label: 'Profesi', value: 4 }
]

const FormStep = ({ currentStep, currentStepStatus, stepStatus }) => {

	const { textTheme } = useThemeClass()
	const dispatch = useDispatch()

	const onStepChange = (step) => {

		const selectedStepStatus = stepStatus[step].status

		if (selectedStepStatus === 'complete' || selectedStepStatus === 'current') {
			dispatch(setCurrentStep(step))
			return
		}

		if (step !== currentStep && step < currentStep) {
			if (currentStepStatus === 'pending') {
				dispatch(setStepStatus('complete'))
			}
			dispatch(setCurrentStep(step))
		}
	}

	return (
		<Menu variant="transparent" className="px-2">
			{steps.map(step => (
				<Menu.MenuItem
					key={step.value}
					eventKey={step.value.toString()}
					className={step.value >= 3 ? `mb-2 pl-20` : `mb-2`}
					onClick={() => onStepChange(step.value)}
					isActive={currentStep === step.value}
				>
					<span className='text-2xl ltr:mr-2 rtl:ml-2'>
						{stepStatus[step.value].status === 'complete' && <HiCheckCircle className={textTheme} />}
						{stepStatus[step.value].status === 'current' && <HiCheckCircle className="text-gray-400" />}
						{(stepStatus[step.value].status === 'pending' && currentStep === step.value) && (
							<HiCheckCircle className="text-gray-400" />
						)}
						{(stepStatus[step.value].status === 'pending' && currentStep !== step.value) && (
							<HiLockClosed className="text-gray-400" />
						)}
						{stepStatus[step.value].status === 'invalid' && <HiCheckCircle className="text-gray-400" />}
					</span>
					<span>{step.label}</span>
				</Menu.MenuItem >
			))}
		</Menu>
	)
}

export default FormStep