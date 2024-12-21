import { gql, useMutation } from '@apollo/client';

const ADD_TASK = gql`
mutation AddTask($name: String, $title: String, $description: String) {
  addTask(name: $name, title: $title, description: $description) {
    id, name, title, description, status
  }
}
`;

const CreatePage = () => {
  const [addTask, { data, loading, error }] = useMutation(ADD_TASK);
  const handleClick = (e: any) => {
    e.preventDefault();
    addTask({variables: {name: 'CRM_5604', title: 'test react', description: 'test react'}})
  }

  console.log('data', data);

  if (loading) return 'Submitting...';

  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <button onClick={handleClick}>Создать</button>
    </div>
  );
};

export default CreatePage;