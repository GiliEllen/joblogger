
export interface User {
  _id: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  jobField: string,
  phoneNumber: string,
  gender?: {
    type: string,
    enum: ["Male", "Female", "NO"],
  },
}

