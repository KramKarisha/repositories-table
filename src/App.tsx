import React, { useEffect, useState } from 'react';
import './App.css';

interface Repository {
  id: number
  name: string
  html_url: string
  description: string
  owner: {
    avatar_url: string
  }
}

const App: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[] | []>([]);
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetch("https://api.github.com/repositories")
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setPage(0);
  };

  const searchResult = repositories.filter((repository: Repository) => repository.name.includes(value));
  const preparedList = searchResult.slice(page * 10, page * 10 + 10);

  return (
    <div className="App">
        <div className="table-header">
          <div>
            <span className="input-span">Search: </span>
            <input
              value={value}
              placeholder='Enter query'
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <span className="page-span">Page: {page + 1}</span>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0} 
              className="page-button"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={preparedList.length < 10}
              className="page-button"
            >
              Next
            </button>
          </div>
        </div>

      {preparedList.length > 0 && (
        <div className="table">
          <table> 
            <tbody>
              <tr>
                <th>IMAGE</th>
                <th>FULL NAME</th>
                <th>LINK</th>
                <th>DESCRIPTION</th>
              </tr>
              {preparedList.map((item: Repository) => (
                <tr key={item.id} >
                  <td className="img-field"><img src={item.owner.avatar_url} alt="face_image" className="avatar" width="50px" /></td>
                  <td className="name-field">{item.name}</td>
                  <td className="url-field">{item.html_url}</td>
                  <td className="description-field">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
