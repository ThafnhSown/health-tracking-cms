import React, { useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import { Table } from 'antd'
const News = () => {

  const [openSearchNotes, setOpenSearchNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  const handleOpenSearchTab = () => {
    setOpenSearchNotes(prevState => !prevState);
  }

  const handleAddNotesToDb = async () => {
    if (notes.trim() === "") {
      setError("Notes cannot be empty.");
      return;
    }


    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        notes: notes,
        uid: user,
        dateCreated: moment().format("MMM Do YY")
      });

      setLoading(false);
      setNotes("");

     

    } catch (error) {
      console.error("Error adding document:", error);
      setError("Error adding the note.");
    }

  }

  const fetchData = async () => {
    try {
      const q = query(collection(db, "news"));
      const querySnapshot = await getDocs(q);
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        setLoading(false);
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      console.log("abc", fetchedData)
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
  }, [user, notes])


  return (
   <>
    <Table 
        dataSource={data}
    >
        <Table.Column tilte="Tiêu đề" dataIndex="title" />
        <Table.Column tilte="Nội dung" dataIndex="content" />
        <Table.Column tilte="Thumbnail" dataIndex="image" />
    </Table>
   </>
  )
}

export default News