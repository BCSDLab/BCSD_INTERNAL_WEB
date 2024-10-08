import * as Excel from 'exceljs';
import { DuesInfo } from 'model/dues/allDues';
import { Pagination } from 'model/page';
import { Member } from 'model/member';
import { UseMutationResult } from '@tanstack/react-query';
import { NewDuesData } from 'api/dues';
import { MemberDuesInfo } from './findMemberDuesInfo';

interface UpdateDuesProps {
  worksheet: Excel.CellValue[][];
  members: Pagination<Member>;
  unpaidMemberDuesInfo: MemberDuesInfo[];
  currentYearDues: DuesInfo;
  putDuesMutation: UseMutationResult<any, Error, NewDuesData, unknown>;
  postDuesMutation: UseMutationResult<any, Error, NewDuesData, unknown>;
}

type UpdateNotPaidDuesToPaidProps = Pick<UpdateDuesProps, 'unpaidMemberDuesInfo' | 'putDuesMutation'> & {
  name: string;
  depositDues: number;
};

type UpdateNullDuesToPaidProps = Pick<UpdateDuesProps, 'postDuesMutation'> & {
  id: number;
  name: string;
  depositDues: number;
};

type UpdateWavierDuesProps = Pick<UpdateDuesProps, 'postDuesMutation' | 'members'>;
type UpdateNullToNotPaidDuesProps = Pick<UpdateDuesProps, 'postDuesMutation' | 'currentYearDues'>;

// depositDues만큼 unpaidMemberDuesInfo를 반영하여 mutate하기
function updateNotPaidDuesToPaid({
  name, depositDues, unpaidMemberDuesInfo, putDuesMutation,
}: UpdateNotPaidDuesToPaidProps) {
  let leftDepositDues = depositDues;
  if (depositDues % 10000 === 0) {
    Array.from({ length: depositDues }).forEach((_, index) => {
      // TODO: 동명이인 처리
      const memberDuesInfo = unpaidMemberDuesInfo.find((info) => info.name === name);
      if (memberDuesInfo) {
        const { id, notPaidMonthInfo } = memberDuesInfo;
        const { year, month } = notPaidMonthInfo[index];
        putDuesMutation.mutate({
          memberId: id,
          year,
          month,
          status: 'PAID',
        });
        leftDepositDues -= 10000;
      }
    });
  }
  return leftDepositDues;
}

function updateNullDuesToPaid({ id, depositDues, postDuesMutation }: UpdateNullDuesToPaidProps) {
  // 회비를 매 달 1일에 정리하기 때문에 저번 달을 기준으로 처리한다.
  const currentYear = new Date().getFullYear();
  const prevMonth = new Date().getMonth();
  Array.from({ length: depositDues }).forEach((_, index) => {
    const year = prevMonth + index > 12 ? currentYear + 1 : currentYear;
    const month = ((prevMonth + index) % 12) + 1;
    postDuesMutation.mutate({
      memberId: id,
      year,
      month,
      status: 'PAID',
    });
  });
}

function updateWavierDues({ postDuesMutation, members }: UpdateWavierDuesProps) {
  members.content.forEach((member) => {
    if (member.isFeeExempted) {
      postDuesMutation.mutate({
        memberId: member.id,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        status: 'SKIP',
      });
    }
  });
}

function updateNullToNotPaidDues({ currentYearDues, postDuesMutation }: UpdateNullToNotPaidDuesProps) {
  currentYearDues.dues.forEach((dues) => {
    const prevMonth = new Date().getMonth();
    if (dues.detail[prevMonth].status === null) {
      postDuesMutation.mutate({
        memberId: dues.memberId,
        year: new Date().getFullYear(),
        month: prevMonth + 1,
        status: 'NOT_PAID',
      });
    }
  });
}

export function updateDues({
  worksheet, members, unpaidMemberDuesInfo, currentYearDues, putDuesMutation, postDuesMutation,
}: UpdateDuesProps) {
  worksheet.forEach((row) => {
    const [, , depositValue, , content, , note] = row;
    const depositDues = Number(depositValue);
    const name = String(content);
    const id = members.content.find((member) => member.name === name)?.id;
    let leftDepositDues;

    if (name && depositDues && id) {
      // type note = 'X' | '-' | `id=${id}`;
      if (note !== 'X') {
        /**
         * 1. 미납된 회비를 납부한 경우, 미납된 회비를 납부 처리한다.
         * 2. 미납된 회비가 없는 경우, 납부한 달의 회비를 납부 처리한다.
         * 3. 면제 인원의 경우 면제 처리한다.
         * 4. 납부한 회비가 없는 경우 미납 처리한다. (1~3번 까지 처리가 끝난 후 아무값도 없는 경우 NOT_PAID 처리)
         */
        leftDepositDues = updateNotPaidDuesToPaid({
          name, depositDues, unpaidMemberDuesInfo, putDuesMutation,
        });
        updateNullDuesToPaid({
          id, name, depositDues: leftDepositDues, postDuesMutation,
        });
        updateWavierDues({ members, postDuesMutation });
        updateNullToNotPaidDues({ postDuesMutation, currentYearDues });
      }
    }
  });
}
