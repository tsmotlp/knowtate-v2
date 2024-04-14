import { Navbar } from "@/components/navbar"

const PaperIdPageLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <main
        className="h-full pt-12"
      >
        {children}
      </main>
    </div>
  )
}

export default PaperIdPageLayout