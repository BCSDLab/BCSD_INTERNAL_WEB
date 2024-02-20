import { accessClient } from 'api';

interface File {
  fileName: string;
}

export interface FileResponse {
  presignedUrl: string,
  fileName: string
}
export const getPresignedUrl = (fileName: File) => accessClient.post<FileResponse>('infra/aws/s3/presigned-url', fileName);
