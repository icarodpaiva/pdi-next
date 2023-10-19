export interface RequestError {
  message: string
  error: string
  statusCode: number
}

export interface PageData {
  slug: string
  sections: Component[]
}

export interface Component {
  section: string
  formData: object
}
