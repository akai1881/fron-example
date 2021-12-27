import React, { useEffect, useState } from 'react';
import $axios from './axios';

const ProblemList = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('JavaScript');
    const [inputs, setInputs] = useState({ title: '', description: '', tag: 'JavaScript' });

    const getProblems = async () => {
        try {
            const { data } = await $axios.get('/problem?limit=20');
            console.log(data);
            setData(data.rows);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setTag(value);
        const { data } = await $axios.get('/problem?limit=20&q=' + value);
        console.log(data);
        setData(data.rows);
    };

    const handleFilter = async (e) => {
        const value = e.target.value;
        const { data } = await $axios.get('/problem?tag=' + value);
        console.log(data);
        setData(data.rows);
    };

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleClick = async () => {
        await $axios.post('/problem/create', inputs);
        getProblems();
    };

    useEffect(() => {
        getProblems();
    }, []);

    return (
        <div>
            <input type="text" value={search} onChange={handleSearch} />
            <input type="text" name="title" onChange={handleChange} value={inputs.title} />
            <input type="text" name="description" onChange={handleChange} value={inputs.description} />
            <select name="tag" id="" onChange={handleChange} value={tag}>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Kotlin">Kotlin</option>
                <option value="Java">Java</option>
            </select>
            <div>
                <select id="" onChange={handleFilter} value={tag}>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Java">Java</option>
                </select>
            </div>
            <button onClick={handleClick}>Create</button>
            {data.map((p) => (
                <>
                    <li>{p.title}</li>
                    {p.pictures.map((picture) => (
                        <img src={'http://localhost:8000/' + picture.image} alt="" width={100} />
                    ))}
                </>
            ))}
        </div>
    );
};

export default ProblemList;
