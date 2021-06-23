import React, { FormEvent, useState } from 'react';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../contexts/RoomCode';
import '../styles/room.scss';
import {useParams} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


type RoomParams ={
    id: string;
}

export function Room(){

    const {user} =useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState ('');
    const roomId =  params.id;

    async function handleSendNewQuestion(event: FormEvent){

        event.preventDefault();

        if(newQuestion.trim()==' ')
        {
            return;
        }
        if(!user){
            throw new Error('You must be logged in');
        }
        const question ={
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`room/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code = {roomId}></RoomCode>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>sala react</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendNewQuestion}>
                    <textarea 
                        placeholder ="O que voê quer perguntar?"
                        onChange ={event => setNewQuestion(event.target.value)}
                        value = {newQuestion}
                    />
                    <div className ="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type ="submit">Enviar pergunta</Button>
                    </div>
                </form>



            </main>
        </div>
    );

}