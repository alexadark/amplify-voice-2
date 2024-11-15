import { fetchData } from '@/lib/actions';

const Header = async () => {
  const { data } = await fetchData('config');
  const { header_title } = data?.story.content || {};

  return <h1>{header_title}</h1>;
};

export default Header;
