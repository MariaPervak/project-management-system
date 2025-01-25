import Kanban from "./components/Kanban/Kanban.tsx";

function App() {

  const board: any = {
    columns: [ 
      {
        id: 1,
        title: 'Backlog',
        cards: [
          {
            id: 1,
            title: 'Add card',
            description: 'Add capability to add a card in a column'
          },
        ]
      },
      {
        id: 2,
        title: 'Process',
        cards: [
          {
            id: 2,
            title: 'Add card',
            description: 'Add capability to add a card in a column'
          },
          {
            id: 3,
            title: 'Add card',
            description: 'Add capability to add a card in a column'
          },
        ]
      },
    ]
  }

  return (
    <Kanban board={board} />
  )
}

export default App
