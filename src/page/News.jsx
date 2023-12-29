import React, { useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import { Button, Table } from 'antd'
import CreateModal from '../components/elements/Modal';
const News = () => {
  const [news, setNews] = useState({})
  const [openSearchNotes, setOpenSearchNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false)


  const fetchData = async () => {
    try {
      const q = query(collection(db, "news"));
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
   {modal && <CreateModal news={news} modal={modal} setModal={setModal} />}
    <Table 
        dataSource={data}
    >
        <Table.Column title="Tiêu đề" dataIndex="title" />
        <Table.Column title="Nội dung" dataIndex="content" />
        <Table.Column title="Thumbnail" dataIndex="image" render={(_, item) => (
          <img src={item.image}/>
        )} />
        <Table.Column title="Trạng thái" dataIndex="status" />
        <Table.Column title="Chỉnh sửa" render={(_, item) => (
          <Button onClick={() => {
            setNews(item)
            setModal(true)
          }}>Sửa</Button>
        )}
        />
    </Table>
   </>
  )
}

export default News