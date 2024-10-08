// 보여줘야 하는 정보
// unpaidCount, 각 미납 내역들
import { useEffect, useState } from 'react';
import { useQueryParam } from 'util/hooks/useQueryParam';
import YearPagination from 'component/YearPagination';
import { useGetAllDues } from 'query/dues';
import { useGetMe } from 'query/members';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { STATUS } from 'util/constants/status';
import * as S from './style';

const tableHeader = ['월', '납부 여부', '사유'];

export default function PersonalDues() {
  const currentYear = new Date().getFullYear();
  const param = useQueryParam('page');
  const page = Number(param);
  const [duesYear, setDuesYear] = useState(page ? currentYear - page + 1 : currentYear);
  const { data: allDues, refetch } = useGetAllDues({ year: duesYear });
  const { data: myInfo } = useGetMe();

  useEffect(() => {
    refetch();
  }, [duesYear, refetch]);
  return (
    <div css={S.container}>
      <div css={S.pagination}>
        <YearPagination duesYear={duesYear} setDuesYear={setDuesYear} routeParam="dues" />
      </div>
      <div>
        <div>
          {allDues.year === duesYear && allDues.dues.map((duesInfo) => (
            <div key={duesInfo.memberId}>
              {duesInfo.memberId === myInfo.id && (
                <div>
                  <div css={S.memberInfoBox}>
                    <img css={S.memberProfile} src={myInfo.profileImageUrl} alt="내 이미지" />
                    <div css={S.memberDetailInfo}>
                      <div css={S.memberInfo}>
                        <span css={S.memberName}>{myInfo.name}</span>
                        <span css={S.memberTrackName}>{myInfo.track.name}</span>
                      </div>
                      <span css={S.unpaidCountInfo}>
                        미납횟수 :
                        {' '}
                        {duesInfo.unpaidCount}
                        회
                      </span>
                    </div>
                  </div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {tableHeader.map((header) => (
                          <TableCell css={S.tableHeader} key={header}>{header}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {duesInfo.detail.map((detail) => (
                        <TableRow key={detail.month}>
                          <TableCell css={S.tableBody}>{detail.month}</TableCell>
                          <TableCell css={S.tableBody}>
                            {detail.status !== null ? STATUS[detail.status] : '-'}
                          </TableCell>
                          <TableCell css={S.tableBody}>{detail?.memo || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
