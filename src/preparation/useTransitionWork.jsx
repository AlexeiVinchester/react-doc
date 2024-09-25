import { useDeferredValue, useEffect, useState, useTransition } from "react"

const filterBySearch = (entities, search) => {
    return entities.filter(item => item.name.concat(item.body).includes(search));
}

const Comments = ({ entities = [] }) => {
    const deferredComments = useDeferredValue(entities)
    return (
        <ul>
            {
                deferredComments.map(comment => (
                    <li key={comment.id}>
                        <h3>{comment.name}</h3>
                        <p>{comment.body}</p>
                    </li>
                ))
            }
        </ul>
    );
}

const TestApiWithUseTransition = () => {
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState('')
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e) => {
            setSearch(e.target.value)
    }

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            const data = await response.json();
            setComments(data);
        }
        getData();
    }, [])

    return (
        <div>
            <input onChange={handleSearch} />
            <Comments entities={filterBySearch(comments, search)} />
            
        </div>
    );
}

export { TestApiWithUseTransition };