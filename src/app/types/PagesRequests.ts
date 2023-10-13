export interface RequestError {
  message: string
  error: string
  statusCode: number
}

export interface PageData {
  slug: string
  sections: ISection[]
}

export interface ISection {
  section: string
  formData: object
}
