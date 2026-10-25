import { Elysia } from "elysia";
import { db } from "../db/index";
import { produkTable } from "../db/schema";
import { eq } from 'drizzle-orm';

export const produkRoute = new Elysia({
    prefix: "/produk"
});

produkRoute.get("/", async () => {
    const data = await db.select().from(produkTable);
    return data;
})

produkRoute.get("/:id", async ({ params}) => {
    const id = params.id;
    const data = await db.select()
        .from(produkTable)
        .where(eq(produkTable.id, id));
    return data;
})

// 3. Create produk
produkRoute.post("/", async ({ body }) => {
    
    if (!body || Object.keys(body).length === 0) {
        return { error: "Body data produk tidak boleh kosong!" };
    }
    const data = await db.insert(produkTable)
        .values(body as any) 
        .returning();

    return data;
});

// 4. Update produk
produkRoute.put("/:id", async ({ params, body }) => {
    const id = Number(params.id);

    const data = await db.update(produkTable)
        .set(body)
        .where(eq(produkTable.id, id))
        .returning();

    return data;
});

// 5. Delete produk
produkRoute.delete("/:id", async ({ params }) => {
    const id = Number(params.id);

    const data = await db.delete(produkTable)
        .where(eq(produkTable.id, id))
        .returning();

    return data;
});
// Buat CRUD untuk produk
// 1. Create produk
// 2. Read produk [sudah]
// 3. Update produk
// 4. Delete produk 