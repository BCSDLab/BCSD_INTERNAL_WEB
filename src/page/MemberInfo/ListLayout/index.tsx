import * as S from './style';

export default function ListLayout() {
  return(
    <div css={S.attributeContainer}>
      <div css={S.attribute}>이름</div>
      <div css={S.attribute}>트랙</div>
      <div css={S.attribute}>직책</div>
      <div css={S.attribute}>상태</div>
      <div css={S.attribute}>소속</div>
      <div css={S.attribute}>학부</div>
      <div css={S.longAttribute}>학번</div>
      <div css={S.longAttribute}>전화번호</div>
      <div css={S.longAttribute}>이메일</div>
      </div>
  )
}