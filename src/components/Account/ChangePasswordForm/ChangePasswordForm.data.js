import * as Yup from "yup";

export const initialValues = () => {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    password: Yup.string().required("Este campo es obligatorio"),
    newPassword: Yup.string().required("Este campo es obligatorio"),
    repeatNewPassword: Yup.string()
      .required("Este campo es obligatorio")
      .oneOf(
        [Yup.ref("newPassword")],
        "Las nuevas contraseñas deben ser iguales"
      ),
  });
};
