import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import LoadingSpinner from 'layout/LoadingSpinner';
import useBooleanState from 'util/hooks/useBooleanState';
import CreateJobModal from 'component/modal/createJobModal';
import UpdateJobModal from 'component/modal/updateJobModal';
import AddIcon from '@mui/icons-material/Add';
import { URLS } from 'const/urls';
import { useGetMe } from 'query/members';
import * as S from './style';
import { Item } from './style';
import useFindJob from './hook/useFindJob';

function ViewOfRole() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const {
    chairMen, viceChairMen, trackLeaders, educationLeaders, etc, chairMenInfo, viceChairMenInfo, trackLeadersInfo, educationLeadersInfo, etcInfo, refetch,
  } = useFindJob({ year: selectedYear });
  const { value: isCreateJobModalOpen, setTrue: openCreateJobModal, setFalse: closeCreateJobModal } = useBooleanState(false);
  const { value: isUpdateJobModalOpen, setTrue: openUpdateJobModal, setFalse: closeUpdateJobModal } = useBooleanState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number>(0);
  const { data: myInfo } = useGetMe();
  const accessAuthority = ['ADMIN', 'MANAGER'];

  const goToPrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const goToNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const handleUpdateJobModalOpen = (memberId: number | undefined, jobId: number) => {
    if (memberId && accessAuthority.includes(myInfo?.authority)) {
      setSelectedJobId(jobId);
      setSelectedMemberId(memberId);
      openUpdateJobModal();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setIsSuccess(false);
    }
  }, [isSuccess, refetch]);

  return (
    <>
      <div css={S.pagination}>
        {accessAuthority.includes(myInfo?.authority)
        && (
        <div css={S.createButton}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={openCreateJobModal}
          >
            직책 생성
          </Button>
          <CreateJobModal open={isCreateJobModalOpen} onClose={closeCreateJobModal} setIsSuccess={setIsSuccess} />
        </div>
        )}
        <Button onClick={goToPrevYear}>
          <ArrowBackIosNewOutlined />
        </Button>
        <span css={S.paginationTitle}>{selectedYear}</span>
        <Button onClick={goToNextYear} disabled={selectedYear === currentYear}>
          <ArrowForwardIosOutlined />
        </Button>
      </div>
      <div css={S.content}>
        <h3 css={S.gridTitle}>
          {`${selectedYear}년도 회장 부회장`}
        </h3>
        <Grid css={S.gridWrapper}>
          {chairMenInfo.map((chairManInfo, index) => (
            <Item css={S.memberContainer} authority={myInfo?.authority} key={chairManInfo?.name} onClick={() => handleUpdateJobModalOpen(chairManInfo?.id, chairMen[index].id)}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={chairManInfo?.profileImageUrl || URLS.defaultProfile} alt="profile" />
                  <div css={S.name}>{chairManInfo?.name}</div>
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    직책
                  </div>
                  {chairMen[index]?.type}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    트랙
                  </div>
                  {chairManInfo?.track.name}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    기간
                  </div>
                  {`${chairMen[index]?.startYear}년 ${chairMen[index]?.startMonth}월 ~ ${chairMen[index]?.endYear}년 ${chairMen[index]?.endMonth}월`}
                </div>
              </div>
            </Item>
          ))}
          {viceChairMenInfo && viceChairMenInfo.map((viceChairManInfo, index) => (
            <Item css={S.memberContainer} authority={myInfo?.authority} key={viceChairManInfo?.name} onClick={() => handleUpdateJobModalOpen(viceChairManInfo?.id, viceChairMen[index].id)}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={viceChairManInfo?.profileImageUrl || URLS.defaultProfile} alt="profile" />
                  <div css={S.name}>{viceChairManInfo?.name}</div>
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    직책
                  </div>
                  {viceChairMen[index]?.type}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    트랙
                  </div>
                  {viceChairManInfo?.track.name}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    기간
                  </div>
                  {`${viceChairMen[index]?.startYear}년 ${viceChairMen[index]?.startMonth}월 ~ ${viceChairMen[index]?.endYear}년 ${viceChairMen[index]?.endMonth}월`}
                </div>
              </div>
            </Item>
          ))}
        </Grid>
        <h3 css={S.gridTitle}>
          {`${selectedYear}년도 트랙장`}
        </h3>
        <Grid css={S.gridWrapper}>
          {trackLeadersInfo && trackLeadersInfo.map((trackLeader, index) => (
            <Item css={S.memberContainer} authority={myInfo?.authority} key={trackLeader?.name} onClick={() => handleUpdateJobModalOpen(trackLeader?.id, trackLeaders[index].id)}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={trackLeader?.profileImageUrl || URLS.defaultProfile} alt="profile" />
                  <div css={S.name}>{trackLeader?.name}</div>
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    직책
                  </div>
                  {trackLeaders[index]?.type}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    트랙
                  </div>
                  {trackLeader?.track.name}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    기간
                  </div>
                  {`${trackLeaders[index]?.startYear}년 ${trackLeaders[index]?.startMonth}월 ~ ${trackLeaders[index]?.endYear}년 ${trackLeaders[index]?.endMonth}월`}
                </div>
              </div>
            </Item>
          ))}
        </Grid>
        <h3 css={S.gridTitle}>
          {`${selectedYear}년도 교육장`}
        </h3>
        <Grid css={S.gridWrapper}>
          {educationLeadersInfo.map((educationLeader, index) => (
            <Item css={S.memberContainer} authority={myInfo?.authority} key={educationLeader?.name} onClick={() => handleUpdateJobModalOpen(educationLeader?.id, educationLeaders[index].id)}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={educationLeader?.profileImageUrl || URLS.defaultProfile} alt="profile" />
                  <div css={S.name}>{educationLeader?.name}</div>
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    직책
                  </div>
                  {educationLeaders[index]?.type}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    트랙
                  </div>
                  {educationLeader?.track.name}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    기간
                  </div>
                  {`${educationLeaders[index]?.startYear}년 ${educationLeaders[index]?.startMonth}월 ~ ${educationLeaders[index]?.endYear}년 ${educationLeaders[index]?.endMonth}월`}
                </div>
              </div>
            </Item>
          ))}
        </Grid>
        <h3 css={S.gridTitle}>
          {`${selectedYear}년도 기타`}
        </h3>
        <Grid css={S.gridWrapper}>
          {etcInfo.map((member, index) => (
            <Item css={S.memberContainer} authority={myInfo?.authority} key={member?.name} onClick={() => handleUpdateJobModalOpen(member?.id, etc[index].id)}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={member?.profileImageUrl || URLS.defaultProfile} alt="profile" />
                  <div css={S.name}>{member?.name}</div>
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    직책
                  </div>
                  {etc[index]?.type}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    트랙
                  </div>
                  {member?.track.name}
                </div>
                <div>
                  <div css={S.memberInfoLabel}>
                    기간
                  </div>
                  {`${etc[index]?.startYear}년 ${etc[index]?.startMonth}월 ~ ${etc[index]?.endYear}년 ${etc[index]?.endMonth}월`}
                </div>
              </div>
            </Item>
          ))}
        </Grid>
      </div>
      <UpdateJobModal open={isUpdateJobModalOpen} onClose={closeUpdateJobModal} memberId={selectedMemberId} setIsSuccess={setIsSuccess} jobId={selectedJobId} selectedYear={selectedYear} />
    </>
  );
}

export default function Role() {
  return (
    <div css={S.container}>
      <Suspense fallback={<LoadingSpinner />}>
        <ViewOfRole />
      </Suspense>
    </div>
  );
}
