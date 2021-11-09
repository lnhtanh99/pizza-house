import Title from './Title';
import Content from './Content';
import { useParams } from 'react-router-dom';

function Other({ others }) {
    const { category } = useParams();

    return (
        <>
            <Title others={others} type={category}/>
            <Content others={others} />
        </>
    )
}

export default Other
