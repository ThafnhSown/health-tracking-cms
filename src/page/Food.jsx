import React, { useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import { Button, Table } from 'antd'
import FoodModal from '../components/elements/Modal/foodModal';
import AddFoodModal from '../components/elements/Modal/addFood';
import DeleteFoodModal from '../components/elements/Modal/deleteFood';

const Food = () => {
  const [food, setFood] = useState({})
  const [openSearchNotes, setOpenSearchNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [addModal, setAddModal] = useState(false)


  const fetchData = async () => {
    try {
      const q = query(collection(db, "food"));
      const querySnapshot = await getDocs(q);
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        setLoading(false);
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
  
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
      } else {
        console.log("Wahala de");
      }
    });

  }, [user])

  useEffect(() => {
    fetchData();
  })


  return (
   <>
   {modal && <FoodModal food={food} modal={modal} setModal={setModal} />}
   {deleteModal && <DeleteFoodModal food={food} modal={deleteModal} setModal={setDeleteModal}  />}
   {addModal && <AddFoodModal food={food} modal={addModal} setModal={setAddModal}  />}


    <Table 
        dataSource={data}
    >
        <Table.Column title="Tên" dataIndex="name" />
        <Table.Column title="Loại" dataIndex="type" />
        <Table.Column title="Năng lượng" dataIndex="calories" />
        <Table.Column title="Tinh bột" dataIndex="carbohydrates" />
        <Table.Column title="Đạm" dataIndex="protein" />
        <Table.Column title="Chất béo" dataIndex="fat" />
        <Table.Column title="Chỉnh sửa" render={(_, item) => (
          <Button onClick={() => {
            setFood(item)
            setModal(true)
          }}>Sửa</Button>
        )}
        />
        <Table.Column title="Xoá" render={(_, item) => (
          <Button onClick={() => {
            console.log('Xoa')
            console.log(food.id)
            setFood(item)
            setDeleteModal(true)
          }}>Xoá</Button>
        )}
        />
    </Table>
    <Button type='primary' size='middle' onClick={() => {
      setAddModal(true)
      console.log('add')
    }}>
      Add
    </Button >
   </>
  )
}

export default Food