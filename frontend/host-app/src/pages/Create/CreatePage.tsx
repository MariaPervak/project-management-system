import { gql, useMutation } from '@apollo/client';
import {useState} from "react";
import TextArea from "../../components/common/Textarea/Textarea.tsx";
import {Button, Input} from "ui_components/components";
import Title from "../../components/Title/Title.tsx";
import './CreatePage.scss';

const ADD_TASK = gql`
mutation AddTask($name: String, $title: String, $description: String) {
  addTask(name: $name, title: $title, description: $description) {
    id, name, title, description, status
  }
}
`;

const CreatePage = () => {
  const [addTask, { data, loading, error }] = useMutation(ADD_TASK);
  const [form, setForm] = useState({name: 'CRM_5604'});
  const handleClick = (e: any) => {
    e.preventDefault();
    addTask({variables: form})
  }

  const handleInput = (e: any) => {
    setForm((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  console.log('data', data);

  if (loading) return 'Submitting...';

  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="createPage">
      <Title>Создание задачи</Title>
      <Input type="text" name="title" placeholder="Заголовок" onChange={handleInput} />
      <TextArea name="description" placeholder="Описание" onChange={handleInput} />
      <div className="createPage__buttons">
        <Button variant="secondary">Отмена</Button>
        <Button onClick={handleClick} className="createPage__button">Создать</Button>
      </div>
    </div>
  );
};

export default CreatePage;