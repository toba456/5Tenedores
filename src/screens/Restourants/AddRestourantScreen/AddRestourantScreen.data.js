import * as Yup from "yup";

export const initialValues = () => {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    phone: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("No es un email válido")
      .required("Campo obligatorio"),
    description: Yup.string(),
  });
};
