import {Modal, Form, Input, Select} from 'antd'
import { useEffect } from 'react'
import {options} from '../../../utils/ModalConst'
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../../../firebase"
import TextArea from 'antd/es/input/TextArea';

const AddFoodModal = (props) => {
    const {food, modal, setModal} = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            ...food
        })
    }, [])
    const handleCancel = () => {
        setModal(false)
    }
    const handleAdd = async () => {
         try {
            // Add a new document to the "food" collection
            const newFoodDocRef = await addDoc(collection(db, "food"), form.getFieldsValue());
            console.log("Document added with ID: ", newFoodDocRef.id);
            setModal(false);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }
    return (
        <>
            <Modal
            width={800}
            open={modal}
            centered
            onCancel={handleCancel}
            title="Chỉnh sửa thông tin thực phẩm"
            okText="Lưu"
            cancelText="Hủy"
            onOk={handleChange}
            >
                <Form
                form={form}
                >
                    <Form.Item label="Tên" name="name">
                        <Input type='string'/>
                    </Form.Item>
                    <Form.Item label="Loại" name="type">
                        <Input type='string'/>
                    </Form.Item>
                    <Form.Item label="Năng lượng" name="calories">
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item label="Tinh bột" name="carbohydrates">
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item label="Đạm" name="protein">
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item label="Chất béo" name="fat">
                        <Input type='number'/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddFoodModal