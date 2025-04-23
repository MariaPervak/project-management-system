import {gql, useMutation, useQuery} from '@apollo/client';
import {useMemo, useState} from "react";
import {Button, Input, Title, Textarea, Select, Loader} from "ui_components/components";
import './CreatePage.scss';

const ADD_TASK = gql`
mutation AddTask($name: String, $title: String, $status: Int $description: String) {
  addTask(name: $name, title: $title, status: $status, description: $description) {
    id, name, title, description, status
  }
}
`;

const GET_STATUS_OPTIONS = gql`
  query Statuses {
    statuses {
      id
      name
    }
  }
`

const CreatePage = () => {
  const { loading: optionsLoading, error: optionsError, data: optionsData } = useQuery(GET_STATUS_OPTIONS);
  const [addTask, { data, loading, error }] = useMutation(ADD_TASK);
  const [form, setForm] = useState({name: 'CRM_5604'});

  const options = useMemo(() => {
    return optionsData? optionsData.statuses.map((option) => ({
      id: option.id,
      value: option.name,
    })): [];
  }, [optionsData]);

  const handleClick = (e: any) => {
    e.preventDefault();
    addTask({variables: form})
  }

  const handleInput = (e: any) => {
    const value = e.target.name === 'status'? Number(e.target.value) : e.target.value;
    setForm((prevState) => {
      return {...prevState, [e.target.name]: value}
    })
  }
  if (loading || optionsLoading) return <Loader />;

  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="createPage">
      <Title>Создание задачи</Title>
      <Input type="text" name="title" placeholder="Заголовок" onChange={handleInput} />
      <Select name="status" options={options} onChange={handleInput} />
      <Textarea name="description" onChange={handleInput} placeholder="Описание"/>
      <div className="createPage__buttons">
        <Button variant="secondary">Отмена</Button>
        <Button onClick={handleClick} className="createPage__button">Создать</Button>
      </div>
    </div>
  );
};

export default CreatePage;