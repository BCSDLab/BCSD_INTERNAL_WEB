import * as S from './style';

export default function GridLayout() {
  return (
    <div css={S.container}>
      <div css={S.memberTypeContainer}>MENTOR</div>
      <div css={S.memberTypeContainer}>REGULAR</div>
      <div css={S.memberTypeContainer}>BEGINNER</div>
    </div>

  );
}
