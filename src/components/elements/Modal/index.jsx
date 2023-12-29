import {Modal, Form, Input, Select} from 'antd'
import { useEffect } from 'react'
import {options} from '../../../utils/ModalConst'
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../../../firebase"
import TextArea from 'antd/es/input/TextArea';

const CreateModal = (props) => {
    const {news, modal, setModal} = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            ...news
        })
    }, [])
    const handleCancel = () => {
        setModal(false)
    }
    const handleChange = async () => {
        const newsDocRef = doc(db, "news", news.id)
        try{
            await updateDoc(newsDocRef, {...form.getFieldsValue(), id: news.id})
            setModal(false)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <Modal
            width={800}
            open={modal}
            centered
            onCancel={handleCancel}
            title="Sửa bài viết"
            okText="Lưu"
            cancelText="Hủy"
            onOk={handleChange}
            >
                <Form
                form={form}
                >
                    <Form.Item label="Tiêu đề" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                        <TextArea rows={20}/>
                    </Form.Item>
                    <Form.Item label="Thumbnail" name="image">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status">
                        <Select options={options}>

                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateModal