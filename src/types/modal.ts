type Modal = {
  show: boolean;
  animation: boolean;
};

interface ModalProps {
  modal: Modal;
  id?: string | null;
  available: number;
  name: string;
  amount: number;
  category: string;
}

interface FormFields {
  name: "name" | "amount" | "category";
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  options?: string[];
}

export type {
  Modal,
  ModalProps,
  FormFields,
};
