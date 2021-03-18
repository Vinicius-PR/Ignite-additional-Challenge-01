import { useEffect, useState } from 'react';
import { Button } from './Button';
import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SideBarPros {
  handleClick: (id: number) => void,
  GenreId: number,
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props: SideBarPros) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={genre.id}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.handleClick(genre.id)}
            selected={props.GenreId === genre.id}
          />
        ))}
      </div>
  </nav>
  )
}
