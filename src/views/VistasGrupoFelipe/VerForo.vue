<template>
    <div class="container">
        <div v-for="(question, qIndex) in questions" :key="qIndex">
            <p>{{ question.text }}</p>
            <button @click="toggleCommentField(qIndex)">Comentar</button>
            <button @click="toggleComments(qIndex)">Ver comentarios</button>
            <div v-if="question.showCommentField">
                <input type="text" v-model="question.newComment" />
                <button @click="addComment(qIndex)">Enviar</button>
            </div>
            <div v-if="question.showComments">
                <div v-if="question.comments.length === 0">
                    <p>No hay comentarios en esta pregunta</p>
                </div>
                <div v-else v-for="(comment, cIndex) in question.comments" :key="cIndex">
                    <p>({{ comment.timestamp }}) {{ comment.user }}: {{ comment.text }}</p>
                    <!-- Botón para responder a un comentario -->
                    <button @click="toggleReplyField(qIndex, cIndex)">Responder</button>
                    <!-- Campo para ingresar la respuesta -->
                    <div v-if="comment.showReplyField">
                        <input type="text" v-model="comment.newReply" />
                        <button @click="addReply(qIndex, cIndex)">Enviar</button>
                    </div>
                    <!-- Mostrar respuestas -->
                    <div v-for="(reply, rIndex) in comment.replies" :key="rIndex" style="margin-left: 20px;">
                        <p>({{ reply.timestamp }}) {{ reply.user }}: {{ reply.text }}</p>
                    </div>
                </div>
            </div>
            <p v-if="question.successMessage">{{ question.successMessage }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questions: [],
            currentCommentIndex: null,
        };
    },
    created() {
        this.generateQuestions();
    },
    methods: {
        generateQuestions() {
            for (let i = 0; i < 10; i++) {
                this.questions.push({
                    text: `Pregunta ${i + 1}`,
                    comments: [],
                    newComment: '',
                    showCommentField: false,
                    showComments: false,
                    successMessage: '',
                });
            }
        },
        toggleCommentField(questionIndex) {
            if (this.currentCommentIndex !== null) {
                this.questions[this.currentCommentIndex].showCommentField = false;
                this.questions[this.currentCommentIndex].showComments = false;
            }
            this.questions[questionIndex].showCommentField = !this.questions[questionIndex].showCommentField;
            this.currentCommentIndex = questionIndex;
        },
        toggleComments(questionIndex) {
            if (this.currentCommentIndex !== null) {
                this.questions[this.currentCommentIndex].showCommentField = false;
                this.questions[this.currentCommentIndex].showComments = false;
            }
            this.questions[questionIndex].showComments = !this.questions[questionIndex].showComments;
            this.currentCommentIndex = questionIndex;
        },
        addComment(questionIndex) {
            if (this.questions[questionIndex].newComment.trim() !== '') {
                const newComment = {
                    text: this.questions[questionIndex].newComment,
                    user: "Usuario",
                    timestamp: new Date().toLocaleString(),
                    replies: []
                };
                this.questions[questionIndex].comments.push(newComment);
                this.questions[questionIndex].newComment = '';
                this.questions[questionIndex].showCommentField = false;
                this.questions[questionIndex].successMessage = 'Comentario enviado exitosamente';
                setTimeout(() => {
                    this.questions[questionIndex].successMessage = '';
                }, 3000);
            }
        },
        toggleReplyField(questionIndex, commentIndex) {
            const comment = this.questions[questionIndex].comments[commentIndex];
            comment.showReplyField = !comment.showReplyField;
        },
        addReply(questionIndex, commentIndex) {
            const comment = this.questions[questionIndex].comments[commentIndex];
            if (comment.newReply.trim() !== '') {
                const newReply = {
                    text: comment.newReply,
                    user: "Usuario",
                    timestamp: new Date().toLocaleString(),
                };
                comment.replies.push(newReply);
                comment.newReply = '';
                comment.showReplyField = false;
            }
        },
    },
};
</script>
<style scoped>
.container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 10px solid #ccc;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

div {
    margin-left: 20px;
}

p {
    font-size: 18px;
}

button {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

input[type=text] {
    width: 60%;
    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 15px;
    box-sizing: border-box;
    border: 3px solid #ccc;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
}

input[type=text]:focus {
    border: 3px solid #555;
}

button {
    width: 15%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: #08cccc;
    color: white;
    font-size: 17px;
    font-weight: 700;
    border: #a2c2ee;
}

button:hover {
    background-color: #0e0e0e
}
</style>
