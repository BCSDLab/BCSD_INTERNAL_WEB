import { CircularProgress } from "@mui/material";
import * as S from "./style";

export default function LoadingSpinner() {
  return (
    <div css={S.loading}>
      <CircularProgress />
    </div>
  )
}