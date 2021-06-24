import'../styles/question.scss'

type QuestionProps={
    content: string;
    authur:{
        name: string;
        avatar: string;
    }

}


export function Question({
    content,
    authur,
}:QuestionProps){  
    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className = "user-info">
                    <img src={authur.avatar} alt={authur.name} />
                    <span>{authur.name}</span>
                </div>
            </footer>
        </div>
    );
}