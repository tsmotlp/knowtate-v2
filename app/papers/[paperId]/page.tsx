import { getPaperWithNotes } from "@/data/paper";
import { PaperReader } from "./_components/paper-reader";

interface PaperIdPageProps {
  params: {
    paperId: string;
  };
}

const PaperIdPage = async ({ params }: PaperIdPageProps) => {
  const paperWithNotes = await getPaperWithNotes(params.paperId)
  return (
    <PaperReader paperWithNotes={paperWithNotes} />
  )
}

export default PaperIdPage