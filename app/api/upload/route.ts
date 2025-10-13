import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "images",
      "items"
    );
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `${timestamp}-${originalName}`;
    const filepath = path.join(uploadsDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filepath, buffer);

    // Return just the filename (not the full path)
    return NextResponse.json({
      success: true,
      filename,
      url: filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// GET - List all uploaded files
export async function GET() {
  try {
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "images",
      "items"
    );

    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(uploadsDir);
    const fileList = files.map((filename) => ({
      filename,
      url: filename,
    }));

    return NextResponse.json({ files: fileList });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}

// DELETE - Delete uploaded file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 });
    }

    const filepath = path.join(
      process.cwd(),
      "public",
      "assets",
      "images",
      "items",
      filename
    );

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
