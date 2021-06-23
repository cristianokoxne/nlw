import React, { FormEvent, useEffect, useState } from 'react';
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
type FirebaseQuestions = Record<string, {
    authur:{
        name:string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;

}>

type Question ={
   
    id: string;
    authur:{
        name:string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;

}

export function Room(){

    const {user} =useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState ('');
    const roomId =  params.id;
    const[questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room=>{

            const databaseRoom =room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            
            const parsedQuestions = Object.entries(firebaseQuestions ).map(([key, value]) =>{
                return{
                    id: key,
                    content: value.content,
                    authur: value.authur,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
                    
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })
    }, [roomId])

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

        await database.ref(`rooms/${roomId}/questions`).push(question);

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
                    {questions.length>0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendNewQuestion}>
                    <textarea 
                        placeholder ="O que voê quer perguntar?"
                        onChange ={event => setNewQuestion(event.target.value)}
                        value = {newQuestion}
                    />
                    <div className ="form-footer">
                        {user ? (
                            <div className = "user-info">
                                 <img src={user.avatar} alt={user.name} />
                                 <span>{user.name}</span>
                            
                            </div> 
                        ) : (
                            <span> Para Enviar uma pergunta, <button>faça seu login</button>.</span>
                        ) }

                        <Button type ="submit">Enviar pergunta</Button>
                    </div>
                </form>



            </main>
        </div>
    );

}