export type MovieTSType = {
  id: string
  title: string
  genre: string
  directorId: string
}

export type DirectorTSType = { id: string; name: string; age: number }

const movies: MovieTSType[] = [
  { id: '0', title: 'Forest Gump', genre: 'Drama', directorId: '2' },
  { id: '1', title: 'Pulp Fiction', genre: 'Comedy', directorId: '0' },
  { id: '2', title: 'Beautiful Lie', genre: 'Comedy', directorId: '1' },
]

const directors: DirectorTSType[] = [
  { id: '0', name: 'John Miller', age: 52 },
  { id: '1', name: 'Quentin Tarantino', age: 56 },
  { id: '2', name: 'Jaquin Phoenix', age: 49 },
]

export default { movies, directors }
