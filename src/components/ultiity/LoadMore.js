const LoadMore = ({loadMore}) => {
    const onClick = async(e) => {
        e.preventDefault()
        loadMore()
    }

    return (
        <a className="load-more" onClick={onClick}>Load More</a>
    )
}

export default LoadMore
