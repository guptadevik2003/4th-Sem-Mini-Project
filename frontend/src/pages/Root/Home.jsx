import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
