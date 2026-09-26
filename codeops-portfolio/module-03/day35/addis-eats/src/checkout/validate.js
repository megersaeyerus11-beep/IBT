export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name =
      "Name must be at least 2 characters.";
  }

  const phonePattern =
    /^(?:\+251|0)9\d{8}$/;

  if (!form.phone.trim()) {
    errors.phone =
      "TeleBirr phone number is required.";
  } else if (
    !phonePattern.test(form.phone.trim())
  ) {
    errors.phone =
      "Use a valid number like 0912345678.";
  }

  if (!form.area) {
    errors.area =
      "Please select a delivery area.";
  }

  return errors;
}