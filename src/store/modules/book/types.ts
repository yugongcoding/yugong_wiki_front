import { number } from 'fp-ts';

export interface BookState {
  authDisabled: boolean,
  teamOptions: Array<object>,
  bookSpaceData: Array<object>,
  showDialog: boolean,
  flag: string,
  createData: any,
  btnSubmit: any,
  teamId: any
}
export interface AddBookSpaceData {
  description: string,
  name: string,
  category: string,
  teamId: any
}

export interface GetBookSpaceData {
  teamId: any
}
