import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "menu.json");

// GET - Read all menu data
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

// POST - Create new category or item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);

    if (body.type === "category") {
      // Add new category
      data.push({
        name: body.name,
        categoreyImage: body.categoreyImage || "",
        items: [],
      });
    } else if (body.type === "item" && body.categoryIndex !== undefined) {
      // Add new item to existing category
      if (data[body.categoryIndex]) {
        data[body.categoryIndex].items.push({
          name: body.name,
          type: body.itemType || "قطعة",
          price: body.price,
          size: body.size || "",
          description: body.description || "",
          productImage: body.productImage || "",
        });
      }
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 }
    );
  }
}

// PUT - Update existing category or item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);

    if (body.type === "category" && body.categoryIndex !== undefined) {
      // Update category
      if (data[body.categoryIndex]) {
        data[body.categoryIndex] = {
          ...data[body.categoryIndex],
          name: body.name || data[body.categoryIndex].name,
          categoreyImage:
            body.categoreyImage !== undefined
              ? body.categoreyImage
              : data[body.categoryIndex].categoreyImage,
        };
      }
    } else if (
      body.type === "item" &&
      body.categoryIndex !== undefined &&
      body.itemIndex !== undefined
    ) {
      // Update item
      if (
        data[body.categoryIndex] &&
        data[body.categoryIndex].items[body.itemIndex]
      ) {
        data[body.categoryIndex].items[body.itemIndex] = {
          ...data[body.categoryIndex].items[body.itemIndex],
          name:
            body.name || data[body.categoryIndex].items[body.itemIndex].name,
          type:
            body.itemType ||
            data[body.categoryIndex].items[body.itemIndex].type,
          price:
            body.price || data[body.categoryIndex].items[body.itemIndex].price,
          size:
            body.size !== undefined
              ? body.size
              : data[body.categoryIndex].items[body.itemIndex].size,
          description:
            body.description !== undefined
              ? body.description
              : data[body.categoryIndex].items[body.itemIndex].description,
          productImage:
            body.productImage !== undefined
              ? body.productImage
              : data[body.categoryIndex].items[body.itemIndex].productImage,
        };
      }
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}

// DELETE - Delete category or item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryIndex = searchParams.get("categoryIndex");
    const itemIndex = searchParams.get("itemIndex");

    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(fileContents);

    if (categoryIndex !== null && itemIndex !== null) {
      // Delete item
      const catIdx = parseInt(categoryIndex);
      const itmIdx = parseInt(itemIndex);
      if (data[catIdx] && data[catIdx].items[itmIdx]) {
        data[catIdx].items.splice(itmIdx, 1);
      }
    } else if (categoryIndex !== null) {
      // Delete category
      const catIdx = parseInt(categoryIndex);
      if (data[catIdx]) {
        data.splice(catIdx, 1);
      }
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
