import { search } from '../api';

const fetchMock = jest.fn();

describe('getNameFilm', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
  });
  it('should return', () => {
    fetchMock.mockImplementation(() => {
      const p = new Promise((resolve) => {
        resolve({
          json: () => ({
          }),
        });
      });

      return p;
    });
    search('dream');
    expect(fetchMock).toHaveBeenCalledWith('https://www.omdbapi.com/?s=dream&apikey=3ed64303');
  });

  //   it('should return name of film', () => {
  //     expect(getNameFilm).toBeDefined();
  //     expect(getNameFilm.Search).toBeInstanceOf(Array);
  //     expect(getNameFilm.Search).toEqual(expect.any(Array));

  //     expect(getNameFilm.Search.length).toBeGreaterThan(1);
  //     expect(getNameFilm.Search.length).toEqual(10);

  //     expect(getNameFilm.Search[0].Title).toEqual('Requiem for a Dream');
  //   });
});
