import dynamic from "next/dynamic";

const DateInput = dynamic(() => import("./date-input"), { ssr: false });

export { default as CustomForm } from "./custom-form";
export { default as CheckboxInput } from "./checkbox-input";
export { default as EmailInput } from "./email-input";
export { default as HiddenInput } from "./hidden-input";
export { default as PasswordInput } from "./password-input";
export { default as PasswordConfirmInput } from "./password-confirm-input";
export { default as RadioInput } from "./radio-input";
export { default as TextInput } from "./text-input";
export { default as TextAreaInput } from "./text-area-input";
export { default as UploadImageInput } from "./upload-image-input";
export { default as SelectInput } from "./select-input";
export { DateInput };
