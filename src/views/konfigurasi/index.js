import React, { useEffect, useMemo, lazy, Suspense } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import FormStep from './components/FormStep'
import { useDispatch, useSelector } from 'react-redux'
import { getForm, setStepStatus, setFormData } from './store/dataSlice'
import { setCurrentStep } from './store/stateSlice'
import reducer from './store'
import { injectReducer } from 'store/index'

injectReducer('konfigurasiPksForm', reducer)

const DataPks = lazy(() => import('./components/DataPks'))
const BankFee = lazy(() => import('./components/BankFee'))
const PenerbitanPolis = lazy(() => import('./components/PenerbitanPolis'))
const TarifPremi = lazy(() => import('./components/TarifPremi'))
const AccountReview = lazy(() => import('./components/AccountReview'))

const DetailForm = () => {

  const dispatch = useDispatch()
  const stepStatus = useSelector((state) => state.konfigurasiPksForm.data.stepStatus)
  const currentStep = useSelector((state) => state.konfigurasiPksForm.state.currentStep)
  const formData = useSelector((state) => state.konfigurasiPksForm.data.formData)

  useEffect(() => {
    dispatch(getForm())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNextChange = (values, name) => {
    const nextStep = currentStep + 1
    dispatch(setFormData({ [name]: values }))
    dispatch(setStepStatus({ [currentStep]: { status: 'complete' }, [nextStep]: { status: 'current' } }))
    dispatch(setCurrentStep(nextStep))
  }

  const handleBackChange = () => {
    const previousStep = currentStep - 1
    dispatch(setCurrentStep(previousStep))
  }

  const currentStepStatus = useMemo(() => stepStatus[currentStep].status, [stepStatus, currentStep])

  return (
    <Container className="h-full">
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
          <div className={currentStep !== 4 ? '2xl:col-span-4 lg:col-span-3 xl:col-span-2' : 'lg:col-span-5'}>
            <Suspense fallback={<></>}>
              {currentStep === 0 && (
                <DataPks
                  data={formData.dataPks}
                  onNextChange={handleNextChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 1 && (
                <BankFee
                  data={formData.bankFee}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 2 && (
                <PenerbitanPolis
                  data={formData.penerbitanPolis}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 3 && (
                <TarifPremi
                  data={formData.financialInformation}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 4 && (
                <AccountReview />
              )}
            </Suspense>
          </div>
          {
            currentStep !== 4 && (
              <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2">
                <FormStep
                  currentStep={currentStep}
                  currentStepStatus={currentStepStatus}
                  stepStatus={stepStatus}
                />
              </div>
            )
          }
        </div>

      </AdaptableCard>
    </Container>
  )
}

export default DetailForm