import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Suspense, useState } from 'react';
import LoadingSpinner from 'layout/LoadingSpinner';
import { Item } from 'page/MemberInfo/GridLayout';
import useBooleanState from 'util/hooks/useBooleanState';
import CreateJobModal from 'component/modal/createJobModal';
import * as S from './style';
import useFindJob from './hook/useFindJob';

// 회장, 부회장
// 트랙장
// 교육장
// 그 외(TF 공통 교육 담당 등)
function ViewOfRole() {
  const defaultImageUrl = 'https://image.bcsdlab.com/default-profile.png';
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const {
    chairMen, viceChairMen, trackLeaders, educationLeaders, etc, chairMenInfo, viceChairMenInfo, trackLeadersInfo, educationLeadersInfo, etcInfo,
  } = useFindJob({ year: selectedYear });
  const { value: isCreateJobOpen, setTrue: openCreateJobModal, setFalse: closeCreateJobModal } = useBooleanState(false);

  const goToPrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const goToNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  return (
    <>
      <div css={S.pagination}>
        <div css={S.createButton}>
          <Button variant="contained" onClick={openCreateJobModal}>직책 생성</Button>
          <CreateJobModal open={isCreateJobOpen} onClose={closeCreateJobModal} />
        </div>
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
        <Grid css={S.gridWrapper(chairMen.length + viceChairMen.length)}>
          {chairMenInfo.map((chairManInfo, index) => (
            <Item css={S.memberContainer} key={chairManInfo?.name}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={chairManInfo?.profileImageUrl || defaultImageUrl} alt="profile" />
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
          {viceChairMenInfo.map((viceChairManInfo, index) => (
            <Item css={S.memberContainer} key={viceChairManInfo?.name}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={viceChairManInfo?.profileImageUrl || defaultImageUrl} alt="profile" />
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
        <Grid css={S.gridWrapper(trackLeaders.length)}>
          {trackLeadersInfo && trackLeadersInfo.map((trackLeader, index) => (
            <Item css={S.memberContainer} key={trackLeader?.name}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={trackLeader?.profileImageUrl || defaultImageUrl} alt="profile" />
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
        <Grid css={S.gridWrapper(educationLeaders.length)}>
          {educationLeadersInfo.map((educationLeader, index) => (
            <Item css={S.memberContainer} key={educationLeader?.name}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={educationLeader?.profileImageUrl || defaultImageUrl} alt="profile" />
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
        <Grid css={S.gridWrapper(etc.length)}>
          {etcInfo.map((member, index) => (
            <Item css={S.memberContainer} key={member?.name}>
              <div css={S.memberWrapper}>
                <div css={S.imageNameWrapper}>
                  <img css={S.image} src={member?.profileImageUrl || defaultImageUrl} alt="profile" />
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
