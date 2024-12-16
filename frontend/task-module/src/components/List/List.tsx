const List = (props: any) => {
  const { items } = props;
  return (
    <ul>
      {items.map((item:any, index: any) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;