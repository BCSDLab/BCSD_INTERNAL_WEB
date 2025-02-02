import { useApplyParsedData } from './useApplyParsedData';
import { useParseExcelData } from './useParseExcelFile';
import { useReadExcelFile } from './useReadExcelFile';

interface WorkflowPipelineProps {
  excelFileRef: React.RefObject<HTMLInputElement>;
}

export function useWorkflowPipeline({ excelFileRef }: WorkflowPipelineProps) {
  const readExcelFile = useReadExcelFile(excelFileRef);
  const { parseExcelData } = useParseExcelData();
  const { applyFeeStatus, markExempt, updateUnpaidStatus } = useApplyParsedData();

  const runWorkflow = async () => {
    const worksheet = await readExcelFile();
    if (worksheet === null) return;
    const parsedData = parseExcelData(worksheet);
    applyFeeStatus(parsedData);
    markExempt();
    updateUnpaidStatus();
  };

  return { runWorkflow };
}
