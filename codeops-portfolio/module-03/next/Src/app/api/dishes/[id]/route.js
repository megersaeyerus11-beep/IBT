import { menu } from "../../../data/menu";

export async function GET(request, { params }) {
const { id } = await params;

const dish = menu.find(
    (item) => String(item.id) === String(id)
);

if (!dish) {
    return Response.json(
    { error: "Dish not found" },
    { status: 404 }
    );
}

return Response.json(dish);
}