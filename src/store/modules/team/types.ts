import { number } from 'fp-ts';

export interface TeamState {
  authDisabled: boolean,
  teamSpaceData: Array<object>,
  showDialog: boolean,
  flag: string,
  createData: any,
  btnSubmit: any,
  inviteData: any,
  showInviteDialog: boolean,
  teamId: any
}
export interface AddTeamSpaceData {
  description: string,
  name: string,
  category: string
}
