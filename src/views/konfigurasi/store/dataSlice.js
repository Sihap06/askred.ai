import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetKonfigurasiPks } from 'services/KonfigurasiServices'

export const getForm = createAsyncThunk('konfigurasiPksForm/data/getForm', async (data) => {
    const response = await apiGetKonfigurasiPks(data)
    return response.data
})

const dataSlice = createSlice({
    name: 'konfigurasiPksForm/data',
    initialState: {
        formData: {
            dataPks: {
                partner: '',
                noPks: '',
                periode_awal: '',
                periode_akhir: '',
                noPolisInduk: '',
                penerbitan: '',
                filePks: '',
            },
            bankFee: {
                bankFee: '',
            },
            penerbitanPolis: {
                medis: '',
                profesi: ''
            },
            financialInformation: {
                taxResident: '',
                tin: '',
                noTin: false,
                noTinReason: '',
                occupation: '',
                annualIncome: '',
                sourceOfWealth: '',
                companyInformation: {
                    companyName: '',
                    contactNumber: '',
                    country: '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    zipCode: '',
                }
            }
        },
        stepStatus: {
            0: { status: 'pending' },
            1: { status: 'pending' },
            2: { status: 'pending' },
            3: { status: 'pending' },
            4: { status: 'pending' },
            6: { status: 'pending' },
            7: { status: 'pending' },
            8: { status: 'pending' },
            9: { status: 'pending' },
        }
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
    },
    extraReducers: {
        [getForm.fulfilled]: (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        },
    }
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
