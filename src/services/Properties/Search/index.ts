import Axios from 'axios';
import { IProperty } from 'src/types/Property';

type IParams = {
  searchText?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};

const searchProperties = async ({
  searchText = '',
  limit = 20,
  skip = 0,
  sortBy = 'createdAt',
  sortDirection = 'asc',
}: IParams) => {
  const response = await Axios.get('/properties/search', {
    params: {
      searchText,
      limit,
      skip,
      sortBy,
      sortDirection,
    },
  });

  const properties = response.data;
  return properties as IProperty[];
};

export default searchProperties;
