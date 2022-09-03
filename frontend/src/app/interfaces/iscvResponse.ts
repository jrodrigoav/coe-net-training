export interface IScvResponse {
    total_rows_parsed: number
    valid_rows: number
    invalid_rows: number
    // errors: Error | undefined[]
    errors: any[]
  }
  
  export interface Error {
    line_number: number
    validation_error: string
  }
  