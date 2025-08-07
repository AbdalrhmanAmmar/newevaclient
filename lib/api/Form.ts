import api from "./api";

export interface IContactForm {
    Fullname: string;
    PhoneNumber: string;
    Details: string;
    OrderForm?: number; 
}
export interface IGetContactFormResponse {
  success: boolean;
  forms: IContactForm[];
}

export const submitContactForm = async (data: Omit<IContactForm, "OrderForm">) => {
    try {
        const response = await api.post("/Form", data);
        return response.data;
    } catch (error) {
        console.error("Error submitting contact form:", error);
        throw error;
    }
};

export const getContactForm = async () => {
  try {
    const response = await api.get("/Form");
    return response.data as IContactForm[];
  } catch (error) {
    console.error("[ContactForm] خطأ في الجلب:", error);
    throw new Error("تعذر جلب نماذج الاتصال");
  }
};