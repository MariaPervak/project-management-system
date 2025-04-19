import './App.css'
import {Button, Input, Link, Select, Textarea, Title} from "./components";
import {useState} from "react";
import {Option} from "./components/Select/Select.tsx";

function App() {
    const [input, setInput] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [value, setValue] = useState<Option | null>(null);
    const options = [
        {id: 1, value: 'option1'},
        {id: 2, value: 'option2'},
    ];

    return (
    <div style={{ padding: '1em'}}>
        <Button variant="primary">Создать</Button>
        <Input onChange={(e) => setInput(e.target.value)} type="number" name="name" value={input} placeholder="fill"/>
        <Textarea name="textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="fill"/>
        <Select name="select" options={options} value={value} onChange={(e) => setValue(e.target.value)} />
        {/*<Loader />*/}
        <Link href="https://google.com" text="Link" target="_blank"/>
        <Title>Title</Title>
    </div>
    )
}

export default App
