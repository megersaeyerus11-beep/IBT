export async function POST(request) {
  try {
    const body = await request.json();

    const { name, phone, area, notes } = body;

    const fieldErrors = {};

    // Name
    if (!name || name.trim() === "") {
      fieldErrors.name = "Name is required.";
    }

    // Phone
    const phoneRegex = /^(?:\+251|0)9\d{8}$/;

    if (!phone || !phoneRegex.test(phone)) {
      fieldErrors.phone = "Enter a valid TeleBirr phone number.";
    }

    // Area
    const validAreas = ["Bole", "Kazanchis", "Megenagna"];

    if (!area || !validAreas.includes(area)) {
      fieldErrors.area = "Select a valid delivery area.";
    }

    // Validation failed
    if (Object.keys(fieldErrors).length > 0) {
      return Response.json(
        {
          error: "Validation failed",
          fieldErrors,
        },
        { status: 422 }
      );
    }

    // Valid order
    const order = {
      id: Date.now(),
      name: name.trim(),
      phone,
      area,
      notes: notes?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    return Response.json(order, { status: 201 });

  } catch (error) {
    return Response.json(
      {
        error: "Invalid JSON body",
      },
      { status: 400 }
    );
  }
}