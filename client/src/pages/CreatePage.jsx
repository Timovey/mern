import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/htpp.hook';

export const CreatePage = () => {
    const navigate = useNavigate()
    
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try{
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                navigate(`/datail/${data.link._id}`, { replace: true })
            }
            catch(e) {

            }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input placeholder="вставьте ссылку"
                            id="link"
                            type="text" 
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler}
                            />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}