const Home = async () => {
  const res = await fetch('http://localhost:3000/api/helloworld', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Enzo' }),
  });

  const data = await res.json();
  console.log(data);

  return (
    <div>
      <h1>Home</h1>
      <p>{data}</p>
    </div>
  );
};

export default Home;
