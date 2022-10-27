export const accountFormData = {
  formData: {
    dataPks: {
      partner: '',
      noPks: '',
      periodeAwal: '',
      periodeAkhir: '',
      noPolisInduk: '',
      penerbitan: '',
      filePks: '',
    },
    bankFee: {
      bankFee: '',
    },
    addressInformation: {
      country: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      sameCorrespondenceAddress: true,
      correspondenceAddress: {
        country: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
      }
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
  formStatus: {
    0: { status: 'pending' },
    1: { status: 'pending' },
    2: { status: 'pending' },
    3: { status: 'pending' },
    4: { status: 'pending' }
  }
}