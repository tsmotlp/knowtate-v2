import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import { createPaper } from "@/data/paper";
import { createNote } from "@/data/note";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    const paper = formData.get("paper") as any;
    const title = formData.get("title") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!paper) {
      return new NextResponse("No paper uploaded", { status: 404 });
    }

    if (!title) {
      return new NextResponse("Title is not specified", { status: 404 });
    }

    // 处理文件的保存
    const url = `/papers/${Date.now().toString()}.pdf`;
    const data = await paper.arrayBuffer();
    const buffer = Buffer.from(data);
    await fs.writeFile(`public${url}`, buffer);
    const paperInfo = await createPaper(title, url, categoryId)
    if (paperInfo) {
      await createNote("未命名笔记", "Markdown", "notes", paperInfo.id)
      await createNote("未命名白板", "Whiteboard", "notes", paperInfo.id)
      return NextResponse.json(paperInfo);
    }
  } catch (error) {
    console.log("UPLOAD PAPER ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}