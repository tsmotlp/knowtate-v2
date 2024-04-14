import { archivePaper, favoritePaper, getPaperById, removePaper, renamePaper } from "@/data/paper"
import { NextResponse } from "next/server"

export const PATCH = async (
  req: Request,
  { params }: { params: { paperId: string } }
) => {
  try {
    const body = await req.json()
    const { title, archived, favorited } = body
    if (title) {
      const renamedPaper = await renamePaper(params.paperId, title)
      if (renamedPaper) {
        return NextResponse.json(renamedPaper)
      }
      return new NextResponse("Failed to update paper", { status: 500 })
    } else if (archived === true) {
      const archivedPaper = await archivePaper(params.paperId, true)
      if (archivedPaper) {
        return NextResponse.json(archivedPaper)
      }
      return new NextResponse("Failed to update paper", { status: 500 })
    } else if (archived === false) {
      const restoredPaper = await archivePaper(params.paperId, false)
      if (restoredPaper) {
        return NextResponse.json(restoredPaper)
      }
      return new NextResponse("Failed to update paper", { status: 500 })
    } else if (favorited === true) {
      const favoritedPaper = await favoritePaper(params.paperId, true)
      if (favoritedPaper) {
        return NextResponse.json(favoritedPaper)
      }
      return new NextResponse("Failed to update paper", { status: 500 })
    } else if (favorited === false) {
      const unfavoritedPaper = await favoritePaper(params.paperId, false)
      if (unfavoritedPaper) {
        return NextResponse.json(unfavoritedPaper)
      }
      return new NextResponse("Failed to update paper", { status: 500 })
    } else {
      return new NextResponse("Unexpected field", { status: 404 })
    }
  } catch (error) {
    console.log("UPDATE PAPER ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: { paperId: string } }
) => {
  try {
    const removedPaper = await removePaper(params.paperId)
    if (removedPaper) {
      return new NextResponse("Paper removed", { status: 200 })
    }
  } catch (error) {
    console.log("DELETE PAPER ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export const GET = async ({
  params
}: {
  params: {
    paperId: string
  }
}) => {
  try {
    const paper = await getPaperById(params.paperId)
    if (paper) {
      return NextResponse.json(paper)
    }
  } catch (error) {
    console.log("GET PAPER ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}