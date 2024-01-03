import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { options } from "../../../utils/ModalConst";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import TextArea from "antd/es/input/TextArea";

const DeleteFoodModal = (props) => {
  const { food, modal, setModal } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...food,
    });
  }, []);
  const handleCancel = () => {
    setModal(false);
  };
  const handleDelete = async () => {
    const foodDocRef = doc(db, "food", food.id);
    try {
      await deleteDoc(foodDocRef);
      console.log("Document successfully deleted!");
      setModal(false);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <>
      <Modal
        width={800}
        open={modal}
        centered
        title="Xac nhan xoa"
        okText="Xoá"
        cancelText="Hủy"
        onCancel={handleCancel}
        onOk={handleDelete}
      >
        Ban co xac nhan xoa khong?
      </Modal>
    </>
  );
};

export default DeleteFoodModal;
