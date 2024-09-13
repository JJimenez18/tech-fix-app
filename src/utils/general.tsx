import {useNavigate} from 'react-router-dom';

// eslint-disable-next-line react-hooks/rules-of-hooks
const navigate = useNavigate();

export const redirectToPage = (url: string) => {
    return navigate(url);
};
